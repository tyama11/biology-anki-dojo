import {
    CATEGORY_CONFIG,
    DIFFICULTY_LABELS,
    PRINT_LABELS,
    PRINT_SCOPES,
    getOniRankInfo
} from './data.ts';
import { byId, bySelector } from './dom.ts';
import {
    ONI_BONUS_SECONDS,
    ONI_PENALTY_SECONDS,
    ONI_TIME_LIMIT,
    buildOniQuestion,
    buildStandardChoices,
    computeRemainingSeconds,
    filterPairItems,
    filterSheetItems,
    getWeakestPrintAdvice,
    isAnswerMatch,
    isBonusCombo
} from './game-logic.ts';
import { createSoundFx } from './sound.ts';
import { createProgressStore, safeLocalStorage } from './storage.ts';
import type { Category, Difficulty, DojoChoice, PrintScope, TabId } from './types.ts';

interface DojoState {
    tab: TabId;
    category: Category;
    difficulty: Difficulty;
    scope: PrintScope;
    score: number;
    combo: number;
    maxCombo: number;
    totalQuestions: number;
    selectedAnswer: string | null;
    currentOniAnswer: string | null;
    currentOniPrintNo: PrintScope;
    oniMistakes: Record<PrintScope, number>;
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
    tab: 'sheet',
    category: 'sheet',
    difficulty: 'easy',
    scope: '1',
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalQuestions: 0,
    selectedAnswer: null,
    currentOniAnswer: null,
    currentOniPrintNo: '1',
    oniMistakes: { '1': 0, '2': 0, '3': 0, '4': 0 },
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
    oniBestRecord: byId('oni-best-record'),
    scopePicker: byId('scope-picker'),
    ruleEasyItem: byId('rule-easy-item'),
    ruleNormalItem: byId('rule-normal-item'),
    ruleOniItem: byId('rule-oni-item'),
    btnEasy: byId<HTMLButtonElement>('btn-easy'),
    btnNormal: byId<HTMLButtonElement>('btn-normal'),
    btnOni: byId<HTMLButtonElement>('btn-oni'),
    badgeEasy: byId('badge-easy'),
    badgeNormal: byId('badge-normal'),
    homeMuteBtn: byId<HTMLButtonElement>('home-mute-btn'),
    gameMuteBtn: byId<HTMLButtonElement>('game-mute-btn'),
    oniProgressNote: byId('oni-progress-note'),
    scopeButtons: document.querySelectorAll<HTMLButtonElement>('.scope-btn'),
    scopeBadges: {
        '1': byId('scope-badge-1'),
        '2': byId('scope-badge-2'),
        '3': byId('scope-badge-3'),
        '4': byId('scope-badge-4')
    } as Record<PrintScope, HTMLElement>,
    tabScoreSheet: byId('tab-score-sheet'),
    tabScorePair: byId('tab-score-pair'),
    tabScoreOni: byId('tab-score-oni'),
    tabOni: byId<HTMLButtonElement>('tab-oni'),
    categorySwitcher: bySelector('.category-switcher'),
    kbdOniLine: byId('kbd-oni-line'),
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

function init(): void {
    els.categoryTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            SOUND_FX.playTap();
            const t = tab.dataset['tab'];
            if (t === 'sheet' || t === 'pair' || t === 'oni') setTab(t);
        });
    });

    els.scopeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            SOUND_FX.playTap();
            const scope = btn.dataset['scope'];
            if (scope === '1' || scope === '2' || scope === '3' || scope === '4') {
                setScope(scope);
            }
        });
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

    let muteClickTimes: number[] = [];
    const handleMute = (): void => {
        SOUND_FX.toggleMute();
        syncMuteButtons();

        const now = Date.now();
        muteClickTimes = muteClickTimes.filter((t) => now - t <= 3000);
        muteClickTimes.push(now);
        if (muteClickTimes.length >= 6) {
            muteClickTimes = [];
            if (!progress.isOniUnlocked()) {
                progress.unlockOniSecret();
                els.tabOni.classList.add('just-unlocked');
                updateTabScores();
                setTab('oni');
                updateTabContentVisibility(true);
                SOUND_FX.playClear(true);
                showToast('👹 どこかでとびらがひらいたようだ…！');
            }
        }
    };
    els.homeMuteBtn.addEventListener('click', handleMute);
    els.gameMuteBtn.addEventListener('click', handleMute);
    syncMuteButtons();

    document.addEventListener('keydown', handleGlobalKeydown);

    setTab('sheet');
    updateTabScores();
}

function syncMuteButtons(): void {
    const muted = SOUND_FX.isMuted();
    els.homeMuteBtn.textContent = muted ? '🔇 音OFF' : '🔊 音ON';
    els.gameMuteBtn.textContent = muted ? '🔇' : '🔊';
}

function updateTabScores(): void {
    const sheetCount = progress.getCategoryClearedCount('sheet');
    els.tabScoreSheet.textContent = sheetCount === 8 ? '👑 8/8' : `✅ ${sheetCount}/8`;
    els.tabScoreSheet.hidden = false;

    const pairCount = progress.getCategoryClearedCount('pair');
    els.tabScorePair.textContent = pairCount === 8 ? '👑 8/8' : `✅ ${pairCount}/8`;
    els.tabScorePair.hidden = false;

    const unlocked = progress.isOniUnlocked();
    els.tabOni.hidden = !unlocked;
    els.categorySwitcher.classList.toggle('oni-unlocked', unlocked);
    els.kbdOniLine.hidden = !unlocked;

    if (!unlocked) {
        els.tabScoreOni.classList.remove('rank-s');
        els.tabScoreOni.hidden = true;
        if (state.tab === 'oni') {
            setTab('sheet');
        }
    } else {
        const best = progress.getOniBest();
        if (best !== null) {
            const rankInfo = getOniRankInfo(best);
            els.tabScoreOni.textContent = `👹 ${best}問`;
            els.tabScoreOni.classList.toggle('rank-s', rankInfo.rank === 'S');
            els.tabScoreOni.hidden = false;
        } else {
            els.tabScoreOni.classList.remove('rank-s');
            els.tabScoreOni.hidden = true;
        }
    }
    updateCurrentTitle();
}

function updateCurrentTitle(): void {
    if (state.tab !== 'oni' || !progress.isOniUnlocked()) {
        els.earnedTitleBanner.hidden = true;
        els.oniBestRecord.hidden = true;
        return;
    }
    const saved = progress.getOniBest();
    if (saved === null) {
        els.earnedTitleBanner.hidden = true;
        els.oniBestRecord.hidden = true;
        return;
    }
    const rankInfo = getOniRankInfo(saved);
    els.earnedTitleBanner.className = `earned-title-banner ${rankInfo.className}`;
    els.earnedTitleBanner.textContent = `称号：${rankInfo.icon} ${rankInfo.title}`;
    els.earnedTitleBanner.hidden = false;
    els.oniBestRecord.textContent = `🏆 ベスト記録：${saved} 問`;
    els.oniBestRecord.hidden = false;
}

function updateTabContentVisibility(animate = false): void {
    const isOniTab = state.tab === 'oni';
    const unlocked = progress.isOniUnlocked();

    els.scopePicker.hidden = isOniTab;
    els.ruleEasyItem.hidden = isOniTab;
    els.ruleNormalItem.hidden = isOniTab;
    els.ruleOniItem.hidden = !isOniTab || !unlocked;

    els.btnEasy.hidden = isOniTab;
    els.btnNormal.hidden = isOniTab;
    els.btnOni.hidden = !isOniTab;
    els.btnOni.disabled = !unlocked;
    els.btnOni.classList.toggle('just-unlocked', isOniTab && unlocked && animate);

    if (isOniTab && !unlocked) {
        const cleared = progress.getTotalClearedCount();
        els.oniProgressNote.textContent = `🔒 全16ステージ（赤シート・ペアの4分野×2難易度）クリアで解放（${cleared} / 16 ステージ）`;
        els.oniProgressNote.hidden = false;
    } else {
        els.oniProgressNote.hidden = true;
    }
}

function updateModeClearBadges(): void {
    if (state.tab === 'oni') {
        els.badgeEasy.hidden = true;
        els.badgeNormal.hidden = true;
        return;
    }
    els.badgeEasy.hidden = !progress.isStageCleared(state.category, state.scope, 'easy');
    els.badgeNormal.hidden = !progress.isStageCleared(state.category, state.scope, 'normal');
}

function updateScopeBadges(): void {
    PRINT_SCOPES.forEach((scope) => {
        const badge = els.scopeBadges[scope];
        const easyCleared = progress.isStageCleared(state.category, scope, 'easy');
        const normalCleared = progress.isStageCleared(state.category, scope, 'normal');
        const count = (easyCleared ? 1 : 0) + (normalCleared ? 1 : 0);
        if (count === 2) {
            badge.textContent = '🌟 2/2済';
            badge.hidden = false;
        } else if (count === 1) {
            badge.textContent = '✅ 1/2';
            badge.hidden = false;
        } else {
            badge.hidden = true;
        }
    });
}

function setScope(scope: PrintScope): void {
    state.scope = scope;
    els.scopeButtons.forEach((btn) => {
        const active = btn.dataset['scope'] === scope;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-checked', String(active));
    });
    updateModeClearBadges();
}

function setTab(tab: TabId): void {
    state.tab = tab;
    if (tab === 'sheet' || tab === 'pair') {
        state.category = tab;
    }
    els.categoryTabs.forEach((t) => {
        const active = t.dataset['tab'] === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
    });
    els.homeDesc.textContent = tab === 'oni'
        ? '全分野・5形式ランダム出題の60秒タイムアタック！'
        : CATEGORY_CONFIG[state.category].description;
    updateScopeBadges();
    updateModeClearBadges();
    updateTabContentVisibility();
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
    state.currentOniPrintNo = '1';
    state.oniMistakes = { '1': 0, '2': 0, '3': 0, '4': 0 };
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
    els.modeDisplay.textContent = isOni
        ? `📚 全分野 / ${DIFFICULTY_LABELS.oni}`
        : `${PRINT_LABELS[state.scope]} / ${DIFFICULTY_LABELS[difficulty]}`;

    if (isOni) {
        els.trayTitleText.textContent = '❓ ？に入るのはどれ？';
        els.trayHint.textContent = '👆クリック または 1〜4キーで回答';
        setupNextOniQuestion();
        updateOniHud();
        startOniTimer();
    } else {
        els.trayTitleText.textContent = CATEGORY_CONFIG[state.category].trayTitle;
        els.trayHint.textContent = difficulty === 'easy' && state.category === 'sheet'
            ? '👆赤シートをめくって確認'
            : '👆ダミーに注意！カードを選んで空欄へ';
        setupStandardBoard();
        updateStandardProgress();
    }

    els.homeScreen.classList.remove('active');
    els.gameScreen.classList.add('active');
}

function setupStandardBoard(): void {
    const stdDiff = state.difficulty === 'easy' ? 'easy' : 'normal';
    state.choices = buildStandardChoices(state.category, state.scope, stdDiff);
    if (state.category === 'sheet') {
        const items = filterSheetItems(state.scope);
        state.totalQuestions = items.length;
        renderSheetBoard(items);
        renderTray();
    } else {
        const pairs = filterPairItems(state.scope);
        state.totalQuestions = pairs.length * 2;
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
    if (isAnswerMatch(state.selectedAnswer, expectedAnswer)) {
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
    const q = buildOniQuestion(state.currentOniAnswer);
    state.currentOniAnswer = q.correctAnswer;
    state.currentOniPrintNo = q.printNo;
    state.choices = q.choices;
    els.boardArea.innerHTML = `<div class="dojo-oni-card">${q.questionHtml}</div>`;
    renderTray();
}

function submitOniAnswer(answer: string): void {
    if (!state.isPlaying) return;
    if (state.currentOniAnswer !== null && isAnswerMatch(answer, state.currentOniAnswer)) {
        state.score++;
        state.combo++;
        state.maxCombo = Math.max(state.maxCombo, state.combo);
        updateComboBadge();
        if (isBonusCombo(state.combo)) {
            state.oniEndTime += ONI_BONUS_SECONDS * 1000;
            SOUND_FX.playBonus();
            flashTimerBadge('bonus-flash');
            showToast(`🔥 ${state.combo}連続！ +${ONI_BONUS_SECONDS}秒！`);
        } else {
            SOUND_FX.playCorrect(state.combo);
            showToast(`⭕ 正解！ ${answer}`);
        }
        updateOniHud();
        setupNextOniQuestion();
    } else {
        state.combo = 0;
        state.oniMistakes[state.currentOniPrintNo] += 1;
        updateComboBadge();
        SOUND_FX.playWrong();
        triggerErrorShake();
        flashTimerBadge('penalty-flash');
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

function flashTimerBadge(className: 'bonus-flash' | 'penalty-flash'): void {
    els.timerBadge.classList.remove('bonus-flash', 'penalty-flash');
    void els.timerBadge.offsetWidth;
    els.timerBadge.classList.add(className);
    setTimeout(() => els.timerBadge.classList.remove(className), 350);
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
    if (state.difficulty === 'easy' || state.difficulty === 'normal') {
        const wasUnlocked = progress.isOniUnlocked();
        progress.markStageCleared(state.category, state.scope, state.difficulty);
        unlockedNow = !wasUnlocked && progress.isOniUnlocked();
        if (unlockedNow) {
            state.justUnlockedOni = true;
        }
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

function getNextRankHint(score: number): string {
    if (score >= 34) return '👑 最高ランク達成！';
    if (score >= 26) return `あと ${34 - score}問でランクS！`;
    if (score >= 16) return `あと ${26 - score}問でランクA！`;
    return `あと ${16 - score}問でランクB！`;
}

function handleOniTimeUp(): void {
    state.isPlaying = false;
    const prev = progress.getOniBest() ?? -1;
    const best = Math.max(prev, state.score);
    if (state.score > prev) progress.setOniBest(best);
    updateTabScores();
    const rankInfo = getOniRankInfo(state.score);
    const advice = getWeakestPrintAdvice(state.oniMistakes);
    SOUND_FX.playTimeUp(rankInfo.rank === 'S' || rankInfo.rank === 'A');
    els.clearTitle.innerHTML = '⏱️ タイムアップ！';
    els.clearSubtitle.innerHTML = `
        <div class="rank-showcase ${rankInfo.className}"><span class="rank-letter">${rankInfo.rank}</span><span class="rank-title-text">${rankInfo.icon} ${rankInfo.title}</span></div>
        <div style="font-size: 42px; font-weight: 900; color: var(--primary);">${state.score}問正解！</div>
        <div>ベスト記録：<b>${best} 問</b></div>
        <div class="next-rank-hint">${getNextRankHint(state.score)}</div>
        <div class="review-advice">${advice}</div>
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
    els.tabOni.classList.toggle('just-unlocked', state.justUnlockedOni);
    updateScopeBadges();
    updateModeClearBadges();
    updateTabContentVisibility(state.justUnlockedOni);
    updateTabScores();
    state.justUnlockedOni = false;
}

init();
