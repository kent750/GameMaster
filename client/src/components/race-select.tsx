import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, User } from "lucide-react";

interface RaceType {
  code: string;
  name: string;
  description: string;
  category: string;
  color: string;
}

interface RaceSelectProps {
  onComplete: (race: string) => void;
}

const races: RaceType[] = [
  // 人間族
  {
    code: "HUM",
    name: "ヒューマン",
    description: "最も一般的な種族。柔軟でどのような環境にも適応する。",
    category: "人間族",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "NOB",
    name: "ノーブル",
    description: "高貴な血筋を持つ人間。礼節と誇りを重んじる。",
    category: "人間族",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "BAR",
    name: "バーバリアン",
    description: "荒々しい戦士の民。強靭な肉体と野性を誇る。",
    category: "人間族",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "OUT",
    name: "アウトロー",
    description: "掟に縛られない自由な放浪者。",
    category: "人間族",
    color: "from-purple-600 to-indigo-600"
  },

  // 妖精族
  {
    code: "ELF",
    name: "エルフ",
    description: "長寿で自然と調和する優雅な種族。",
    category: "妖精族",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "DEL",
    name: "ダークエルフ",
    description: "闇の森に棲む神秘的なエルフ。影の力を操る。",
    category: "妖精族",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "FAE",
    name: "フェアリー",
    description: "小柄で魔法に長けた気まぐれな精霊。",
    category: "妖精族",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "SYL",
    name: "シルフ",
    description: "風と共に舞う軽やかな精霊。",
    category: "妖精族",
    color: "from-green-600 to-emerald-600"
  },

  // 獣人族
  {
    code: "BEA",
    name: "獣人",
    description: "獣の特徴を持つ逞しい戦士達。",
    category: "獣人族",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "CAT",
    name: "キャットフォーク",
    description: "俊敏で好奇心旺盛な猫の民。",
    category: "獣人族",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "WOL",
    name: "ウルフキン",
    description: "群れを成して狩りを行う狼の種族。",
    category: "獣人族",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "LIZ",
    name: "リザードマン",
    description: "鱗に覆われた冷静な戦士達。",
    category: "獣人族",
    color: "from-blue-600 to-cyan-600"
  },

  // 闇の眷属
  {
    code: "DEM",
    name: "デーモン",
    description: "邪悪な力と契約を結んだ存在。",
    category: "闇の眷属",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "UND",
    name: "アンデッド",
    description: "死を越えて蘇った魂なき者。",
    category: "闇の眷属",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "VAM",
    name: "ヴァンパイア",
    description: "血を糧とする夜の支配者。",
    category: "闇の眷属",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "GOB",
    name: "ゴブリン",
    description: "狡猾で素早い小柄な種族。",
    category: "闇の眷属",
    color: "from-orange-600 to-red-600"
  }
];

export default function RaceSelect({ onComplete }: RaceSelectProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeCode: string) => {
    setSelectedType(typeCode);
    // Auto-advance after selection
    setTimeout(() => {
      onComplete(typeCode);
    }, 500);
  };

  const handleComplete = () => {
    if (selectedType) {
      onComplete(selectedType);
    }
  };

  const groupedTypes = {
    "人間族": races.filter(t => t.category === "人間族"),
    "妖精族": races.filter(t => t.category === "妖精族"),
    "獣人族": races.filter(t => t.category === "獣人族"),
    "闇の眷属": races.filter(t => t.category === "闇の眷属")
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mist-bg" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-6xl w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-game-gold to-game-gold-dim rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <Brain size={32} className="text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">
              種族を選択
            </h2>
            <p className="text-slate-300 mb-8">
              あなたの種族を選択してください
            </p>
          </div>

          {Object.entries(groupedTypes).map(([category, types]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-100 border-b border-slate-600 pb-2">
                {category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {types.map((type) => (
                  <button
                    key={type.code}
                    onClick={() => handleSelect(type.code)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedType === type.code
                        ? 'border-game-gold bg-gradient-to-br from-game-gold/20 to-game-gold-dim/10 transform scale-105'
                        : 'border-slate-600 hover:border-game-gold-dim bg-slate-700 hover:transform hover:scale-102'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-100 mb-1">
                          {type.code}
                        </div>
                        <div className="text-sm font-medium text-game-gold mb-2">
                          {type.name}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              {selectedType ? "選択済み - 自動的に進行します..." : "種族を選択してください"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}