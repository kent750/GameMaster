import { useState } from "react";
import { Brain, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PersonalityType {
  code: string;
  name: string;
  description: string;
  category: string;
  color: string;
}

interface TypeSelectProps {
  onComplete: (type: string) => void;
}

const types: PersonalityType[] = [
  // 外交官
  {
    code: "INFP",
    name: "ヤマネコ",
    description: "自由な発想と強い共感力を持つ理想家。",
    category: "外交官",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "ENFP",
    name: "カラス",
    description: "情熱的で創造力豊かな運動家。",
    category: "外交官",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "INFJ",
    name: "オオカミ",
    description: "直感と倫理観で人々を導く提唱者。",
    category: "外交官",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "ENFJ",
    name: "シカ",
    description: "カリスマ性にあふれ仲間を鼓舞する主人公。",
    category: "外交官",
    color: "from-purple-600 to-indigo-600"
  },

  // 分析家
  {
    code: "INTP",
    name: "カメ",
    description: "知識を追求し理論を探究する論理学者。",
    category: "分析家",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "ENTP",
    name: "キツネ",
    description: "新しい可能性に挑戦する討論者。",
    category: "分析家",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "INTJ",
    name: "フクロウ",
    description: "戦略的思考に優れた建築家。",
    category: "分析家",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "ENTJ",
    name: "トラ",
    description: "決断力と統率力を持つ指揮官。",
    category: "分析家",
    color: "from-green-600 to-emerald-600"
  },

  // 探検家
  {
    code: "ISFP",
    name: "コウモリ",
    description: "柔軟で芸術的な感性を持つ冒険家。",
    category: "探検家",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ESFP",
    name: "サル",
    description: "場を盛り上げる社交的なエンターテイナー。",
    category: "探検家",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ISTP",
    name: "コヨーテ",
    description: "実用的で独立心の強いテクニシャン。",
    category: "探検家",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ESTP",
    name: "ワシ",
    description: "行動的で変化を楽しむ起業家。",
    category: "探検家",
    color: "from-blue-600 to-cyan-600"
  },

  // 番人
  {
    code: "ISTJ",
    name: "ゾウ",
    description: "責任感が強く組織的な管理者。",
    category: "番人",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ISFJ",
    name: "シロクマ",
    description: "温厚で思慮深い擁護者。",
    category: "番人",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ESTJ",
    name: "ライオン",
    description: "統率力に優れた頼れる幹部。",
    category: "番人",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ESFJ",
    name: "ハクチョウ",
    description: "社交的で人々を支える領事。",
    category: "番人",
    color: "from-orange-600 to-red-600"
  }
];

export default function TypeSelect({ onComplete }: TypeSelectProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeCode: string) => {
    setSelectedType(typeCode);
    setTimeout(() => {
      onComplete(typeCode);
    }, 500);
  };

  const groupedTypes = {
    外交官: types.filter((t) => t.category === "外交官"),
    分析家: types.filter((t) => t.category === "分析家"),
    探検家: types.filter((t) => t.category === "探検家"),
    番人: types.filter((t) => t.category === "番人")
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mist-bg" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-6xl w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-game-gold to-game-gold-dim rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <Brain size={32} className="text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">性格タイプを選択</h2>
            <p className="text-slate-300 mb-8">あなたの16タイプから最も近いものを選んでください</p>
          </div>

          {Object.entries(groupedTypes).map(([category, types]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-100 border-b border-slate-600 pb-2">{category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {types.map((type) => (
                  <button
                    key={type.code}
                    onClick={() => handleSelect(type.code)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedType === type.code ? 'border-game-gold bg-gradient-to-br from-game-gold/20 to-game-gold-dim/10 transform scale-105' : 'border-slate-600 hover:border-game-gold-dim bg-slate-700 hover:transform hover:scale-102'}`}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-100 mb-1">{type.code}</div>
                        <div className="text-sm font-medium text-game-gold mb-2">{type.name}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              {selectedType ? '選択済み - 自動的に進行します...' : '性格タイプを選択してください'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
