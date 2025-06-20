import type { CharacterAttributes } from "@shared/schema";

interface CharacterData {
  categories: string[];
  attributes: CharacterAttributes;
  description: string;
}

const traitMappings: Record<string, string[]> = {
  // Warrior traits
  warrior: ["Warrior", "Berserker", "Champion"],
  passionate: ["Fire Walker", "Flame Heart", "Ember Soul"],
  direct: ["Vanguard", "Straightforward", "Bold"],
  destroyer: ["Destroyer", "Conqueror", "Annihilator"],
  powerful: ["Powerhouse", "Titan", "Colossus"],
  ambitious: ["Ambitious", "Aspiring", "Driven"],
  
  // Mystic traits
  mystic: ["Mystic", "Oracle", "Seer"],
  intuitive: ["Intuitive", "Empath", "Sensitive"],
  mysterious: ["Shadow Walker", "Enigma", "Veiled"],
  sage: ["Sage", "Scholar", "Philosopher"],
  seeker: ["Truth Seeker", "Explorer", "Wanderer"],
  enlightened: ["Enlightened", "Awakened", "Illuminated"],
  transcendent: ["Transcendent", "Ascended", "Divine"],
  
  // Guardian traits
  guardian: ["Guardian", "Protector", "Sentinel"],
  harmonious: ["Harmonious", "Balanced", "Centered"],
  balanced: ["Balance Keeper", "Equilibrium", "Steady"],
  protective: ["Shield Bearer", "Defender", "Warden"],
  vigilant: ["Vigilant", "Watchful", "Alert"],
  stable: ["Stable", "Reliable", "Steadfast"],
  nurturing: ["Nurturer", "Caretaker", "Life Bringer"],
  
  // Healer traits
  healer: ["Healer", "Life Mender", "Restoration"],
  compassionate: ["Compassionate", "Kind Heart", "Merciful"],
  selfless: ["Selfless", "Sacrificial", "Noble"],
  
  // Scholar traits
  scholar: ["Scholar", "Researcher", "Academic"],
  analytical: ["Analytical", "Logical", "Methodical"],
  wise: ["Wise", "Learned", "Knowledgeable"],
  
  // Legend traits
  legend: ["Legend", "Mythic", "Eternal"],
  eternal: ["Eternal", "Timeless", "Immortal"]
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
  const dominant = categories[0] || "Wanderer";
  const secondary = categories[1] || "Seeker";
  
  const descriptions: Record<string, string> = {
    "Warrior": "A fierce combatant who faces challenges head-on with unwavering courage.",
    "Mystic": "A being of mystical power who walks between worlds of reality and dreams.",
    "Guardian": "A steadfast protector who maintains balance and shields the innocent.",
    "Healer": "A compassionate soul who mends wounds and brings hope to the suffering.",
    "Scholar": "A seeker of knowledge who unravels the mysteries of existence.",
    "Destroyer": "A force of overwhelming power that reshapes the world through strength.",
    "Sage": "An enlightened being who possesses ancient wisdom and deep understanding.",
    "Legend": "A mythic figure whose deeds echo through the ages."
  };

  const baseDesc = descriptions[dominant] || descriptions[secondary] || "A unique being of great potential.";
  
  const highestStat = Object.entries(attributes).reduce((max, [key, value]) => 
    value > max.value ? { key, value } : max, { key: 'strength', value: 0 });

  const statDescriptions: Record<string, string> = {
    strength: "Your physical prowess and determination set you apart from others.",
    wisdom: "Your insight and understanding illuminate the path forward.",
    agility: "Your swift reflexes and adaptability serve you well in any situation.", 
    mysticism: "Your connection to mystical forces grants you extraordinary abilities."
  };

  return `${baseDesc} ${statDescriptions[highestStat.key]} You embody the essence of both ${dominant} and ${secondary}, creating a unique harmony of traits that defines your legendary path.`;
}
