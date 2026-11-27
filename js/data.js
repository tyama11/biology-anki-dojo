                                                                                                                                                                   

export const PRINT_SCOPES                        = ['1', '2', '3', '4'];

export const PRINT_LABELS                                       = {
    '1': '🧬 No.1 細胞・酵素・DNA',
    '2': '🧠 No.2 神経とホルモン',
    '3': '🛡️ No.3 免疫',
    '4': '🌿 No.4 植生と生態系'
};

export const SHEET_ITEMS                       = [
    // No.1
    { id: 's1-1', printNo: '1', section: '顕微鏡の限界', before: '肉眼の限界は（', answer: '0.1mm', after: '）である。', hint: '最小目盛りの10分の1' },
    { id: 's1-2', printNo: '1', section: '顕微鏡の限界', before: '光学顕微鏡の限界は（', answer: '0.1μm', after: '）である。', hint: '肉眼から単位が1つ変わる' },
    { id: 's1-3', printNo: '1', section: '顕微鏡の限界', before: '電子顕微鏡の限界は（', answer: '0.1nm', after: '）である。', hint: '光学顕微鏡から単位が1つ変わる' },
    { id: 's1-4', printNo: '1', section: '原核・真核', before: '〇〇菌は菌類ではなく（', answer: '細菌類', after: '）なので原核生物。', hint: '大腸菌・乳酸菌など' },
    { id: 's1-5', printNo: '1', section: '酵素の特徴', before: '酵素は特定の物質にのみ働く（', answer: '基質特異性', after: '）をもつ。', hint: '鍵と鍵穴の関係' },
    { id: 's1-6', printNo: '1', section: 'DNAとゲノム', before: 'DNA量がSすごく増えるのは（', answer: 'S期', after: '）である。', hint: 'DNAの複製（合成）が行われる時期' },
    // No.2
    { id: 's2-1', printNo: '2', section: '恒常性', before: '神経系は電気信号と（', answer: '神経伝達物質', after: '）で情報を伝える。', hint: 'ニューロンを通る速い伝達' },
    { id: 's2-2', printNo: '2', section: '血糖調節', before: 'すい臓ランゲルハンス島A細胞から分泌されるのは（', answer: 'グルカゴン', after: '）。', hint: 'グリコーゲンを分解して血糖値を上げる' },
    { id: 's2-3', printNo: '2', section: '血糖調節', before: '血糖値を下げる唯一のホルモンは（', answer: 'インスリン', after: '）。', hint: 'すい臓ランゲルハンス島B細胞から分泌' },
    { id: 's2-4', printNo: '2', section: '血糖調節', before: '副腎皮質から分泌され糖新生を促すのは（', answer: '糖質コルチコイド', after: '）。', hint: 'タンパク質からグルコースを作る' },
    { id: 's2-5', printNo: '2', section: '体液調節', before: '腎臓での水の再吸収を促進するのは（', answer: 'バソプレシン', after: '）。', hint: '脳下垂体後葉から分泌' },
    // No.3
    { id: 's3-1', printNo: '3', section: '化学的防御', before: '涙やだ液に含まれ細菌の細胞壁を分解する酵素は（', answer: 'リゾチーム', after: '）。', hint: '細菌の細胞壁を壊す' },
    { id: 's3-2', printNo: '3', section: '化学的防御', before: '皮膚や粘膜上皮に含まれ細菌の細胞膜を破壊するのは（', answer: 'ディフェンシン', after: '）。', hint: 'タンパク質の一種' },
    { id: 's3-3', printNo: '3', section: '免疫不全', before: 'HIVは獲得免疫の司令塔である（', answer: 'ヘルパーT細胞', after: '）を破壊する。', hint: 'エイズ（後天性免疫不全症候群）の原因' },
    { id: 's3-4', printNo: '3', section: '二次応答', before: '同じ病原体の再侵入時、（', answer: '記憶細胞', after: '）により急速で強い反応が起こる。', hint: '2度目のニューゲームは強くて早い' },
    // No.4
    { id: 's4-1', printNo: '4', section: '光合成', before: '見かけの光合成速度が0になる光の強さを（', answer: '光補償点', after: '）という。', hint: '光合成量＝呼吸量（光合成速度が0ではない！）' },
    { id: 's4-2', printNo: '4', section: '遷移', before: '森林が成立しなくなる上限を（', answer: '森林限界', after: '）という。', hint: '亜高山帯と高山帯の境' },
    { id: 's4-3', printNo: '4', section: '水界の汚れ', before: '湖沼でプランクトンが大発生し水面が緑色になる現象を（', answer: 'アオコ', after: '）という。', hint: '青い湖で覚える' },
    { id: 's4-4', printNo: '4', section: '地球環境', before: 'フロンが成層圏のオゾン層を破壊すると（', answer: '紫外線', after: '）が地表に多く届く。', hint: '皮膚がんや白内障が増える' }
];

export const PAIR_ITEMS                      = [
    { id: 'p1', printNo: '1', pairTitle: '原核 vs 真核', termA: '細菌類（〜菌）', descA: '核をもたない原核生物（大腸菌・乳酸菌など）', shortDescA: '核をもたない原核生物', termB: '菌類（酵母菌・カビ）', descB: '核をもつ真核生物', shortDescB: '核をもつ真核生物の仲間' },
    { id: 'p1b', printNo: '1', pairTitle: '代謝の区分', termA: '同化', descA: '簡単な物質から複雑な物質を合成する反応（光合成など）', shortDescA: '単純→複雑な物質を合成', termB: '異化', descB: '複雑な物質を簡単な物質に分解しエネルギーを取り出す反応（呼吸など）', shortDescB: '複雑→単純に分解しATP生成' },
    { id: 'p1c', printNo: '1', pairTitle: 'エネルギー変換小器官', termA: 'ミトコンドリア', descA: '呼吸の場としてATPを合成する（動物・植物ともに存在）', shortDescA: '呼吸の場・動植物に存在', termB: '葉緑体', descB: '光合成の場として有機物を合成する（植物・藻類に存在）', shortDescB: '光合成の場・植物などに存在' },
    { id: 'p1d', printNo: '1', pairTitle: '核酸の種類', termA: 'DNA', descA: '二本鎖らせん構造で遺伝情報の本体（糖はデオキシリボース）', shortDescA: '二本鎖で糖はデオキシリボース', termB: 'RNA', descB: '一本鎖でタンパク質合成に働く（糖はリボース）', shortDescB: '一本鎖で糖はリボース' },
    { id: 'p2', printNo: '2', pairTitle: '血糖調節ホルモン', termA: 'グルカゴン（A細胞）', descA: 'グリコーゲンを分解し血糖値を上げる', shortDescA: 'グリコーゲン分解で血糖上昇', termB: 'インスリン（B細胞）', descB: 'グルコースをグリコーゲンに変え血糖値を下げる', shortDescB: '血糖値を下げる唯一のホルモン' },
    { id: 'p2b', printNo: '2', pairTitle: '自律神経', termA: '交感神経', descA: '闘争と逃走（心拍数増加・瞳孔拡大）', shortDescA: '心拍数増加・瞳孔拡大', termB: '副交感神経', descB: 'リラックス（消化管の働き促進・心拍数減少）', shortDescB: '消化促進・心拍数減少' },
    { id: 'p2c', printNo: '2', pairTitle: '分泌腺の種類', termA: '内分泌腺', descA: '排出管をもたずホルモンを血液中に直接分泌する', shortDescA: '排出管なく血液中へ直接分泌', termB: '外分泌腺', descB: '排出管を通じて消化液や汗などを体外・管腔へ分泌する', shortDescB: '排出管から体外・管腔へ分泌' },
    { id: 'p3', printNo: '3', pairTitle: '化学的防御', termA: 'リゾチーム', descA: '涙やだ液に含まれ細菌の細胞壁を分解', shortDescA: '涙やだ液で細胞壁を分解', termB: 'ディフェンシン', descB: '皮膚や粘膜に含まれ細菌の細胞膜を破壊', shortDescB: '皮膚や粘膜で細胞膜を破壊' },
    { id: 'p3b', printNo: '3', pairTitle: '医療への応用', termA: '予防接種（ワクチン）', descA: '無毒化・弱毒化した病原体で記憶細胞をつくる', shortDescA: '弱毒化病原体で記憶細胞作る', termB: '血清療法', descB: '動物に作らせた抗体を直接注射する', shortDescB: '動物由来の抗体を直接注射' },
    { id: 'p3c', printNo: '3', pairTitle: '獲得免疫の2系統', termA: '体液性免疫', descA: 'B細胞が形質細胞に分化して抗体を産生し排除する', shortDescA: 'B細胞が抗体を産生し排除', termB: '細胞性免疫', descB: 'キラーT細胞が感染細胞などを直接攻撃して破壊する', shortDescB: 'キラーT細胞が直接攻撃' },
    { id: 'p3d', printNo: '3', pairTitle: '免疫の分類', termA: '自然免疫', descA: '生まれつき備わり非特異的にすばやく病原体を排除する', shortDescA: '生まれつき・非特異的に排除', termB: '獲得免疫', descB: '抗原を記憶し特異的かつ強力に病原体を排除する', shortDescB: '抗原を記憶・特異的に排除' },
    { id: 'p6', printNo: '4', pairTitle: '植生の遷移', termA: '一次遷移', descA: '土壌のない裸地（溶岩流の跡など）から始まる', shortDescA: '土壌のない裸地から始まる', termB: '二次遷移', descB: '土壌や種子が残る跡地（山火事・伐採後）から始まる', shortDescB: '土壌や種子が残る跡地から' },
    { id: 'p7', printNo: '4', pairTitle: '環境と生物の相互作用', termA: '作用', descA: '非生物的環境（光・水・温度）が生物に与える影響', shortDescA: '環境が生物に与える影響', termB: '環境形成作用', descB: '生物が非生物的環境（土壌・光など）を変化させる働き', shortDescB: '生物が環境を変化させる働き' },
    { id: 'p8', printNo: '4', pairTitle: '富栄養化', termA: 'アオコ', descA: '湖沼でプランクトンが大発生し水面が緑色になる', shortDescA: '湖沼で水面が緑色になる', termB: '赤潮', descB: '内湾・内海でプランクトンが大発生し海面が赤褐色になる', shortDescB: '内湾で海面が赤褐色になる' },
    { id: 'p9', printNo: '4', pairTitle: '地球環境問題', termA: '地球温暖化', descA: '温室効果ガスが地表からの赤外線（熱）を吸収する', shortDescA: '温室効果ガスが赤外線を吸収', termB: 'オゾン層の破壊', descB: 'フロンによる破壊で有害な紫外線が地表に届く', shortDescB: 'フロン破壊で紫外線が増加' },
    { id: 'p10', printNo: '4', pairTitle: '生態ピラミッドの逆転', termA: '個体数ピラミッドの逆転', descA: '1本の大きな樹木に大量の毛虫がつく例', shortDescA: '大木1本に大量の毛虫がつく例', termB: '生物量ピラミッドの逆転', descB: '海の植物プランクトンが増殖・被食され現存量が少ない例', shortDescB: '海の植物プランクトンが少ない例' }
];

export const TRUE_FALSE_ITEMS                           = [
    { id: 'tf-1', printNo: '1', statement: '酵母菌やカビは「菌」がつくので原核生物である。', isTrue: false },
    { id: 'tf-2', printNo: '1', statement: '大腸菌や乳酸菌は核をもたない原核生物である。', isTrue: true },
    { id: 'tf-3', printNo: '1', statement: 'ミトコンドリアは動物細胞にのみ存在する。', isTrue: false },
    { id: 'tf-4', printNo: '1', statement: 'DNAの塩基のうち、チミンはRNAには含まれない。', isTrue: true },
    { id: 'tf-5', printNo: '2', statement: 'インスリンは血糖値を下げる唯一のホルモンである。', isTrue: true },
    { id: 'tf-6', printNo: '2', statement: '交感神経が働くと心拍数は減少する。', isTrue: false },
    { id: 'tf-7', printNo: '2', statement: 'バソプレシンは腎臓での水の再吸収を促進する。', isTrue: true },
    { id: 'tf-8', printNo: '2', statement: 'ホルモンは外分泌腺から血液中に分泌される。', isTrue: false },
    { id: 'tf-9', printNo: '3', statement: '涙やだ液のリゾチームは細菌の細胞壁を分解する。', isTrue: true },
    { id: 'tf-10', printNo: '3', statement: '血清療法は記憶細胞をつくらせる治療法である。', isTrue: false },
    { id: 'tf-11', printNo: '3', statement: 'HIVは獲得免疫の司令塔であるヘルパーT細胞を破壊する。', isTrue: true },
    { id: 'tf-12', printNo: '4', statement: '光補償点では見かけの光合成速度が0になる。', isTrue: true },
    { id: 'tf-13', printNo: '4', statement: '山火事の跡地から始まる遷移は一次遷移である。', isTrue: false },
    { id: 'tf-14', printNo: '4', statement: 'オゾン層破壊の原因物質としてフロンが知られる。', isTrue: true }
];

export const ODD_ONE_OUT_ITEMS                           = [
    { id: 'ooo-1', printNo: '1', prompt: '原核生物でないものは？', oddOne: '酵母菌', mates: ['大腸菌', '乳酸菌', 'シアノバクテリア'] },
    { id: 'ooo-2', printNo: '1', prompt: 'DNAに含まれない塩基は？', oddOne: 'ウラシル(U)', mates: ['アデニン(A)', 'チミン(T)', 'グアニン(G)'] },
    { id: 'ooo-3', printNo: '2', prompt: '血糖値を上げないものは？', oddOne: 'インスリン', mates: ['グルカゴン', 'アドレナリン', '糖質コルチコイド'] },
    { id: 'ooo-4', printNo: '2', prompt: '交感神経の働きでないのは？', oddOne: '消化促進', mates: ['心拍数増加', '瞳孔拡大', '気管支拡張'] },
    { id: 'ooo-5', printNo: '3', prompt: '自然免疫に含まれないのは？', oddOne: '抗体産生', mates: ['好中球の食作用', 'リゾチーム', 'ディフェンシン'] },
    { id: 'ooo-6', printNo: '3', prompt: '体液性免疫の主役でないのは？', oddOne: 'キラーT細胞', mates: ['B細胞', '形質細胞', '抗体'] },
    { id: 'ooo-7', printNo: '4', prompt: '一次遷移の場でないのは？', oddOne: '山火事の跡地', mates: ['溶岩流の跡', '砂丘', '氷河の跡'] },
    { id: 'ooo-8', printNo: '4', prompt: '温室効果ガスでないのは？', oddOne: '窒素(N₂)', mates: ['二酸化炭素', 'メタン', '水蒸気'] },
    { id: 'ooo-9', printNo: '4', prompt: '非生物的環境でないのは？', oddOne: '植物プランクトン', mates: ['光・温度', '水・土壌', '大気・風'] }
];

function svgArrow(x1        , y1        , x2        , y2        , color = '#475569')         {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const len = 10;
    const ax1 = x2 - len * Math.cos(angle - Math.PI / 6);
    const ay1 = y2 - len * Math.sin(angle - Math.PI / 6);
    const ax2 = x2 - len * Math.cos(angle + Math.PI / 6);
    const ay2 = y2 - len * Math.sin(angle + Math.PI / 6);
    return `<line x1="${x1}" y1="${y1}" x2="${x2 - 4 * Math.cos(angle)}" y2="${y2 - 4 * Math.sin(angle)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <polygon points="${x2},${y2} ${ax1.toFixed(1)},${ay1.toFixed(1)} ${ax2.toFixed(1)},${ay2.toFixed(1)}" fill="${color}"/>`;
}

function svgBox(
    x        ,
    y        ,
    w        ,
    h        ,
    label        ,
    isBlank         ,
    fill = '#E0F2FE',
    stroke = '#0284C7',
    textColor = '#0369A1',
    sub = ''
)         {
    if (isBlank) {
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" class="oni-svg-blank"/>
            <text x="${x + w / 2}" y="${y + h / 2 + (sub ? -2 : 7)}" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 18}" text-anchor="middle" font-size="11" font-weight="700" fill="#92400E">${sub}</text>` : ''}`;
    }
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>
        <text x="${x + w / 2}" y="${y + h / 2 + (sub ? -2 : 6)}" text-anchor="middle" font-size="15" font-weight="800" fill="${textColor}">${label}</text>
        ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 18}" text-anchor="middle" font-size="11" font-weight="700" fill="${textColor}">${sub}</text>` : ''}`;
}

export const DIAGRAM_ITEMS                                 = [
    {
        id: 'dg-1',
        printNo: '1',
        title: '細胞周期のサイクル',
        slots: [
            {
                answer: 'S期',
                distractors: ['G1期', 'G2期', 'M期'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="細胞周期の図">
                    ${svgBox(20, 95, 105, 62, 'G1期', false)}
                    ${svgArrow(129, 126, 156, 126)}
                    ${svgBox(160, 95, 105, 62, 'S期', true, '#E0F2FE', '#0284C7', '#0369A1', 'DNA複製')}
                    ${svgArrow(269, 126, 296, 126)}
                    ${svgBox(300, 95, 105, 62, 'G2期', false)}
                    ${svgArrow(409, 126, 436, 126)}
                    ${svgBox(440, 95, 100, 62, 'M期', false, '#FCE7F3', '#DB2777', '#9D174D')}
                    <text x="280" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNA量が2倍に増える時期は？</text>
                </svg>`
            },
            {
                answer: 'M期',
                distractors: ['S期', 'G1期', 'G2期'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="細胞周期の図">
                    ${svgBox(20, 95, 105, 62, 'G1期', false)}
                    ${svgArrow(129, 126, 156, 126)}
                    ${svgBox(160, 95, 105, 62, 'S期', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(269, 126, 296, 126)}
                    ${svgBox(300, 95, 105, 62, 'G2期', false)}
                    ${svgArrow(409, 126, 436, 126)}
                    ${svgBox(440, 95, 100, 62, 'M期', true, '#FCE7F3', '#DB2777', '#9D174D', '細胞分裂')}
                    <text x="280" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">染色体が分配され細胞分裂する時期は？</text>
                </svg>`
            },
            {
                answer: 'G1期',
                distractors: ['S期', 'G2期', 'M期'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="細胞周期の図">
                    ${svgBox(20, 95, 105, 62, 'G1期', true, '#E0F2FE', '#0284C7', '#0369A1', '複製準備')}
                    ${svgArrow(129, 126, 156, 126)}
                    ${svgBox(160, 95, 105, 62, 'S期', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(269, 126, 296, 126)}
                    ${svgBox(300, 95, 105, 62, 'G2期', false)}
                    ${svgArrow(409, 126, 436, 126)}
                    ${svgBox(440, 95, 100, 62, 'M期', false, '#FCE7F3', '#DB2777', '#9D174D')}
                    <text x="280" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNA複製の準備をする時期は？</text>
                </svg>`
            }
        ]
    },
    {
        id: 'dg-2',
        printNo: '1',
        title: '酵素と基質の反応',
        slots: [
            {
                answer: '活性部位',
                distractors: ['基質', '生成物', '補酵素'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="酵素の活性部位の図">
                    <path d="M70 80 L230 80 L230 115 L185 115 L185 155 L230 155 L230 190 L70 190 Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="3"/>
                    <text x="125" y="140" text-anchor="middle" font-size="18" font-weight="800" fill="#115E59">酵素</text>
                    ${svgBox(195, 112, 80, 44, '活性部位', true)}
                    ${svgArrow(330, 134, 282, 134, '#4F46E5')}
                    ${svgBox(335, 112, 140, 44, '基質（鍵）', false, '#E0E7FF', '#4F46E5', '#3730A3')}
                    <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">基質が結合する酵素のくぼみの名称は？</text>
                </svg>`
            },
            {
                answer: '基質',
                distractors: ['活性部位', '生成物', '補酵素'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="酵素と基質の図">
                    <path d="M70 80 L230 80 L230 115 L185 115 L185 155 L230 155 L230 190 L70 190 Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="3"/>
                    <text x="125" y="140" text-anchor="middle" font-size="18" font-weight="800" fill="#115E59">酵素</text>
                    ${svgArrow(330, 134, 240, 134, '#4F46E5')}
                    ${svgBox(335, 112, 140, 44, '基質', true, '#E0E7FF', '#4F46E5', '#3730A3', '鍵')}
                    <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">酵素が働く相手の物質を何という？</text>
                </svg>`
            }
        ]
    },
    {
        id: 'dg-3',
        printNo: '2',
        title: '血糖値を下げる経路',
        slots: [
            {
                answer: 'インスリン',
                distractors: ['グルカゴン', 'アドレナリン', '糖質コルチコイド'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="血糖値低下の経路図">
                    ${svgBox(175, 16, 210, 58, '高血糖（B細胞が感知）', false, '#FEE2E2', '#DC2626', '#991B1B')}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, 'インスリン', true)}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, '血糖値低下（グリコーゲン合成）', false, '#DCFCE7', '#16A34A', '#166534')}
                </svg>`
            },
            {
                answer: 'グリコーゲン',
                distractors: ['グルコース', 'デンプン', 'セルロース'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="グリコーゲン合成の経路図">
                    ${svgBox(175, 16, 210, 58, '高血糖（B細胞が感知）', false, '#FEE2E2', '#DC2626', '#991B1B')}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, 'インスリン（肝臓・筋肉へ）', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, 'グリコーゲン', true, '#DCFCE7', '#16A34A', '#166534', '合成して貯蔵')}
                </svg>`
            }
        ]
    },
    {
        id: 'dg-4',
        printNo: '2',
        title: '副腎皮質からの血糖上昇',
        slots: [
            {
                answer: '糖質コルチコイド',
                distractors: ['鉱質コルチコイド', 'バソプレシン', 'アドレナリン'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="副腎皮質ホルモンの経路図">
                    ${svgBox(175, 16, 210, 58, '副腎皮質（低血糖時に分泌）', false, '#FFEDD5', '#EA580C', '#9A3412')}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, '糖質コルチコイド', true)}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, '糖新生（血糖値上昇）', false, '#FEF9C3', '#CA8A04', '#854D0E')}
                </svg>`
            },
            {
                answer: '副腎皮質',
                distractors: ['副腎髄質', 'すい臓A細胞', '脳下垂体後葉'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="副腎皮質の図">
                    ${svgBox(175, 16, 210, 58, '副腎皮質', true)}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, '糖質コルチコイド', false, '#FFEDD5', '#EA580C', '#9A3412')}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, '糖新生（血糖値上昇）', false, '#FEF9C3', '#CA8A04', '#854D0E')}
                </svg>`
            }
        ]
    },
    {
        id: 'dg-5',
        printNo: '3',
        title: '体液性免疫の司令塔',
        slots: [
            {
                answer: 'ヘルパーT細胞',
                distractors: ['キラーT細胞', '記憶細胞', 'マクロファージ'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="体液性免疫フロー図">
                    ${svgBox(25, 95, 125, 64, '樹状細胞', false, '#E0E7FF', '#4F46E5', '#3730A3', '抗原提示')}
                    ${svgArrow(158, 127, 192, 127)}
                    ${svgBox(200, 95, 155, 64, 'ヘルパーT細胞', true)}
                    ${svgArrow(363, 127, 397, 127)}
                    ${svgBox(405, 95, 130, 64, 'B細胞活性化', false, '#DBEAFE', '#2563EB', '#1E40AF', '抗体産生へ')}
                </svg>`
            },
            {
                answer: '形質細胞',
                distractors: ['キラーT細胞', '記憶細胞', '好中球'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="抗体産生細胞の図">
                    ${svgBox(25, 95, 125, 64, 'ヘルパーT細胞', false, '#E0E7FF', '#4F46E5', '#3730A3', 'B細胞を刺激')}
                    ${svgArrow(158, 127, 192, 127)}
                    ${svgBox(200, 95, 155, 64, '形質細胞', true, '#DBEAFE', '#2563EB', '#1E40AF', 'B細胞が分化')}
                    ${svgArrow(363, 127, 397, 127)}
                    ${svgBox(405, 95, 130, 64, '抗体産生', false, '#DCFCE7', '#16A34A', '#166534', '体液性免疫')}
                </svg>`
            }
        ]
    },
    {
        id: 'dg-6',
        printNo: '4',
        title: '光合成速度と光の強さ',
        slots: [
            {
                answer: '光補償点',
                distractors: ['光飽和点', '森林限界', '呼吸速度'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="光合成速度グラフ">
                    <line x1="80" y1="30" x2="80" y2="220" stroke="#334155" stroke-width="2.5"/>
                    <line x1="60" y1="160" x2="500" y2="160" stroke="#334155" stroke-width="2.5"/>
                    <path d="M80 200 Q170 90 300 65 L480 65" fill="none" stroke="#0D9488" stroke-width="4"/>
                    <circle cx="132" cy="160" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
                    ${svgBox(145, 170, 120, 42, '光補償点', true)}
                    <text x="490" y="180" text-anchor="end" font-size="13" font-weight="700" fill="#475569">光の強さ →</text>
                    <text x="92" y="44" font-size="13" font-weight="700" fill="#475569">見かけの光合成速度 0 の点</text>
                </svg>`
            },
            {
                answer: '光飽和点',
                distractors: ['光補償点', '森林限界', '呼吸速度'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="光飽和点グラフ">
                    <line x1="80" y1="30" x2="80" y2="220" stroke="#334155" stroke-width="2.5"/>
                    <line x1="60" y1="160" x2="500" y2="160" stroke="#334155" stroke-width="2.5"/>
                    <path d="M80 200 Q170 90 300 65 L480 65" fill="none" stroke="#0D9488" stroke-width="4"/>
                    <circle cx="300" cy="65" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
                    ${svgBox(250, 82, 120, 42, '光飽和点', true)}
                    <text x="490" y="180" text-anchor="end" font-size="13" font-weight="700" fill="#475569">光の強さ →</text>
                    <text x="92" y="44" font-size="13" font-weight="700" fill="#475569">光合成速度が最大に達する点</text>
                </svg>`
            }
        ]
    },
    {
        id: 'dg-7',
        printNo: '4',
        title: '乾性遷移の順序',
        slots: [
            {
                answer: '陽樹林',
                distractors: ['陰樹林', '低木林', '草原'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="植生の遷移フロー図">
                    ${svgBox(20, 98, 95, 58, '草原・低木', false, '#F1F5F9', '#64748B', '#334155')}
                    ${svgArrow(122, 127, 148, 127)}
                    ${svgBox(155, 95, 120, 64, '陽樹林', true)}
                    ${svgArrow(283, 127, 309, 127)}
                    ${svgBox(316, 98, 100, 58, '混交林', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(423, 127, 449, 127)}
                    ${svgBox(456, 98, 85, 58, '陰樹林', false, '#BBF7D0', '#15803D', '#14532D')}
                </svg>`
            },
            {
                answer: '陰樹林',
                distractors: ['陽樹林', '混交林', '草原'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="植生の遷移フロー図">
                    ${svgBox(20, 98, 95, 58, '草原・低木', false, '#F1F5F9', '#64748B', '#334155')}
                    ${svgArrow(122, 127, 148, 127)}
                    ${svgBox(155, 98, 100, 58, '陽樹林', false, '#FEF3C7', '#D97706', '#92400E')}
                    ${svgArrow(262, 127, 288, 127)}
                    ${svgBox(295, 98, 100, 58, '混交林', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(402, 127, 428, 127)}
                    ${svgBox(435, 95, 105, 64, '陰樹林', true, '#BBF7D0', '#15803D', '#14532D', '極相')}
                </svg>`
            }
        ]
    },
    {
        id: 'dg-8',
        printNo: '4',
        title: '生態系の物質循環',
        slots: [
            {
                answer: '分解者',
                distractors: ['生産者', '一次消費者', '二次消費者'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="生態系の物質循環図">
                    ${svgBox(30, 95, 120, 62, '生産者', false, '#DCFCE7', '#16A34A', '#166534')}
                    ${svgArrow(158, 126, 192, 126)}
                    ${svgBox(200, 95, 120, 62, '消費者', false, '#FEF9C3', '#CA8A04', '#854D0E')}
                    ${svgArrow(328, 126, 362, 126)}
                    ${svgBox(370, 95, 150, 62, '分解者', true)}
                    <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">遺体・排出物を無機物に分解するのは？</text>
                </svg>`
            },
            {
                answer: '生産者',
                distractors: ['分解者', '一次消費者', '二次消費者'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="生態系の物質循環図">
                    ${svgBox(30, 95, 130, 62, '生産者', true)}
                    ${svgArrow(168, 126, 202, 126)}
                    ${svgBox(210, 95, 120, 62, '消費者', false, '#FEF9C3', '#CA8A04', '#854D0E')}
                    ${svgArrow(338, 126, 372, 126)}
                    ${svgBox(380, 95, 140, 62, '分解者', false, '#E0E7FF', '#4F46E5', '#3730A3')}
                    <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">光合成で有機物を合成するのは？</text>
                </svg>`
            }
        ]
    },
    {
        id: 'dg-9',
        printNo: '1',
        title: 'DNAの相補的塩基対',
        slots: [
            {
                answer: 'チミン(T)',
                distractors: ['ウラシル(U)', 'グアニン(G)', 'シトシン(C)'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="DNA塩基対の図">
                    ${svgBox(85, 75, 145, 62, 'アデニン (A)', false, '#DBEAFE', '#2563EB', '#1E40AF')}
                    <line x1="236" y1="106" x2="314" y2="106" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
                    ${svgBox(320, 75, 155, 62, 'チミン(T)', true)}
                    ${svgBox(85, 160, 145, 62, 'グアニン (G)', false, '#FCE7F3', '#DB2777', '#9D174D')}
                    <line x1="236" y1="191" x2="314" y2="191" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
                    ${svgBox(320, 160, 155, 62, 'シトシン (C)', false, '#FCE7F3', '#DB2777', '#9D174D')}
                    <text x="280" y="42" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNAでアデニン(A)と対になる塩基は？</text>
                </svg>`
            },
            {
                answer: 'シトシン(C)',
                distractors: ['チミン(T)', 'ウラシル(U)', 'アデニン(A)'],
                renderSvg: () => `<svg viewBox="0 0 560 260" role="img" aria-label="DNA塩基対の図">
                    ${svgBox(85, 75, 145, 62, 'アデニン (A)', false, '#DBEAFE', '#2563EB', '#1E40AF')}
                    <line x1="236" y1="106" x2="314" y2="106" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
                    ${svgBox(320, 75, 155, 62, 'チミン (T)', false, '#DBEAFE', '#2563EB', '#1E40AF')}
                    ${svgBox(85, 160, 145, 62, 'グアニン (G)', false, '#FCE7F3', '#DB2777', '#9D174D')}
                    <line x1="236" y1="191" x2="314" y2="191" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
                    ${svgBox(320, 160, 155, 62, 'シトシン(C)', true)}
                    <text x="280" y="42" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNAでグアニン(G)と対になる塩基は？</text>
                </svg>`
            }
        ]
    },
    {
        id: 'dg-10',
        printNo: '2',
        title: '腎臓での水の再吸収',
        slots: [
            {
                answer: 'バソプレシン',
                distractors: ['インスリン', 'グルカゴン', '鉱質コルチコイド'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="体液浸透圧調節の図">
                    ${svgBox(175, 16, 210, 58, '脳下垂体後葉（浸透圧上昇）', false, '#E0E7FF', '#4F46E5', '#3730A3')}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, 'バソプレシン', true)}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, '腎臓：水の再吸収促進', false, '#CCFBF1', '#0D9488', '#115E59')}
                </svg>`
            },
            {
                answer: '脳下垂体後葉',
                distractors: ['脳下垂体前葉', '副腎皮質', '副腎髄質'],
                renderSvg: () => `<svg viewBox="0 0 560 276" role="img" aria-label="バソプレシン分泌器官の図">
                    ${svgBox(175, 16, 210, 58, '脳下垂体後葉', true)}
                    ${svgArrow(280, 78, 280, 104)}
                    ${svgBox(175, 108, 210, 58, 'バソプレシン', false, '#E0E7FF', '#4F46E5', '#3730A3')}
                    ${svgArrow(280, 170, 280, 196)}
                    ${svgBox(175, 200, 210, 58, '腎臓：水の再吸収促進', false, '#CCFBF1', '#0D9488', '#115E59')}
                </svg>`
            }
        ]
    }
];

export const ERROR_FIX_ITEMS                          = [
    { id: 'ef-1', printNo: '1', before: '光学顕微鏡の限界は ', correctTerm: '0.1μm', after: ' である。', distractors: ['0.1mm', '0.1nm', '0.01μm', '1μm'] },
    { id: 'ef-2', printNo: '1', before: '酵母菌やカビは ', correctTerm: '真核生物', after: ' に分類される。', distractors: ['原核生物', '細菌類', 'ラン藻類'] },
    { id: 'ef-3', printNo: '1', before: 'DNA量が2倍に増える時期は ', correctTerm: 'S期', after: ' である。', distractors: ['G1期', 'G2期', 'M期'] },
    { id: 'ef-4', printNo: '2', before: '血糖値を下げる唯一のホルモンは ', correctTerm: 'インスリン', after: ' である。', distractors: ['グルカゴン', 'アドレナリン', '糖質コルチコイド', 'バソプレシン'] },
    { id: 'ef-5', printNo: '2', before: 'すい臓のA細胞から分泌されるのは ', correctTerm: 'グルカゴン', after: ' である。', distractors: ['インスリン', 'バソプレシン', 'アドレナリン', '糖質コルチコイド'] },
    { id: 'ef-6', printNo: '2', before: '腎臓での水の再吸収を促進するのは ', correctTerm: 'バソプレシン', after: ' である。', distractors: ['鉱質コルチコイド', '糖質コルチコイド', 'インスリン', 'グルカゴン'] },
    { id: 'ef-7', printNo: '3', before: '涙に含まれ細菌の細胞壁を壊す酵素は ', correctTerm: 'リゾチーム', after: ' である。', distractors: ['ディフェンシン', 'リソソーム', 'ペプシン', 'アミラーゼ'] },
    { id: 'ef-8', printNo: '3', before: 'HIVが破壊する免疫の司令塔は ', correctTerm: 'ヘルパーT細胞', after: ' である。', distractors: ['キラーT細胞', 'B細胞', '記憶細胞', '形質細胞'] },
    { id: 'ef-9', printNo: '3', before: '動物に作らせた抗体を直接注射するのは ', correctTerm: '血清療法', after: ' である。', distractors: ['予防接種', '二次応答', '拒絶反応', 'アレルギー'] },
    { id: 'ef-10', printNo: '4', before: '見かけの光合成速度が0になるのは ', correctTerm: '光補償点', after: ' である。', distractors: ['光飽和点', '森林限界', '呼吸速度'] },
    { id: 'ef-11', printNo: '4', before: '山火事の跡地から始まる遷移は ', correctTerm: '二次遷移', after: ' である。', distractors: ['一次遷移', '湿性遷移', '乾性遷移', '極相'] },
    { id: 'ef-12', printNo: '4', before: '湖沼で水面が緑色になる現象は ', correctTerm: 'アオコ', after: ' である。', distractors: ['赤潮', '青潮', '富栄養化'] }
];

export const CATEGORY_CONFIG                                                                                        = {
    sheet: {
        label: '🔴 デジタル赤シート ＆ 穴埋め',
        description: 'プリントの重要文を赤シートで隠して確認！ふつうでは空欄にカードを当てはめよう。',
        trayTitle: '📝 用語カード'
    },
    pair: {
        label: '⚖️ 対（ペア）で覚える！',
        description: 'テストで逆にして失点しやすい「対の用語」をセットで判別しよう！',
        trayTitle: '⚖️ ペア選択'
    }
};

export const DIFFICULTY_LABELS                                       = {
    easy: '🔰 かんたん',
    normal: '🧪 ふつう',
    oni: '👹 おに (60秒TA)'
};

export function getOniRankInfo(score        )           {
    if (score >= 17) return { rank: 'S', icon: '👑', title: '生物基礎マスター', className: 'rank-s' };
    if (score >= 13) return { rank: 'A', icon: '🔬', title: '熟練研究者', className: 'rank-a' };
    if (score >= 8) return { rank: 'B', icon: '🧪', title: '一人前ラボ員', className: 'rank-b' };
    return { rank: 'C', icon: '🌱', title: '見習い観察者', className: 'rank-c' };
}

                            
                           
                          
 

export const DECOY_CARDS_BY_SCOPE                                                     = {
    '1': [
        { label: '0.01mm', hint: '肉眼では見分けられない小ささ' },
        { label: 'リソソーム', hint: '細胞内の不要物を分解する小器官' },
        { label: 'G1期', hint: 'DNA複製の準備をする時期' },
        { label: 'M期', hint: '細胞分裂を行う時期' }
    ],
    '2': [
        { label: 'グリコーゲン', hint: '肝臓などに蓄えられる多糖類' },
        { label: 'アドレナリン', hint: '副腎髄質から分泌され血糖値を上げる' },
        { label: '鉱質コルチコイド', hint: '腎臓でNa⁺の再吸収を促進' },
        { label: 'チロキシン', hint: '甲状腺から分泌され代謝を促進' }
    ],
    '3': [
        { label: 'リソソーム', hint: '細胞内の不要物を分解する小器官' },
        { label: 'B細胞', hint: '形質細胞に分化し抗体を産生する' },
        { label: '好中球', hint: '食作用をもつ白血球の一種' },
        { label: 'マクロファージ', hint: '食作用と抗原提示を行う細胞' }
    ],
    '4': [
        { label: '光飽和点', hint: 'それ以上光を強くしても光合成速度が増えない点' },
        { label: '青潮', hint: '貧酸素水塊で海面が乳青色になる現象' },
        { label: '酸性雨', hint: '硫黄酸化物などが溶けて酸性になった雨' },
        { label: '極相', hint: '遷移が進んで安定した状態の植生' }
    ]
};

export const TRICKY_DECOYS                                              = {
    '0.1mm': ['0.01mm', '0.1μm', '1mm', '0.1nm'],
    '0.1μm': ['0.1mm', '0.1nm', '0.01μm', '1μm'],
    '0.1nm': ['0.1μm', '0.01nm', '0.1mm', '1nm'],
    '細菌類': ['菌類', '真核生物', 'ウイルス', '原生生物'],
    '基質特異性': ['最適温度', '最適pH', 'アロステリック効果', '競争的阻害'],
    'S期': ['G1期', 'G2期', 'M期', '間期'],
    '神経伝達物質': ['ホルモン', '活動電位', '受容体', 'シナプス'],
    'グルカゴン': ['グリコーゲン', 'アドレナリン', 'インスリン', '糖質コルチコイド'],
    'インスリン': ['グルカゴン', 'アドレナリン', 'バソプレシン', '糖質コルチコイド'],
    '糖質コルチコイド': ['鉱質コルチコイド', 'アドレナリン', 'グルカゴン', 'バソプレシン'],
    'バソプレシン': ['鉱質コルチコイド', '糖質コルチコイド', 'インスリン', 'チロキシン'],
    'リゾチーム': ['リソソーム', 'ディフェンシン', 'ペプシン', 'アミラーゼ'],
    'ディフェンシン': ['リゾチーム', 'リソソーム', 'インターフェロン', 'フィブリン'],
    'ヘルパーT細胞': ['キラーT細胞', 'B細胞', '記憶細胞', '形質細胞'],
    '記憶細胞': ['形質細胞', 'ヘルパーT細胞', 'キラーT細胞', '樹状細胞'],
    '光補償点': ['光飽和点', '森林限界', '呼吸速度', '陰葉'],
    '森林限界': ['光補償点', '光飽和点', '雪線', '垂直分布'],
    'アオコ': ['赤潮', '青潮', '富栄養化', 'BOD'],
    '紫外線': ['赤外線', '可視光線', 'オゾン', '二酸化炭素'],
    '同化': ['異化', '呼吸', '解糖系', '発酵'],
    '異化': ['同化', '光合成', '炭酸同化', '窒素同化'],
    'ミトコンドリア': ['葉緑体', 'リソソーム', 'リボソーム', 'ゴルジ体'],
    '葉緑体': ['ミトコンドリア', '液胞', '細胞壁', '中心体'],
    'DNA': ['RNA', 'ATP', 'mRNA', 'tRNA'],
    'RNA': ['DNA', 'ATP', 'ADP', 'ヌクレオチド'],
    '交感神経': ['副交感神経', '運動神経', '感覚神経', '体性神経'],
    '副交感神経': ['交感神経', '運動神経', '中枢神経', '脳神経'],
    '内分泌腺': ['外分泌腺', '汗腺', '消化腺', '涙腺'],
    '外分泌腺': ['内分泌腺', '脳下垂体', '甲状腺', '副腎'],
    '体液性免疫': ['細胞性免疫', '自然免疫', '免疫寛容', 'アレルギー'],
    '細胞性免疫': ['体液性免疫', '自然免疫', '食作用', '二次応答'],
    '自然免疫': ['獲得免疫', '体液性免疫', '細胞性免疫', '適応免疫'],
    '獲得免疫': ['自然免疫', '物理的防御', '化学的防御', '食作用'],
    '一次遷移': ['二次遷移', '極相', '陽樹林', '陰樹林'],
    '二次遷移': ['一次遷移', '湿性遷移', '乾性遷移', '極相'],
    '作用': ['環境形成作用', '反作用', '競争', '共生'],
    '環境形成作用': ['作用', '光合成', '遷移', '物質循環'],
    '赤潮': ['アオコ', '青潮', '富栄養化', '生物濃縮']
};


//# sourceURL=data.ts