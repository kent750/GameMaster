import { Crown, UserCircle, Scroll, BarChart3, Share, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CharacterResult } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CharacterResultsProps {
  result: CharacterResult;
  onRestart: () => void;
}

const traitIcons: Record<keyof Character, React.ReactNode> = {
  influence: <img src="/assets/influence.png" alt="influence" className="w-12 h-12" />,
  manipulation: (
    <img src="/assets/manipulation.png" alt="manipulation" className="w-12 h-12" />
  ),
  cooperation: (
    <img src="/assets/cooperation.png" alt="cooperation" className="w-12 h-12" />
  ),
  leadership: (
    <img src="/assets/leadership.png" alt="leadership" className="w-12 h-12" />
  ),
  bravery: <img src="/assets/bravery.png" alt="bravery" className="w-12 h-12" />,
  intellect: <img src="/assets/intellect.png" alt="intellect" className="w-12 h-12" />,
};

const traitNames: Record<keyof Character, string> = {
  influence: "影響",
  manipulation: "策謀",
  cooperation: "協力",
  leadership: "主導",
  bravery: "勇敢",
  intellect: "知略",
};

export default function CharacterResults({ result, onRestart }: CharacterResultsProps) {
  const attributes = [
    {
      name: "主導",
      value: result.attributes.leadership,
      icon: <img src="/assets/leadership.png" alt="主導" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    },
    {
      name: "知略", 
      value: result.attributes.strategy,
      icon: <img src="/assets/intellect.png" alt="知略" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    },
    {
      name: "勇敢",
      value: result.attributes.courage,
      icon: <img src="/assets/bravery.png" alt="勇敢" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    },
    {
      name: "策謀",
      value: result.attributes.cunning,
      icon: <img src="/assets/manipulation.png" alt="策謀" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    },
    {
      name: "協力",
      value: result.attributes.cooperation,
      icon: <img src="/assets/cooperation.png" alt="協力" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    },
    {
      name: "影響",
      value: result.attributes.influence,
      icon: <img src="/assets/influence.png" alt="影響" className="w-8 h-8" />,
      gradient: "from-game-gold to-game-gold-bright"
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "私のキャラクター創造結果",
        text: `私のキャラクター原型を発見しました: ${result.categories.join(" & ")}!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const text = `私のキャラクター原型を発見しました: ${result.categories.join(" & ")}!\n\n主導: ${result.attributes.leadership}\n知略: ${result.attributes.strategy}\n勇敢: ${result.attributes.courage}\n策謀: ${result.attributes.cunning}\n協力: ${result.attributes.cooperation}\n影響: ${result.attributes.influence}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mist-bg" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-4xl w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-game-gold-bright to-game-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <Crown className="text-3xl text-white" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">あなたのキャラクターが覚醒しました</h2>
            <div className="mb-4">
              <div className="text-2xl font-bold text-game-gold mb-2">No.{result.characterNumber}</div>
              <div className="text-xl text-game-gold-dim">{result.statusTitle}</div>
            </div>
            <p className="text-slate-300">あなたの選択が運命を築きました...</p>
          </div>

          {/* Character Identity */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <UserCircle className="mr-3 text-game-gold" size={24} />
                キャラクター原型
              </h3>
              <div className="space-y-3">
                {result.categories.map((category, index) => (
                  <div
                    key={category}
                    className={`bg-gradient-to-r ${
                      index === 0 
                        ? 'from-game-gold/20 to-game-gold-dim/20 border-game-gold/30' 
                        : 'from-game-gold-dim/20 to-game-gold-bright/20 border-game-gold-dim/30'
                    } rounded-lg p-3 border`}
                  >
                    <span className="font-medium text-slate-100">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <Scroll className="mr-3 text-game-gold" size={24} />
                キャラクターの本質
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {result.description}
              </p>
            </div>
          </div>

          {/* Status Attributes */}
          <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-slate-100">
              <BarChart3 className="mr-3 text-game-gold" size={24} />
              評価
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attributes.map((attr) => (
                <div key={attr.name} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${attr.gradient} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    {attr.icon}
                  </div>
                  <div className="font-semibold text-lg text-slate-100">{attr.value}</div>
                  <div className="text-slate-400 text-sm">{attr.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
            >
              <Share className="mr-2" size={16} />
              結果を共有
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            >
              <RotateCcw className="mr-2" size={16} />
              新しい旅を始める
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
