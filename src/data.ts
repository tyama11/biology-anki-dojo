import type { Category, DiagramQuestionItem, Difficulty, ErrorFixItem, OddOneOutItem, PairItem, PrintScope, RankInfo, SheetItem, TrueFalseItem } from './types.ts';

export const PRINT_SCOPES: readonly PrintScope[] = ['1', '2', '3', '4'];

export const PRINT_LABELS: Readonly<Record<PrintScope, string>> = {
    '1': '🧬 No.1 細胞・酵素・DNA',
    '2': '🧠 No.2 神経とホルモン',
    '3': '🛡️ No.3 免疫',
    '4': '🌿 No.4 植生と生態系'
};

export const SHEET_ITEMS: readonly SheetItem[] = [
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

export const PAIR_ITEMS: readonly PairItem[] = [
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

export const TRUE_FALSE_ITEMS: readonly TrueFalseItem[] = [
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

export const ODD_ONE_OUT_ITEMS: readonly OddOneOutItem[] = [
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

export const DIAGRAM_ITEMS: readonly DiagramQuestionItem[] = [
    {
        id: 'dg-1',
        printNo: '1',
        title: '細胞周期のサイクル',
        answer: 'S期',
        distractors: ['G1期', 'G2期', 'M期'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="細胞周期の図">
            <rect x="20" y="95" width="105" height="62" rx="14" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
            <text x="72" y="132" text-anchor="middle" font-size="18" font-weight="800" fill="#0369A1">G1期</text>
            <path d="M132 126 L154 126" stroke="#64748B" stroke-width="3" marker-end="url(#arr)"/>
            <rect x="160" y="95" width="105" height="62" rx="14" class="oni-svg-blank"/>
            <text x="212" y="122" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <text x="212" y="145" text-anchor="middle" font-size="12" font-weight="700" fill="#92400E">DNA複製</text>
            <path d="M272 126 L294 126" stroke="#64748B" stroke-width="3"/>
            <rect x="300" y="95" width="105" height="62" rx="14" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
            <text x="352" y="132" text-anchor="middle" font-size="18" font-weight="800" fill="#0369A1">G2期</text>
            <path d="M412 126 L434 126" stroke="#64748B" stroke-width="3"/>
            <rect x="440" y="95" width="100" height="62" rx="14" fill="#FCE7F3" stroke="#DB2777" stroke-width="2.5"/>
            <text x="490" y="132" text-anchor="middle" font-size="18" font-weight="800" fill="#9D174D">M期</text>
            <text x="280" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNA量が2倍に増える時期は？</text>
        </svg>`
    },
    {
        id: 'dg-2',
        printNo: '1',
        title: '酵素と基質の結合',
        answer: '活性部位',
        distractors: ['基質', '生成物', '補酵素'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="酵素の活性部位の図">
            <path d="M70 80 L230 80 L230 115 L185 115 L185 155 L230 155 L230 190 L70 190 Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="3"/>
            <text x="125" y="140" text-anchor="middle" font-size="18" font-weight="800" fill="#115E59">酵素</text>
            <rect x="195" y="112" width="80" height="44" rx="10" class="oni-svg-blank"/>
            <text x="235" y="141" text-anchor="middle" font-size="20" font-weight="900" fill="#B45309">？</text>
            <rect x="335" y="112" width="140" height="44" rx="12" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/>
            <text x="405" y="140" text-anchor="middle" font-size="17" font-weight="800" fill="#3730A3">基質（鍵）</text>
            <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">基質が結合する酵素のくぼみの名称は？</text>
        </svg>`
    },
    {
        id: 'dg-3',
        printNo: '2',
        title: '血糖値を下げる経路',
        answer: 'インスリン',
        distractors: ['グルカゴン', 'アドレナリン', '糖質コルチコイド'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="血糖値低下の経路図">
            <rect x="30" y="95" width="130" height="64" rx="14" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
            <text x="95" y="124" text-anchor="middle" font-size="15" font-weight="800" fill="#991B1B">高血糖</text>
            <text x="95" y="146" text-anchor="middle" font-size="13" font-weight="700" fill="#B91C1C">B細胞が感知</text>
            <path d="M168 127 L202 127" stroke="#64748B" stroke-width="3"/>
            <rect x="210" y="95" width="140" height="64" rx="14" class="oni-svg-blank"/>
            <text x="280" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M358 127 L392 127" stroke="#64748B" stroke-width="3"/>
            <rect x="400" y="95" width="130" height="64" rx="14" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5"/>
            <text x="465" y="124" text-anchor="middle" font-size="15" font-weight="800" fill="#166534">血糖値低下</text>
            <text x="465" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#15803D">グリコーゲン合成</text>
        </svg>`
    },
    {
        id: 'dg-4',
        printNo: '2',
        title: '副腎皮質からの血糖上昇',
        answer: '糖質コルチコイド',
        distractors: ['鉱質コルチコイド', 'バソプレシン', 'アドレナリン'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="副腎皮質ホルモンの経路図">
            <rect x="25" y="95" width="135" height="64" rx="14" fill="#FFEDD5" stroke="#EA580C" stroke-width="2.5"/>
            <text x="92" y="124" text-anchor="middle" font-size="15" font-weight="800" fill="#9A3412">副腎皮質</text>
            <text x="92" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#C2410C">低血糖時に分泌</text>
            <path d="M168 127 L198 127" stroke="#64748B" stroke-width="3"/>
            <rect x="205" y="95" width="155" height="64" rx="14" class="oni-svg-blank"/>
            <text x="282" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M368 127 L398 127" stroke="#64748B" stroke-width="3"/>
            <rect x="405" y="95" width="130" height="64" rx="14" fill="#FEF9C3" stroke="#CA8A04" stroke-width="2.5"/>
            <text x="470" y="124" text-anchor="middle" font-size="15" font-weight="800" fill="#854D0E">糖新生</text>
            <text x="470" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#A16207">血糖値上昇</text>
        </svg>`
    },
    {
        id: 'dg-5',
        printNo: '3',
        title: '体液性免疫の司令塔',
        answer: 'ヘルパーT細胞',
        distractors: ['キラーT細胞', '記憶細胞', 'マクロファージ'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="体液性免疫フロー図">
            <rect x="25" y="95" width="125" height="64" rx="14" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/>
            <text x="87" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#3730A3">樹状細胞</text>
            <text x="87" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#4338CA">抗原提示</text>
            <path d="M158 127 L192 127" stroke="#64748B" stroke-width="3"/>
            <rect x="200" y="95" width="155" height="64" rx="14" class="oni-svg-blank"/>
            <text x="277" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M363 127 L397 127" stroke="#64748B" stroke-width="3"/>
            <rect x="405" y="95" width="130" height="64" rx="14" fill="#DBEAFE" stroke="#2563EB" stroke-width="2.5"/>
            <text x="470" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#1E40AF">B細胞活性化</text>
            <text x="470" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#1D4ED8">抗体産生へ</text>
        </svg>`
    },
    {
        id: 'dg-6',
        printNo: '4',
        title: '光合成速度と光の強さ',
        answer: '光補償点',
        distractors: ['光飽和点', '森林限界', '呼吸速度'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="光合成速度グラフ">
            <line x1="80" y1="30" x2="80" y2="220" stroke="#334155" stroke-width="2.5"/>
            <line x1="60" y1="160" x2="500" y2="160" stroke="#334155" stroke-width="2.5"/>
            <path d="M80 200 Q170 90 300 65 L480 65" fill="none" stroke="#0D9488" stroke-width="4"/>
            <circle cx="132" cy="160" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
            <rect x="145" y="170" width="120" height="42" rx="10" class="oni-svg-blank"/>
            <text x="205" y="198" text-anchor="middle" font-size="18" font-weight="900" fill="#B45309">？</text>
            <text x="490" y="180" text-anchor="end" font-size="13" font-weight="700" fill="#475569">光の強さ →</text>
            <text x="92" y="44" font-size="13" font-weight="700" fill="#475569">見かけの光合成速度 0 の点</text>
        </svg>`
    },
    {
        id: 'dg-7',
        printNo: '4',
        title: '乾性遷移の順序',
        answer: '陽樹林',
        distractors: ['陰樹林', '低木林', '草原'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="植生の遷移フロー図">
            <rect x="20" y="98" width="95" height="58" rx="12" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
            <text x="67" y="133" text-anchor="middle" font-size="15" font-weight="800" fill="#334155">草原・低木</text>
            <path d="M122 127 L148 127" stroke="#64748B" stroke-width="3"/>
            <rect x="155" y="95" width="120" height="64" rx="14" class="oni-svg-blank"/>
            <text x="215" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M283 127 L309 127" stroke="#64748B" stroke-width="3"/>
            <rect x="316" y="98" width="100" height="58" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
            <text x="366" y="133" text-anchor="middle" font-size="15" font-weight="800" fill="#166534">混交林</text>
            <path d="M423 127 L449 127" stroke="#64748B" stroke-width="3"/>
            <rect x="456" y="98" width="85" height="58" rx="12" fill="#BBF7D0" stroke="#15803D" stroke-width="2"/>
            <text x="498" y="133" text-anchor="middle" font-size="15" font-weight="800" fill="#14532D">陰樹林</text>
        </svg>`
    },
    {
        id: 'dg-8',
        printNo: '4',
        title: '生態系の物質循環',
        answer: '分解者',
        distractors: ['生産者', '一次消費者', '二次消費者'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="生態系の物質循環図">
            <rect x="30" y="95" width="120" height="62" rx="14" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5"/>
            <text x="90" y="132" text-anchor="middle" font-size="16" font-weight="800" fill="#166534">生産者</text>
            <path d="M158 126 L192 126" stroke="#64748B" stroke-width="3"/>
            <rect x="200" y="95" width="120" height="62" rx="14" fill="#FEF9C3" stroke="#CA8A04" stroke-width="2.5"/>
            <text x="260" y="132" text-anchor="middle" font-size="16" font-weight="800" fill="#854D0E">消費者</text>
            <path d="M328 126 L362 126" stroke="#64748B" stroke-width="3"/>
            <rect x="370" y="95" width="150" height="62" rx="14" class="oni-svg-blank"/>
            <text x="445" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <text x="280" y="45" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">遺体・排出物を無機物に分解するのは？</text>
        </svg>`
    },
    {
        id: 'dg-9',
        printNo: '1',
        title: '植物細胞と動物細胞の違い',
        answer: '細胞壁',
        distractors: ['細胞膜', '核', 'ミトコンドリア'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="植物細胞の構造図">
            <rect x="130" y="55" width="300" height="175" rx="22" class="oni-svg-blank"/>
            <rect x="148" y="73" width="264" height="139" rx="16" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5"/>
            <circle cx="235" cy="142" r="34" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
            <text x="235" y="148" text-anchor="middle" font-size="15" font-weight="800" fill="#92400E">核</text>
            <ellipse cx="335" cy="142" rx="45" ry="28" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5"/>
            <text x="335" y="148" text-anchor="middle" font-size="14" font-weight="800" fill="#0369A1">液胞</text>
            <text x="280" y="34" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">植物細胞の外側を囲む丈夫な構造（？）は？</text>
            <text x="455" y="95" font-size="18" font-weight="900" fill="#B45309">← ？</text>
        </svg>`
    },
    {
        id: 'dg-10',
        printNo: '1',
        title: 'DNAの相補的塩基対',
        answer: 'チミン(T)',
        distractors: ['ウラシル(U)', 'グアニン(G)', 'シトシン(C)'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="DNA塩基対の図">
            <rect x="85" y="75" width="145" height="62" rx="14" fill="#DBEAFE" stroke="#2563EB" stroke-width="2.5"/>
            <text x="157" y="112" text-anchor="middle" font-size="18" font-weight="800" fill="#1E40AF">アデニン (A)</text>
            <line x1="236" y1="106" x2="314" y2="106" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
            <rect x="320" y="75" width="155" height="62" rx="14" class="oni-svg-blank"/>
            <text x="397" y="113" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <rect x="85" y="160" width="145" height="62" rx="14" fill="#FCE7F3" stroke="#DB2777" stroke-width="2.5"/>
            <text x="157" y="197" text-anchor="middle" font-size="18" font-weight="800" fill="#9D174D">グアニン (G)</text>
            <line x1="236" y1="191" x2="314" y2="191" stroke="#64748B" stroke-width="4" stroke-dasharray="6 4"/>
            <rect x="320" y="160" width="155" height="62" rx="14" fill="#FCE7F3" stroke="#DB2777" stroke-width="2.5"/>
            <text x="397" y="197" text-anchor="middle" font-size="18" font-weight="800" fill="#9D174D">シトシン (C)</text>
            <text x="280" y="42" text-anchor="middle" font-size="15" font-weight="800" fill="#475569">DNAでアデニン(A)と対になる塩基は？</text>
        </svg>`
    },
    {
        id: 'dg-11',
        printNo: '1',
        title: '酵素反応と温度のグラフ',
        answer: '最適温度',
        distractors: ['失活温度', '光補償点', '光飽和点'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="酵素と温度のグラフ">
            <line x1="80" y1="35" x2="80" y2="215" stroke="#334155" stroke-width="2.5"/>
            <line x1="70" y1="215" x2="490" y2="215" stroke="#334155" stroke-width="2.5"/>
            <path d="M90 210 Q230 35 280 75 Q330 115 365 212" fill="none" stroke="#0D9488" stroke-width="4"/>
            <line x1="255" y1="68" x2="255" y2="215" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="5 4"/>
            <circle cx="255" cy="68" r="8" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
            <rect x="195" y="162" width="120" height="42" rx="10" class="oni-svg-blank"/>
            <text x="255" y="190" text-anchor="middle" font-size="18" font-weight="900" fill="#B45309">？</text>
            <text x="485" y="236" text-anchor="end" font-size="13" font-weight="700" fill="#475569">温度 (℃) →</text>
            <text x="92" y="46" font-size="13" font-weight="700" fill="#475569">反応速度が最大になる温度</text>
        </svg>`
    },
    {
        id: 'dg-12',
        printNo: '2',
        title: '腎臓での水の再吸収',
        answer: 'バソプレシン',
        distractors: ['インスリン', 'グルカゴン', '鉱質コルチコイド'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="体液浸透圧調節の図">
            <rect x="25" y="95" width="135" height="64" rx="14" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/>
            <text x="92" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#3730A3">脳下垂体後葉</text>
            <text x="92" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#4338CA">浸透圧上昇を感知</text>
            <path d="M168 127 L198 127" stroke="#64748B" stroke-width="3"/>
            <rect x="205" y="95" width="150" height="64" rx="14" class="oni-svg-blank"/>
            <text x="280" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M363 127 L393 127" stroke="#64748B" stroke-width="3"/>
            <rect x="400" y="95" width="135" height="64" rx="14" fill="#CCFBF1" stroke="#0D9488" stroke-width="2.5"/>
            <text x="467" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#115E59">腎臓（集合管）</text>
            <text x="467" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#0F766E">水の再吸収促進</text>
        </svg>`
    },
    {
        id: 'dg-13',
        printNo: '2',
        title: '自律神経と心臓の働き',
        answer: '交感神経',
        distractors: ['副交感神経', '運動神経', '感覚神経'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="自律神経の図">
            <rect x="30" y="95" width="135" height="64" rx="14" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
            <text x="97" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#991B1B">緊張・運動時</text>
            <text x="97" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#B91C1C">闘争と逃走</text>
            <path d="M173 127 L203 127" stroke="#64748B" stroke-width="3"/>
            <rect x="210" y="95" width="140" height="64" rx="14" class="oni-svg-blank"/>
            <text x="280" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M358 127 L388 127" stroke="#64748B" stroke-width="3"/>
            <rect x="395" y="95" width="135" height="64" rx="14" fill="#FFEDD5" stroke="#EA580C" stroke-width="2.5"/>
            <text x="462" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#9A3412">心拍数増加</text>
            <text x="462" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#C2410C">瞳孔拡大</text>
        </svg>`
    },
    {
        id: 'dg-14',
        printNo: '3',
        title: '二次応答の抗体産生グラフ',
        answer: '記憶細胞',
        distractors: ['形質細胞', 'キラーT細胞', '好中球'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="二次応答のグラフ">
            <line x1="75" y1="35" x2="75" y2="215" stroke="#334155" stroke-width="2.5"/>
            <line x1="65" y1="215" x2="495" y2="215" stroke="#334155" stroke-width="2.5"/>
            <path d="M85 212 Q140 165 185 205 Q275 212 315 62 Q355 55 445 145" fill="none" stroke="#4F46E5" stroke-width="4"/>
            <text x="145" y="160" text-anchor="middle" font-size="13" font-weight="800" fill="#4338CA">一次応答</text>
            <text x="330" y="48" text-anchor="middle" font-size="14" font-weight="800" fill="#312E81">二次応答（速く大量）</text>
            <rect x="260" y="128" width="145" height="44" rx="12" class="oni-svg-blank"/>
            <text x="332" y="157" text-anchor="middle" font-size="18" font-weight="900" fill="#B45309">？</text>
            <text x="332" y="188" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">2回目を速く強くする細胞</text>
        </svg>`
    },
    {
        id: 'dg-15',
        printNo: '3',
        title: '細胞性免疫の主役',
        answer: 'キラーT細胞',
        distractors: ['B細胞', '形質細胞', 'ヘルパーT細胞'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="細胞性免疫の図">
            <rect x="25" y="95" width="135" height="64" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
            <text x="92" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#92400E">ウイルス感染細胞</text>
            <text x="92" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#B45309">細胞ごと排除</text>
            <path d="M168 127 L198 127" stroke="#64748B" stroke-width="3"/>
            <rect x="205" y="95" width="150" height="64" rx="14" class="oni-svg-blank"/>
            <text x="280" y="134" text-anchor="middle" font-size="22" font-weight="900" fill="#B45309">？</text>
            <path d="M363 127 L393 127" stroke="#64748B" stroke-width="3"/>
            <rect x="400" y="95" width="135" height="64" rx="14" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
            <text x="467" y="124" text-anchor="middle" font-size="14" font-weight="800" fill="#991B1B">直接攻撃</text>
            <text x="467" y="146" text-anchor="middle" font-size="12" font-weight="700" fill="#B91C1C">感染細胞を破壊</text>
        </svg>`
    },
    {
        id: 'dg-16',
        printNo: '4',
        title: '陽樹と陰樹の光合成曲線',
        answer: '陰樹',
        distractors: ['陽樹', '陽生植物', '草原植物'],
        svgHtml: `<svg viewBox="0 0 560 260" role="img" aria-label="陽樹と陰樹のグラフ">
            <line x1="75" y1="35" x2="75" y2="215" stroke="#334155" stroke-width="2.5"/>
            <line x1="65" y1="165" x2="495" y2="165" stroke="#334155" stroke-width="2.5"/>
            <path d="M75 205 Q160 85 300 55 L480 55" fill="none" stroke="#EA580C" stroke-width="3.5"/>
            <path d="M75 182 Q130 120 210 112 L480 112" fill="none" stroke="#16A34A" stroke-width="3.5"/>
            <text x="455" y="48" text-anchor="end" font-size="13" font-weight="800" fill="#C2410C">陽樹（光補償点が高い）</text>
            <rect x="330" y="122" width="140" height="38" rx="10" class="oni-svg-blank"/>
            <text x="400" y="147" text-anchor="middle" font-size="17" font-weight="900" fill="#B45309">？</text>
            <text x="330" y="188" font-size="12" font-weight="700" fill="#15803D">弱い光でも育つのは？</text>
        </svg>`
    }
];

export const ERROR_FIX_ITEMS: readonly ErrorFixItem[] = [
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

export const CATEGORY_CONFIG: Readonly<Record<Category, { label: string; description: string; trayTitle: string }>> = {
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

export const DIFFICULTY_LABELS: Readonly<Record<Difficulty, string>> = {
    easy: '🔰 かんたん',
    normal: '🧪 ふつう',
    oni: '👹 おに (60秒TA)'
};

export function getOniRankInfo(score: number): RankInfo {
    if (score >= 17) return { rank: 'S', icon: '👑', title: '生物基礎マスター', className: 'rank-s' };
    if (score >= 13) return { rank: 'A', icon: '🔬', title: '熟練研究者', className: 'rank-a' };
    if (score >= 8) return { rank: 'B', icon: '🧪', title: '一人前ラボ員', className: 'rank-b' };
    return { rank: 'C', icon: '🌱', title: '見習い観察者', className: 'rank-c' };
}

export interface DecoyCard {
    readonly label: string;
    readonly hint: string;
}

export const DECOY_CARDS_BY_SCOPE: Readonly<Record<PrintScope, readonly DecoyCard[]>> = {
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

export const TRICKY_DECOYS: Readonly<Record<string, readonly string[]>> = {
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
