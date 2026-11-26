                                                                                                  

export const PRINT_LABELS                                       = {
    all: '📚 全範囲ミックス',
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
    { id: 'p1', printNo: '1', pairTitle: '原核 vs 真核', termA: '細菌類（〜菌）', descA: '核をもたない原核生物（大腸菌・乳酸菌など）', termB: '菌類（酵母菌・カビ）', descB: '核をもつ真核生物' },
    { id: 'p2', printNo: '2', pairTitle: '血糖調節ホルモン', termA: 'グルカゴン（A細胞）', descA: 'グリコーゲンを分解し血糖値を上げる', termB: 'インスリン（B細胞）', descB: 'グルコースをグリコーゲンに変え血糖値を下げる' },
    { id: 'p3', printNo: '2', pairTitle: '自律神経', termA: '交感神経', descA: '闘争と逃走（心拍数増加・瞳孔拡大）', termB: '副交感神経', descB: 'リラックス（消化管の働き促進・心拍数減少）' },
    { id: 'p4', printNo: '3', pairTitle: '化学的防御', termA: 'リゾチーム', descA: '涙やだ液に含まれ細菌の細胞壁を分解', termB: 'ディフェンシン', descB: '皮膚や粘膜に含まれ細菌の細胞膜を破壊' },
    { id: 'p5', printNo: '3', pairTitle: '医療への応用', termA: '予防接種（ワクチン）', descA: '無毒化・弱毒化した病原体で記憶細胞をつくる', termB: '血清療法', descB: '動物に作らせた抗体を直接注射する' },
    { id: 'p6', printNo: '4', pairTitle: '植生の遷移', termA: '一次遷移', descA: '土壌のない裸地（溶岩流の跡など）から始まる', termB: '二次遷移', descB: '土壌や種子が残る跡地（山火事・伐採後）から始まる' },
    { id: 'p7', printNo: '4', pairTitle: '環境と生物の相互作用', termA: '作用', descA: '非生物的環境（光・水・温度）が生物に与える影響', termB: '環境形成作用', descB: '生物が非生物的環境（土壌・光など）を変化させる働き' },
    { id: 'p8', printNo: '4', pairTitle: '富栄養化', termA: 'アオコ', descA: '湖沼でプランクトンが大発生し水面が緑色になる', termB: '赤潮', descB: '内湾・内海でプランクトンが大発生し海面が赤褐色になる' },
    { id: 'p9', printNo: '4', pairTitle: '地球環境問題', termA: '地球温暖化', descA: '温室効果ガスが地表からの赤外線（熱）を吸収する', termB: 'オゾン層の破壊', descB: 'フロンによる破壊で有害な紫外線が地表に届く' },
    { id: 'p10', printNo: '4', pairTitle: '生態ピラミッドの逆転', termA: '個体数ピラミッドの逆転', descA: '1本の大きな樹木に大量の毛虫がつく例', termB: '生物量ピラミッドの逆転', descB: '海の植物プランクトンが増殖・被食され現存量が少ない例' }
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
    if (score >= 20) return { rank: 'S', icon: '👑', title: '生物基礎マスター', className: 'rank-s' };
    if (score >= 14) return { rank: 'A', icon: '🔬', title: '熟練研究者', className: 'rank-a' };
    if (score >= 8) return { rank: 'B', icon: '🧪', title: '一人前ラボ員', className: 'rank-b' };
    return { rank: 'C', icon: '🌱', title: '見習い観察者', className: 'rank-c' };
}


//# sourceURL=data.ts