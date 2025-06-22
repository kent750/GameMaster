import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, User } from "lucide-react";

interface PersonalityType {
  code: string;
  name: string;
  description: string;
  category: string;
  color: string;
}

interface MBTITestProps {
  onComplete: (mbtiType: string) => void;
}

const personalityTypes: PersonalityType[] = [
  // 分析家タイプ (NT)
  {
    code: "INTJ",
    name: "建築家",
    description: "想像力が豊かで、戦略的な思考の持ち主。あらゆることに計画を立てる。",
    category: "分析家",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "INTP", 
    name: "論理学者",
    description: "貪欲な知識欲を持つ革新的な発明家。",
    category: "分析家",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "ENTJ",
    name: "指揮官", 
    description: "大胆で想像力豊か、かつ強い意志を持つ指導者。常に道を見つけるか、道を切り開く。",
    category: "分析家",
    color: "from-purple-600 to-indigo-600"
  },
  {
    code: "ENTP",
    name: "討論者",
    description: "賢くて好奇心旺盛な思想家。知的挑戦には必ず受けて立つ。",
    category: "分析家", 
    color: "from-purple-600 to-indigo-600"
  },
  
  // 外交官タイプ (NF)
  {
    code: "INFJ",
    name: "提唱者",
    description: "静かで神秘的だが、人々を非常に勇気づける飽くなき理想主義者。",
    category: "外交官",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "INFP",
    name: "仲介者",
    description: "詩人肌で親切な利他主義者。常により良い世界のため尽力している。",
    category: "外交官",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "ENFJ",
    name: "主人公",
    description: "カリスマ性があり、人々を励ますリーダー。聞く人を魅了する。",
    category: "外交官",
    color: "from-green-600 to-emerald-600"
  },
  {
    code: "ENFP",
    name: "運動家",
    description: "情熱的で独創性があり、かつ社交的な自由人。常に笑いどころや楽しめることを見つけられる。",
    category: "外交官",
    color: "from-green-600 to-emerald-600"
  },
  
  // 番人タイプ (SJ)
  {
    code: "ISTJ",
    name: "管理者",
    description: "実用的で事実に基づいた思考の持ち主。その信頼性は他の追随を許さない。",
    category: "番人",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ISFJ",
    name: "擁護者",
    description: "非常に献身的で心の温かい擁護者。いつでも大切な人を守る準備ができている。",
    category: "番人",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ESTJ",
    name: "幹部",
    description: "優秀な管理者。物事や人々を管理する能力にかけては右に出る者はいない。",
    category: "番人",
    color: "from-blue-600 to-cyan-600"
  },
  {
    code: "ESFJ",
    name: "領事",
    description: "非常に思いやりがあり社交的で、人気者。常に熱心に人助けをしている。",
    category: "番人",
    color: "from-blue-600 to-cyan-600"
  },
  
  // 探検家タイプ (SP)
  {
    code: "ISTP",
    name: "巨匠",
    description: "大胆で実用的な思考を持つ実験者。あらゆる道具を使いこなす。",
    category: "探検家",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ISFP",
    name: "冒険家",
    description: "柔軟性があり魅力的な芸術家。常に新しい可能性を模索している。",
    category: "探検家",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ESTP",
    name: "起業家",
    description: "賢くてエネルギッシュで、知覚に優れた人。極限状況でも楽しむ。",
    category: "探検家",
    color: "from-orange-600 to-red-600"
  },
  {
    code: "ESFP",
    name: "エンターテイナー",
    description: "自発性があり、エネルギッシュで熱心なエンターテイナー。一緒にいる人を決して退屈させない。",
    category: "探検家",
    color: "from-orange-600 to-red-600"
  }
];

export default function MBTITest({ onComplete }: MBTITestProps) {
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
    "分析家": personalityTypes.filter(t => t.category === "分析家"),
    "外交官": personalityTypes.filter(t => t.category === "外交官"), 
    "番人": personalityTypes.filter(t => t.category === "番人"),
    "探検家": personalityTypes.filter(t => t.category === "探検家")
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
              16パーソナリティタイプ選択
            </h2>
            <p className="text-slate-300 mb-8">
              あなたの性格に最も近いタイプを選択してください
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
              {selectedType ? "選択済み - 自動的に進行します..." : "タイプを選択してください"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}