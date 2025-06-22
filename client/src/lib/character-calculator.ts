import type { CharacterAttributes } from "@shared/schema";

interface CharacterData {
  categories: string[];
  attributes: CharacterAttributes;
  description: string;
  characterNumber: number;
  statusTitle: string;
}

const traitMappings: Record<string, string[]> = {
  // Warrior traits
  warrior: ["戦士", "狂戦士", "勇者"],
  passionate: ["炎歩者", "炎心", "燃魂"],
  direct: ["先駆者", "直進", "勇敢"],
  destroyer: ["破壊者", "征服者", "殲滅者"],
  powerful: ["強者", "巨人", "巨像"],
  ambitious: ["野心家", "向上心", "駆動者"],
  
  // Mystic traits
  mystic: ["神秘家", "神託者", "予見者"],
  intuitive: ["直感者", "共感者", "感受者"],
  mysterious: ["影歩者", "謎", "隠者"],
  sage: ["賢者", "学者", "哲学者"],
  seeker: ["真理探求者", "探検者", "放浪者"],
  enlightened: ["悟者", "覚醒者", "光明者"],
  transcendent: ["超越者", "昇天者", "神聖者"],
  
  // Guardian traits
  guardian: ["守護者", "保護者", "歩哨"],
  harmonious: ["調和者", "均衡者", "中心者"],
  balanced: ["天秤守", "平衡", "安定者"],
  protective: ["盾持ち", "防御者", "監視者"],
  vigilant: ["警戒者", "見張り", "敏感者"],
  stable: ["安定", "信頼", "堅実"],
  nurturing: ["育成者", "看護者", "生命運び"],
  
  // Healer traits
  healer: ["治癒者", "生命修復者", "回復"],
  compassionate: ["慈愛者", "優心", "慈悲深い"],
  selfless: ["無私", "犠牲的", "高潔"],
  
  // Scholar traits
  scholar: ["学者", "研究者", "学問者"],
  analytical: ["分析者", "論理的", "体系的"],
  wise: ["賢明", "博学", "知識者"],
  
  // Legend traits
  legend: ["伝説", "神話的", "永遠"],
  eternal: ["永遠", "不滅", "不朽"]
};

const attributeWeights: Record<string, Partial<CharacterAttributes>> = {
  warrior: { courage: 20, leadership: 15, cooperation: 10 },
  passionate: { courage: 15, influence: 12, leadership: 8 },
  direct: { leadership: 15, courage: 10, strategy: 5 },
  destroyer: { courage: 25, cunning: 15, leadership: 10 },
  powerful: { leadership: 20, courage: 15, influence: 10 },
  ambitious: { leadership: 12, strategy: 15, cunning: 10 },
  
  mystic: { strategy: 20, cunning: 15, influence: 8 },
  intuitive: { strategy: 15, cooperation: 12, influence: 8 },
  mysterious: { cunning: 20, strategy: 10, cooperation: -5 },
  sage: { strategy: 25, cooperation: 10, influence: 8 },
  seeker: { strategy: 15, courage: 10, cooperation: 8 },
  enlightened: { strategy: 20, influence: 15, cooperation: 10 },
  transcendent: { strategy: 25, influence: 15, cunning: 5 },
  
  guardian: { cooperation: 20, leadership: 15, courage: 12 },
  harmonious: { cooperation: 18, strategy: 10, influence: 10 },
  balanced: { leadership: 8, strategy: 8, courage: 8, cunning: 8, cooperation: 8, influence: 8 },
  protective: { cooperation: 20, courage: 15, leadership: 10 },
  vigilant: { strategy: 15, cooperation: 12, courage: 10 },
  stable: { cooperation: 18, leadership: 12, strategy: 8 },
  nurturing: { cooperation: 20, influence: 15, leadership: 8 },
  
  healer: { cooperation: 25, influence: 15, strategy: 8 },
  compassionate: { cooperation: 20, influence: 18, leadership: 5 },
  selfless: { cooperation: 25, leadership: 8, courage: 5 },
  
  scholar: { strategy: 25, cunning: 10, cooperation: 5 },
  analytical: { strategy: 20, cunning: 15, leadership: 5 },
  wise: { strategy: 20, cooperation: 10, influence: 8 },
  
  legend: { leadership: 20, influence: 20, courage: 15 },
  eternal: { influence: 18, strategy: 15, cooperation: 12 }
};

// MBTI type modifiers
const mbtiModifiers: Record<string, Partial<CharacterAttributes>> = {
  // Analysts (NT)
  'INTJ': { strategy: 20, cunning: 15, leadership: 10, cooperation: -5, influence: 5 },
  'INTP': { strategy: 25, cunning: 10, leadership: -5, cooperation: -8, influence: 0 },
  'ENTJ': { leadership: 25, strategy: 15, courage: 10, influence: 18, cooperation: 5 },
  'ENTP': { influence: 20, strategy: 15, courage: 10, cunning: 8, leadership: 12 },
  
  // Diplomats (NF)
  'INFJ': { cooperation: 20, strategy: 15, influence: 10, cunning: -5, leadership: 5 },
  'INFP': { cooperation: 18, influence: 12, strategy: 8, cunning: -8, courage: 0 },
  'ENFJ': { leadership: 20, cooperation: 18, influence: 25, strategy: 8, courage: 5 },
  'ENFP': { influence: 22, cooperation: 15, courage: 12, leadership: 10, strategy: 8 },
  
  // Sentinels (SJ)
  'ISTJ': { cooperation: 20, strategy: 15, leadership: 10, influence: -8, cunning: -5 },
  'ISFJ': { cooperation: 25, leadership: 8, strategy: 10, influence: 12, courage: 5 },
  'ESTJ': { leadership: 25, cooperation: 15, courage: 12, influence: 15, strategy: 10 },
  'ESFJ': { cooperation: 22, influence: 20, leadership: 12, strategy: 5, courage: 8 },
  
  // Explorers (SP)
  'ISTP': { courage: 20, cunning: 15, strategy: 10, cooperation: -8, influence: -5 },
  'ISFP': { cooperation: 15, influence: 12, courage: 10, cunning: 5, strategy: 5 },
  'ESTP': { courage: 20, influence: 18, leadership: 15, cunning: 8, strategy: -5 },
  'ESFP': { influence: 25, cooperation: 15, courage: 12, leadership: 10, cunning: 0 }
};

function getMBTIModifiers(mbtiType: string): CharacterAttributes {
  const modifiers = mbtiModifiers[mbtiType] || {};
  return {
    leadership: modifiers.leadership || 0,
    strategy: modifiers.strategy || 0,
    courage: modifiers.courage || 0,
    cunning: modifiers.cunning || 0,
    cooperation: modifiers.cooperation || 0,
    influence: modifiers.influence || 0
  };
}

// Character number and status title mapping
const characterMapping: Record<string, { number: number; title: string }> = {
  "戦士": { number: 1, title: "剣を振るう者" },
  "狂戦士": { number: 2, title: "怒りを纏う者" },
  "勇者": { number: 3, title: "希望を照らす者" },
  "神秘家": { number: 4, title: "神秘を操る者" },
  "神託者": { number: 5, title: "運命を告げる者" },
  "予見者": { number: 6, title: "未来を見通す者" },
  "守護者": { number: 7, title: "平和を守る者" },
  "保護者": { number: 8, title: "弱者を庇う者" },
  "歩哨": { number: 9, title: "境界を見張る者" },
  "治癒者": { number: 10, title: "傷を癒す者" },
  "生命修復者": { number: 11, title: "生命を蘇らせる者" },
  "回復": { number: 12, title: "失われたものを取り戻す者" },
  "学者": { number: 13, title: "知識を求める者" },
  "研究者": { number: 14, title: "真理を探究する者" },
  "学問者": { number: 15, title: "叡智を極める者" },
  "破壊者": { number: 16, title: "破滅をもたらす者" },
  "征服者": { number: 17, title: "世界を支配する者" },
  "殲滅者": { number: 18, title: "すべてを消し去る者" },
  "賢者": { number: 19, title: "古の知恵を持つ者" },
  "伝説": { number: 20, title: "語り継がれる者" },
  // Additional combinations
  "炎歩者": { number: 21, title: "炎の道を歩む者" },
  "影歩者": { number: 22, title: "影の中を行く者" },
  "真理探求者": { number: 23, title: "真実を追い求める者" },
  "盾持ち": { number: 24, title: "盾で守り抜く者" },
  "天秤守": { number: 25, title: "均衡を保つ者" },
  "育成者": { number: 26, title: "成長を導く者" },
  "手を差し伸べる者": { number: 27, title: "手を差し伸べる者" }
};

export function calculateCharacter(choices: number[], mbtiType?: string): CharacterData {
  // Map choices to traits based on predefined choice-trait mappings
  const allTraits: string[] = [];
  
  // Simplified trait mapping based on choice patterns
  choices.forEach((choiceId) => {
    switch (choiceId) {
      case 1: allTraits.push(...["warrior", "passionate", "direct"]); break;
      case 2: allTraits.push(...["mystic", "intuitive", "mysterious"]); break;
      case 3: allTraits.push(...["guardian", "harmonious", "balanced"]); break;
      case 4: allTraits.push(...["healer", "compassionate", "selfless"]); break;
      case 5: allTraits.push(...["scholar", "analytical", "wise"]); break;
      case 6: allTraits.push(...["guardian", "vigilant", "protective"]); break;
      case 7: allTraits.push(...["destroyer", "ambitious", "powerful"]); break;
      case 8: allTraits.push(...["sage", "seeker", "enlightened"]); break;
      case 9: allTraits.push(...["guardian", "nurturing", "stable"]); break;
      case 10: allTraits.push(...["legend", "ambitious", "eternal"]); break;
      case 11: allTraits.push(...["seeker", "transcendent", "enlightened"]); break;
      case 12: allTraits.push(...["guardian", "balanced", "eternal"]); break;
    }
  });

  // Count trait frequency
  const traitCounts: Record<string, number> = {};
  allTraits.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1;
  });

  // Get top 2-3 most frequent traits
  const sortedTraits = Object.entries(traitCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Generate categories from top traits
  const categories: string[] = [];
  sortedTraits.forEach(([trait, count]) => {
    const possibleCategories = traitMappings[trait] || [trait];
    const categoryIndex = Math.min(count - 1, possibleCategories.length - 1);
    categories.push(possibleCategories[categoryIndex]);
  });

  // Calculate attributes based on traits
  const baseAttributes: CharacterAttributes = {
    leadership: 50,
    strategy: 50,
    courage: 50,
    cunning: 50,
    cooperation: 50,
    influence: 50
  };

  // Apply trait bonuses
  allTraits.forEach(trait => {
    const weights = attributeWeights[trait];
    if (weights) {
      if (weights.leadership) baseAttributes.leadership += weights.leadership;
      if (weights.strategy) baseAttributes.strategy += weights.strategy;
      if (weights.courage) baseAttributes.courage += weights.courage;
      if (weights.cunning) baseAttributes.cunning += weights.cunning;
      if (weights.cooperation) baseAttributes.cooperation += weights.cooperation;
      if (weights.influence) baseAttributes.influence += weights.influence;
    }
  });

  // Apply MBTI modifiers if available
  if (mbtiType) {
    const mbtiModifiers = getMBTIModifiers(mbtiType);
    baseAttributes.leadership += mbtiModifiers.leadership;
    baseAttributes.strategy += mbtiModifiers.strategy;
    baseAttributes.courage += mbtiModifiers.courage;
    baseAttributes.cunning += mbtiModifiers.cunning;
    baseAttributes.cooperation += mbtiModifiers.cooperation;
    baseAttributes.influence += mbtiModifiers.influence;
  }

  // Normalize attributes to 0-100 range
  const maxAttribute = Math.max(
    baseAttributes.leadership,
    baseAttributes.strategy,
    baseAttributes.courage,
    baseAttributes.cunning,
    baseAttributes.cooperation,
    baseAttributes.influence
  );

  if (maxAttribute > 100) {
    const scale = 100 / maxAttribute;
    baseAttributes.leadership = Math.round(baseAttributes.leadership * scale);
    baseAttributes.strategy = Math.round(baseAttributes.strategy * scale);
    baseAttributes.courage = Math.round(baseAttributes.courage * scale);
    baseAttributes.cunning = Math.round(baseAttributes.cunning * scale);
    baseAttributes.cooperation = Math.round(baseAttributes.cooperation * scale);
    baseAttributes.influence = Math.round(baseAttributes.influence * scale);
  }

  // Generate description based on categories
  const description = generateDescription(categories, baseAttributes);

  // Get character number and status title
  const primaryCategory = categories[0] || "手を差し伸べる者";
  const characterInfo = characterMapping[primaryCategory] || { number: 27, title: "手を差し伸べる者" };

  return {
    categories: categories.slice(0, 2), // Return top 2 categories
    attributes: baseAttributes,
    description,
    characterNumber: characterInfo.number,
    statusTitle: characterInfo.title
  };
}

function generateDescription(categories: string[], attributes: CharacterAttributes): string {
  const dominant = categories[0] || "放浪者";
  const secondary = categories[1] || "探求者";
  
  const descriptions: Record<string, string> = {
    "戦士": "困難に立ち向かう不屈の勇気を持つ激しい戦闘者です。",
    "狂戦士": "圧倒的な戦闘力で敵を粉砕する狂乱の戦士です。",
    "勇者": "正義を胸に邪悪と戦う伝説的な英雄です。",
    "神秘家": "現実と夢の世界を歩く神秘的な力を持つ存在です。",
    "神託者": "未来を予見し神の意志を伝える預言者です。",
    "予見者": "運命の糸を読み解く洞察力を持つ者です。",
    "守護者": "均衡を保ち無垢な者を守る不動の守護者です。",
    "保護者": "大切なものを護り続ける献身的な存在です。",
    "歩哨": "永遠に見張り続ける忠実な番人です。",
    "治癒者": "傷を癒し苦しむ者に希望をもたらす慈愛の魂です。",
    "生命修復者": "生命力を操り傷を完全に治す癒し手です。",
    "回復": "失われたものを元に戻す再生の力を持つ者です。",
    "学者": "存在の謎を解き明かす知識の探求者です。",
    "研究者": "真理を追い求める学問の道を歩む者です。",
    "学問者": "深い知識と理解力を持つ賢人です。",
    "破壊者": "力によって世界を再構築する圧倒的な力の存在です。",
    "征服者": "すべてを支配下に置く絶対的な支配者です。",
    "殲滅者": "障害となるものすべてを消し去る破滅の化身です。",
    "賢者": "古代の知恵と深い理解を持つ悟りを開いた存在です。",
    "伝説": "その業績が時代を超えて語り継がれる神話的な人物です。"
  };

  const baseDesc = descriptions[dominant] || descriptions[secondary] || "大いなる可能性を秘めた唯一無二の存在です。";
  
  const highestStat = Object.entries(attributes).reduce((max, [key, value]) => 
    value > max.value ? { key, value } : max, { key: 'leadership', value: 0 });

  const statDescriptions: Record<string, string> = {
    leadership: "あなたの指導力と戦略的な判断が仲間を勝利に導きます。",
    strategy: "あなたの頭脳プレイと状況判断が戦況を有利に変えます。",
    courage: "あなたの勇敢さと大胆な決断が困難を打ち破ります。", 
    cunning: "あなたの巧妙な策略と計算が相手を上回ります。",
    cooperation: "あなたの協調性と献身が チーム全体の力を引き出します。",
    influence: "あなたの影響力とカリスマが場の雰囲気を支配します。"
  };

  return `${baseDesc} ${statDescriptions[highestStat.key]} あなたは${dominant}と${secondary}の本質を体現し、伝説的な道を定義する独特な特質の調和を創り出しています。`;
}
