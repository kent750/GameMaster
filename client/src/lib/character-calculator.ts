import type { CharacterAttributes } from "@shared/schema";

interface CharacterData {
  categories: string[];
  attributes: CharacterAttributes;
  description: string;
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
  warrior: { strength: 20, agility: 10 },
  passionate: { strength: 15, mysticism: 5 },
  direct: { strength: 10, agility: 5 },
  destroyer: { strength: 25, mysticism: 10 },
  powerful: { strength: 20, wisdom: 5 },
  ambitious: { strength: 10, wisdom: 10 },
  
  mystic: { mysticism: 20, wisdom: 15 },
  intuitive: { mysticism: 15, wisdom: 10 },
  mysterious: { mysticism: 15, agility: 10 },
  sage: { wisdom: 25, mysticism: 10 },
  seeker: { wisdom: 15, agility: 10 },
  enlightened: { wisdom: 20, mysticism: 15 },
  transcendent: { mysticism: 25, wisdom: 20 },
  
  guardian: { strength: 15, wisdom: 15 },
  harmonious: { wisdom: 15, mysticism: 10 },
  balanced: { strength: 10, wisdom: 10, agility: 10, mysticism: 10 },
  protective: { strength: 15, wisdom: 10 },
  vigilant: { agility: 15, wisdom: 10 },
  stable: { strength: 10, wisdom: 15 },
  nurturing: { wisdom: 15, mysticism: 10 },
  
  healer: { wisdom: 20, mysticism: 15 },
  compassionate: { wisdom: 15, mysticism: 10 },
  selfless: { wisdom: 20, strength: 5 },
  
  scholar: { wisdom: 25, mysticism: 10 },
  analytical: { wisdom: 20, agility: 5 },
  wise: { wisdom: 20, mysticism: 10 },
  
  legend: { strength: 15, wisdom: 15, mysticism: 15 },
  eternal: { mysticism: 20, wisdom: 15 }
};

export function calculateCharacter(choices: number[]): CharacterData {
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
    strength: 50,
    wisdom: 50,
    agility: 50,
    mysticism: 50
  };

  // Apply trait bonuses
  allTraits.forEach(trait => {
    const weights = attributeWeights[trait];
    if (weights) {
      if (weights.strength) baseAttributes.strength += weights.strength;
      if (weights.wisdom) baseAttributes.wisdom += weights.wisdom;
      if (weights.agility) baseAttributes.agility += weights.agility;
      if (weights.mysticism) baseAttributes.mysticism += weights.mysticism;
    }
  });

  // Normalize attributes to 0-100 range
  const maxAttribute = Math.max(
    baseAttributes.strength,
    baseAttributes.wisdom,
    baseAttributes.agility,
    baseAttributes.mysticism
  );

  if (maxAttribute > 100) {
    const scale = 100 / maxAttribute;
    baseAttributes.strength = Math.round(baseAttributes.strength * scale);
    baseAttributes.wisdom = Math.round(baseAttributes.wisdom * scale);
    baseAttributes.agility = Math.round(baseAttributes.agility * scale);
    baseAttributes.mysticism = Math.round(baseAttributes.mysticism * scale);
  }

  // Generate description based on categories
  const description = generateDescription(categories, baseAttributes);

  return {
    categories: categories.slice(0, 2), // Return top 2 categories
    attributes: baseAttributes,
    description
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
    value > max.value ? { key, value } : max, { key: 'strength', value: 0 });

  const statDescriptions: Record<string, string> = {
    strength: "あなたの身体的な力と意志の強さが他者を圧倒します。",
    wisdom: "あなたの洞察力と理解力が進むべき道を照らします。",
    agility: "あなたの俊敏な反射神経と適応力がどんな状況でも力を発揮します。", 
    mysticism: "あなたの神秘的な力との結びつきが並外れた能力をもたらします。"
  };

  return `${baseDesc} ${statDescriptions[highestStat.key]} あなたは${dominant}と${secondary}の本質を体現し、伝説的な道を定義する独特な特質の調和を創り出しています。`;
}
