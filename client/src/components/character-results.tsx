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

export default function CharacterResults({ result, onRestart }: CharacterResultsProps) {
  const attributes = [
    {
      name: "主導",
      value: result.attributes.leadership,
      icon: <img src="/assets/leadership.png" alt="主導" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      name: "知略", 
      value: result.attributes.strategy,
      icon: <img src="/assets/intellect.png" alt="知略" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      name: "勇敢",
      value: result.attributes.courage,
      icon: <img src="/assets/bravery.png" alt="勇敢" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      name: "策謀",
      value: result.attributes.cunning,
      icon: <img src="/assets/manipulation.png" alt="策謀" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      name: "協力",
      value: result.attributes.cooperation,
      icon: <img src="/assets/cooperation.png" alt="協力" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      name: "影響",
      value: result.attributes.influence,
      icon: <img src="/assets/influence.png" alt="影響" className="w-8 h-8" />,
      gradient: "from-yellow-600 to-yellow-500"
    }
  ];

  const handleShare = () => {
    const shareText = `私のキャラクター結果:\n${result.categories.join(", ")}\n\n${result.description}`;
    if (navigator.share) {
      navigator.share({
        title: 'キャラクター創世記の結果',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,119,198,0.08),transparent_50%)]" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Crown className="text-yellow-600" size={32} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                あなたのキャラクター
              </h1>
              <Crown className="text-yellow-600" size={32} />
            </div>
            <p className="text-slate-300 text-lg">運命が明かされました</p>
          </div>

          {/* Character Identity */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <UserCircle className="mr-3 text-yellow-600" size={24} />
                キャラクター原型
              </h3>
              <div className="space-y-3">
                {result.categories.map((category, index) => (
                  <div
                    key={category}
                    className={`bg-gradient-to-r ${
                      index === 0 
                        ? 'from-yellow-600/20 to-yellow-700/20 border-yellow-600/30' 
                        : 'from-yellow-700/20 to-yellow-500/20 border-yellow-700/30'
                    } rounded-lg p-3 border`}
                  >
                    <span className="font-medium text-slate-100">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <Scroll className="mr-3 text-yellow-600" size={24} />
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
              <BarChart3 className="mr-3 text-yellow-600" size={24} />
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
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Share className="mr-2" size={20} />
              結果を共有
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="mr-2" size={20} />
              もう一度診断
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}