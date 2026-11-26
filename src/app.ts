import {
    CATEGORY_CONFIG,
    DIFFICULTY_LABELS,
    PRINT_LABELS,
    getOniRankInfo
} from './data.ts';
import { byId, bySelector } from './dom.ts';
import {
    ONI_BONUS_SECONDS,
    ONI_PENALTY_SECONDS,
    ONI_TIME_LIMIT,
    buildOniQuestion,
    computeRemainingSeconds,
    filterPairItems,
    filterSheetItems,
    isBonusCombo
} from './game-logic.ts';
import { shuffled } from './random.ts';
import { createSoundFx } from './sound.ts';
import { createProgressStore, safeLocalStorage } from './storage.ts';
import type { Category, Difficulty, DojoChoice, PrintScope } from './types.ts';

interface DojoState {
    category: Category;
    difficulty: Difficulty;
    scope: PrintScope;
    score: number;
    combo: number;
    maxCombo: number;
    totalQuestions: number;
    selectedAnswer: string | null;
    currentOniAnswer: string | null;
    solvedIds: Set<string>;
    revealedIds: Set<string>;
    choices: DojoChoice[];
    timeLeft: number;
    lastTickSecond: number;
    oniEndTime: number;
    isPlaying: boolean;
    justUnlockedOni: boolean;
    timerInterval: ReturnType<typeof setInterval> | null;
    toastTimeout: ReturnType<typeof setTimeout> | null;
    returnTimeout: ReturnType<typeof setTimeout> | null;
}

const storage = safeLocalStorage();
const progress = createProgressStore(storage);
const SOUND_FX = createSoundFx(storage);

const state: DojoState = {
    category: 'sheet',
    difficulty: 'easy',
    scope: 'all',
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalQuestions: 0,
    selectedAnswer: null,
    currentOniAnswer: null,
    solvedIds: new Set(),
    revealedIds: new Set(),
    choices: [],
    timeLeft: ONI_TIME_LIMIT,
    lastTickSecond: -1,
    oniEndTime: 0,
    isPlaying: false,
    justUnlockedOni: false,
    timerInterval: null,
    toastTimeout: null,
    returnTimeout: null
};

const els = {
    homeScreen: byId('home-screen'),
    gameScreen: byId('game-screen'),
    mainArea: bySelector('.main'),
    homeDesc: byId('home-desc'),
    earnedTitleBanner: byId('earned-title-banner'),
    ruleOniItem: byId('rule-oni-item'),
    btnOni: byId<HTMLButtonElement>('btn-oni'),
    homeMuteBtn: byId<HTMLButtonElement>('home-mute-btn'),
    gameMuteBtn: byId<HTMLButtonElement>('game-mute-btn'),
    scopeSelect: byId<HTMLSelectElement>('scope-select'),
    tabScoreSheet: byId('tab-score-sheet'),
    tabScorePair: byId('tab-score-pair'),
    categoryTabs: document.querySelectorAll<HTMLButtonElement>('.category-tab'),
    modeButtons: document.querySelectorAll<HTMLButtonElement>('.mode-btn'),
    homeBtn: byId<HTMLButtonElement>('home-btn'),
    modeDisplay: byId('mode-display'),
    trayTitleText: byId('tray-title-text'),
    trayHint: byId('tray-hint'),
    progressContainer: byId('progress-container'),
    timerBadge: byId('timer-badge'),
    timerText: byId('timer-text'),
    comboBadge: byId('combo-badge'),
    scoreText: byId('score-text'),
    progressFill: byId('progress-fill'),
    boardArea: byId('board-area'),
    cardList: byId('card-list'),
    toast: byId('toast'),
    clearOverlay: byId('clear-overlay'),
    clearTitle: byId('clear-title'),
    clearSubtitle: byId('clear-subtitle'),
    clearActions: byId('clear-actions'),
    autoReturnText: byId('auto-return-text'),
    retryBtn: byId<HTMLButtonElement>('retry-btn'),
    overlayHomeBtn: byId<HTMLButtonElement>('overlay-home-btn')
};

function storageCategoryKey(cat: Category): 'cycle' | 'sketch' {
    return cat === 'sheet' ? 'cycle' : 'sketch';
}

function init(): void {
    els.categoryTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            SOUND_FX.playTap();
            const cat = tab.dataset['category'];
            if (cat === 'sheet' || cat === 'pair') setCategory(cat);
        });
    });

    els.scopeSelect.addEventListener('change', () => {
        SOUND_FX.playTap();
        state.scope = els.scopeSelect.value as PrintScope;
    });

    els.modeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            SOUND_FX.playTap();
            const diff = btn.dataset['difficulty'];
            if (diff === 'easy' || diff === 'normal' || diff === 'oni') startGame(diff);
        });
    });

    els.homeBtn.addEventListener('click', () => {
        SOUND_FX.playTap();
        resetToHome();
    });
    els.overlayHomeBtn.addEventListener('click', () => {
        SOUND_FX.playTap();
        resetToHome();
    });
    els.retryBtn.addEventListener('click', () => {
        SOUND_FX.playTap();
        els.clearOverlay.classList.remove('active');
        startGame(state.difficulty);
    });

    const handleMute = (): void => {
        SOUND_FX.toggleMute();
        syncMuteButtons();
    };
    els.homeMuteBtn.addEventListener('click', handleMute);
    els.gameMuteBtn.addEventListener('click', handleMute);
    syncMuteButtons();

    document.addEventListener('keydown', handleGlobalKeydown);

    setCategory('sheet');
    updateTabScores();
}

function syncMuteButtons(): void {
    const muted = SOUND_FX.isMuted();
    els.homeMuteBtn.textContent = muted ? '🔇 音OFF' : '🔊 音ON';
    els.gameMuteBtn.textContent = muted ? '🔇' : '🔊';
}

function updateTabScores(): void {
    const entries: ReadonlyArray<{ cat: Category; el: HTMLElement }> = [
        { cat: 'sheet', el: els.tabScoreSheet },
        { cat: 'pair', el: els.tabScorePair }
    ];
    entries.forEach(({ cat, el }) => {
        const saved = progress.getOniBest(storageCategoryKey(cat));
        if (saved !== null) {
            el.textContent = `👹 ${saved}問`;
            el.hidden = false;
        } else {
            el.hidden = true;
        }
    });
    updateCurrentTitle();
}

function updateCurrentTitle(): void {
    const saved = progress.getOniBest(storageCategoryKey(state.category));
    if (saved === null) {
        els.earnedTitleBanner.hidden = true;
        return;
    }
    const rankInfo = getOniRankInfo(saved);
    els.earnedTitleBanner.className = `earned-title-banner ${rankInfo.className}`;
    els.earnedTitleBanner.textContent = `称号：${rankInfo.icon} ${rankInfo.title}`;
    els.earnedTitleBanner.hidden = false;
}

function updateDifficultyVisibility(animate = false): void {
    const unlocked = progress.isOniUnlocked(storageCategoryKey(state.category));
    els.ruleOniItem.hidden = !unlocked;
    els.btnOni.hidden = !unlocked;
    els.btnOni.classList.toggle('just-unlocked', unlocked && animate);
}

function setCategory(cat: Category): void {
    state.category = cat;
    els.categoryTabs.forEach((tab) => {
        const active = tab.dataset['category'] === cat;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
    });
    els.homeDesc.textContent = CATEGORY_CONFIG[cat].description;
    updateDifficultyVisibility();
    updateCurrentTitle();
}

function startGame(difficulty: Difficulty): void {
    stopTimers();
    state.difficulty = difficulty;
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.selectedAnswer = null;
    state.currentOniAnswer = null;
    state.solvedIds.clear();
    state.revealedIds.clear();
    state.timeLeft = ONI_TIME_LIMIT;
    state.lastTickSecond = -1;
    state.isPlaying = true;

    const isOni = difficulty === 'oni';
    els.progressContainer.classList.toggle('oni-active', isOni);
    els.timerBadge.hidden = !isOni;
    els.timerBadge.classList.remove('urgent', 'penalty-flash', 'bonus-flash');
    els.scoreText.hidden = !isOni;
    els.progressFill.classList.toggle('timer-fill', isOni);
    els.progressFill.classList.remove('urgent');
    els.modeDisplay.textContent = `${PRINT_LABELS[state.scope]} / ${DIFFICULTY_LABELS[difficulty]}`;

    if (isOni) {
        els.trayTitleText.textContent = '❓ ？に入るのはどれ？';
        els.trayHint.textContent = '👆クリック または 1・2・3キーで回答';
        setupNextOniQuestion();
        updateOniHud();
        startOniTimer();
    } else {
        els.trayTitleText.textContent = CATEGORY_CONFIG[state.category].trayTitle;
        els.trayHint.textContent = difficulty === 'easy' ? '👆赤シートをめくって確認' : '👆カードを選んで空欄をクリック';
        setupStandardBoard();
        updateStandardProgress();
    }

    els.homeScreen.classList.remove('active');
    els.gameScreen.classList.add('active');
}

function setupStandardBoard(): void {
    if (state.category === 'sheet') {
        const items = filterSheetItems(state.scope);
        state.totalQuestions = items.length;
        state.choices = shuffled(items).map((s) => ({
            id: s.id,
            answer: s.answer,
            label: s.answer,
            hint: state.difficulty === 'easy' ? s.hint : ''
        }));
        renderSheetBoard(items);
        renderTray();
    } else {
        const pairs = filterPairItems(state.scope);
        state.totalQuestions = pairs.length * 2;
        state.choices = shuffled(
            pairs.flatMap((p) => [
                { id: `${p.id}-a`, answer: p.termA, label: p.termA, hint: state.difficulty === 'easy' ? p.descA : '' },
                { id: `${p.id}-b`, answer: p.termB, label: p.termB, hint: state.difficulty === 'easy' ? p.descB : '' }
            ])
        );
        renderPairBoard(pairs);
        renderTray();
    }
}

function renderSheetBoard(items: ReturnType<typeof filterSheetItems>): void {
    els.boardArea.innerHTML = `<div class="dojo-sheet-list">${items.map((item) => {
        const isSolved = state.solvedIds.has(item.id);
        const isRevealed = state.revealedIds.has(item.id);
        const blankHtml = state.difficulty === 'easy'
            ? `<button type="button" class="red-sheet-btn ${isRevealed ? 'revealed' : ''}" data-id="${item.id}" data-answer="${item.answer}">${isRevealed ? item.answer : '赤シートで隠れています'}</button>`
            : `<button type="button" class="blank-slot-btn ${isSolved ? 'solved' : ''}" data-id="${item.id}" data-answer="${item.answer}">${isSolved ? item.answer : '？'}</button>`;
        return `<div class="dojo-row">
            <span class="dojo-row-tag">No.${item.printNo} ${item.section}</span>
            <div class="dojo-row-text">${item.before}${blankHtml}${item.after}</div>
        </div>`;
    }).join('')}</div>`;

    els.boardArea.querySelectorAll<HTMLButtonElement>('.red-sheet-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset['id'] ?? '';
            if (!state.revealedIds.has(id)) {
                state.revealedIds.add(id);
                state.score++;
                SOUND_FX.playCorrect(1);
                updateStandardProgress();
                renderSheetBoard(items);
                if (state.score >= state.totalQuestions) handleGameClear();
            }
        });
    });

    els.boardArea.querySelectorAll<HTMLButtonElement>('.blank-slot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset['id'] ?? '';
            const expected = btn.dataset['answer'] ?? '';
            handleStandardSlotClick(id, expected);
        });
    });
}

function renderPairBoard(pairs: ReturnType<typeof filterPairItems>): void {
    els.boardArea.innerHTML = `<div class="dojo-pair-grid">${pairs.map((p) => {
        const slotAId = `${p.id}-a`;
        const slotBId = `${p.id}-b`;
        const solvedA = state.solvedIds.has(slotAId);
        const solvedB = state.solvedIds.has(slotBId);
        return `<div class="dojo-pair-card">
            <div class="dojo-row-tag">⚖️ ${p.pairTitle}</div>
            <div class="dojo-pair-row">
                <button type="button" class="blank-slot-btn ${solvedA ? 'solved' : ''}" data-id="${slotAId}" data-answer="${p.termA}">${solvedA ? p.termA : '？'}</button>
                <span class="dojo-pair-desc">${p.descA}</span>
            </div>
            <div class="dojo-pair-row">
                <button type="button" class="blank-slot-btn ${solvedB ? 'solved' : ''}" data-id="${slotBId}" data-answer="${p.termB}">${solvedB ? p.termB : '？'}</button>
                <span class="dojo-pair-desc">${p.descB}</span>
            </div>
        </div>`;
    }).join('')}</div>`;

    els.boardArea.querySelectorAll<HTMLButtonElement>('.blank-slot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            handleStandardSlotClick(btn.dataset['id'] ?? '', btn.dataset['answer'] ?? '');
        });
    });
}

function handleStandardSlotClick(slotId: string, expectedAnswer: string): void {
    if (!state.isPlaying || state.solvedIds.has(slotId)) return;
    if (!state.selectedAnswer) {
        showToast('👆 先に右のカードを選んでね');
        return;
    }
    if (state.selectedAnswer === expectedAnswer) {
        state.solvedIds.add(slotId);
        state.score++;
        SOUND_FX.playCorrect(1);
        showToast(`⭕ 正解！ ${expectedAnswer}`);
        state.choices = state.choices.filter((c) => c.answer !== expectedAnswer);
        state.selectedAnswer = null;
        updateStandardProgress();
        if (state.category === 'sheet') {
            renderSheetBoard(filterSheetItems(state.scope));
        } else {
            renderPairBoard(filterPairItems(state.scope));
        }
        renderTray();
        if (state.score >= state.totalQuestions) handleGameClear();
    } else {
        SOUND_FX.playWrong();
        triggerErrorShake();
        showToast('❌ 違うみたい…');
        state.selectedAnswer = null;
        renderTray();
    }
}

function renderTray(): void {
    els.cardList.innerHTML = '';
    const isOni = state.difficulty === 'oni';
    els.cardList.classList.toggle('oni-choices', isOni);

    if (!isOni && state.difficulty === 'easy' && state.category === 'sheet') {
        els.cardList.innerHTML = `<div class="dojo-easy-guide">赤シートをクリックして答えを確認しよう！<br>全部めくるとクリアです。</div>`;
        return;
    }

    state.choices.forEach((choice, idx) => {
        const card = document.createElement('div');
        const isSelected = state.selectedAnswer === choice.answer;
        card.className = `bio-card${isSelected ? ' selected' : ''}`;
        card.tabIndex = 0;
        card.setAttribute('role', isOni ? 'button' : 'listitem');
        const hintHtml = choice.hint ? `<div class="hint">${choice.hint}</div>` : '';
        card.innerHTML = `<div class="info"><div class="name">${choice.label}</div>${hintHtml}</div>`;

        if (isOni && idx < 9) {
            card.insertAdjacentHTML('afterbegin', `<span class="key-badge" aria-hidden="true">${idx + 1}</span>`);
        }

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        card.addEventListener('click', () => {
            if (!state.isPlaying) return;
            if (isOni) {
                submitOniAnswer(choice.answer);
                return;
            }
            SOUND_FX.playTap();
            state.selectedAnswer = isSelected ? null : choice.answer;
            renderTray();
        });

        els.cardList.appendChild(card);
    });
}

function setupNextOniQuestion(): void {
    const q = buildOniQuestion(state.category, state.scope, state.currentOniAnswer);
    state.currentOniAnswer = q.correctAnswer;
    state.choices = q.choices;
    els.boardArea.innerHTML = `<div class="dojo-oni-card">${q.questionHtml}</div>`;
    renderTray();
}

function submitOniAnswer(answer: string): void {
    if (!state.isPlaying) return;
    if (answer === state.currentOniAnswer) {
        state.score++;
        state.combo++;
        state.maxCombo = Math.max(state.maxCombo, state.combo);
        updateComboBadge();
        if (isBonusCombo(state.combo)) {
            state.oniEndTime += ONI_BONUS_SECONDS * 1000;
            SOUND_FX.playBonus();
            showToast(`🔥 ${state.combo}連続！ +${ONI_BONUS_SECONDS}秒！`);
        } else {
            SOUND_FX.playCorrect(state.combo);
            showToast(`⭕ 正解！ ${answer}`);
        }
        updateOniHud();
        setupNextOniQuestion();
    } else {
        state.combo = 0;
        updateComboBadge();
        SOUND_FX.playWrong();
        triggerErrorShake();
        state.oniEndTime -= ONI_PENALTY_SECONDS * 1000;
        showToast(`❌ ミス！ -${ONI_PENALTY_SECONDS}秒`);
        const rem = Math.max(0, state.oniEndTime - Date.now());
        state.timeLeft = computeRemainingSeconds(state.oniEndTime, Date.now());
        updateOniHud(rem);
        if (rem <= 0) {
            stopTimers();
            handleOniTimeUp();
        } else {
            setupNextOniQuestion();
        }
    }
}

function handleGlobalKeydown(e: KeyboardEvent): void {
    if (!els.gameScreen.classList.contains('active') || !state.isPlaying) return;
    if (state.difficulty === 'oni' && /^[1-9]$/.test(e.key)) {
        const target = els.cardList.querySelectorAll<HTMLElement>('.bio-card')[Number(e.key) - 1];
        if (target) {
            e.preventDefault();
            target.click();
        }
    } else if (e.key === 'Escape' && state.selectedAnswer) {
        state.selectedAnswer = null;
        renderTray();
    }
}

function updateComboBadge(): void {
    if (state.difficulty === 'oni' && state.combo >= 2) {
        els.comboBadge.textContent = `🔥 ${state.combo} COMBO`;
        els.comboBadge.hidden = false;
    } else {
        els.comboBadge.hidden = true;
    }
}

function triggerErrorShake(): void {
    els.mainArea.classList.remove('shake-error');
    void els.mainArea.offsetWidth;
    els.mainArea.classList.add('shake-error');
}

function startOniTimer(): void {
    state.oniEndTime = Date.now() + ONI_TIME_LIMIT * 1000;
    state.timerInterval = setInterval(() => {
        const rem = Math.max(0, state.oniEndTime - Date.now());
        state.timeLeft = computeRemainingSeconds(state.oniEndTime, Date.now());
        if (state.timeLeft <= 10 && state.timeLeft > 0 && state.timeLeft !== state.lastTickSecond) {
            state.lastTickSecond = state.timeLeft;
            SOUND_FX.playTick();
        }
        updateOniHud(rem);
        if (rem <= 0) {
            stopTimers();
            handleOniTimeUp();
        }
    }, 100);
}

function updateOniHud(remainingMs = state.timeLeft * 1000): void {
    els.timerText.textContent = String(state.timeLeft);
    els.scoreText.textContent = `🏆 ${state.score}問`;
    els.progressFill.style.width = `${Math.min(100, (remainingMs / (ONI_TIME_LIMIT * 1000)) * 100)}%`;
    const urgent = state.timeLeft <= 10;
    els.timerBadge.classList.toggle('urgent', urgent);
    els.progressFill.classList.toggle('urgent', urgent);
}

function updateStandardProgress(): void {
    const pct = state.totalQuestions > 0 ? (state.score / state.totalQuestions) * 100 : 0;
    els.progressFill.style.width = `${pct}%`;
}

function showToast(msg: string): void {
    els.toast.innerHTML = msg;
    els.toast.style.backgroundColor = msg.includes('❌') ? 'rgba(239, 68, 68, 0.95)' : 'rgba(0, 90, 193, 0.95)';
    els.toast.classList.add('show');
    if (state.toastTimeout !== null) clearTimeout(state.toastTimeout);
    state.toastTimeout = setTimeout(() => els.toast.classList.remove('show'), 1200);
}

function handleGameClear(): void {
    state.isPlaying = false;
    let unlockedNow = false;
    const key = storageCategoryKey(state.category);
    if (state.difficulty === 'normal' && !progress.isOniUnlocked(key)) {
        progress.unlockOni(key);
        state.justUnlockedOni = true;
        unlockedNow = true;
    }
    SOUND_FX.playClear(unlockedNow);
    els.clearTitle.innerHTML = '🎊 素晴らしい！ 🎊';
    els.clearSubtitle.innerHTML = unlockedNow
        ? 'すべてマスターしました！<div class="unlock-message">どこかでとびらがひらいたようだ…！</div>'
        : 'すべてマスターしました！';
    els.clearActions.hidden = true;
    els.autoReturnText.hidden = false;
    els.clearOverlay.classList.add('active');
    state.returnTimeout = setTimeout(resetToHome, unlockedNow ? 4500 : 3000);
}

function handleOniTimeUp(): void {
    state.isPlaying = false;
    const key = storageCategoryKey(state.category);
    const prev = progress.getOniBest(key) ?? -1;
    const best = Math.max(prev, state.score);
    if (state.score > prev) progress.setOniBest(key, best);
    updateTabScores();
    const rankInfo = getOniRankInfo(state.score);
    SOUND_FX.playTimeUp(rankInfo.rank === 'S' || rankInfo.rank === 'A');
    els.clearTitle.innerHTML = '⏱️ タイムアップ！';
    els.clearSubtitle.innerHTML = `
        <div class="rank-showcase ${rankInfo.className}"><span class="rank-letter">${rankInfo.rank}</span><span class="rank-title-text">${rankInfo.icon} ${rankInfo.title}</span></div>
        <div style="font-size: 42px; font-weight: 900; color: var(--primary);">${state.score}問正解！</div>
        <div>ベスト記録：<b>${best} 問</b></div>
    `;
    els.clearActions.hidden = false;
    els.autoReturnText.hidden = true;
    els.clearOverlay.classList.add('active');
}

function stopTimers(): void {
    if (state.timerInterval !== null) clearInterval(state.timerInterval);
    if (state.returnTimeout !== null) clearTimeout(state.returnTimeout);
    state.timerInterval = null;
    state.returnTimeout = null;
}

function resetToHome(): void {
    stopTimers();
    state.isPlaying = false;
    els.clearOverlay.classList.remove('active');
    els.gameScreen.classList.remove('active');
    els.homeScreen.classList.add('active');
    updateDifficultyVisibility(state.justUnlockedOni);
    updateTabScores();
    state.justUnlockedOni = false;
}

init();
