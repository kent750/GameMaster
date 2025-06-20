import { Crown, UserCircle, Scroll, BarChart3, Share, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CharacterResult } from "@shared/schema";

interface CharacterResultsProps {
  result: CharacterResult;
  onRestart: () => void;
}

export default function CharacterResults({ result, onRestart }: CharacterResultsProps) {
  const attributes = [
    {
      name: "Strength",
      value: result.attributes.strength,
      icon: "🗡️",
      gradient: "from-red-500 to-orange-500"
    },
    {
      name: "Wisdom", 
      value: result.attributes.wisdom,
      icon: "🧠",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Agility",
      value: result.attributes.agility,
      icon: "🏃",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Mysticism",
      value: result.attributes.mysticism,
      icon: "✨",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Character Creation Result",
        text: `I've discovered my character archetype: ${result.categories.join(" & ")}!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const text = `I've discovered my character archetype: ${result.categories.join(" & ")}!\n\nStrength: ${result.attributes.strength}\nWisdom: ${result.attributes.wisdom}\nAgility: ${result.attributes.agility}\nMysticism: ${result.attributes.mysticism}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-4xl w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <Crown className="text-3xl text-white" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Your Character Awakens</h2>
            <p className="text-slate-300">Your choices have forged your destiny...</p>
          </div>

          {/* Character Identity */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <UserCircle className="mr-3 text-purple-400" size={24} />
                Character Archetype
              </h3>
              <div className="space-y-3">
                {result.categories.map((category, index) => (
                  <div
                    key={category}
                    className={`bg-gradient-to-r ${
                      index === 0 
                        ? 'from-purple-500/20 to-cyan-500/20 border-purple-500/30' 
                        : 'from-cyan-500/20 to-amber-500/20 border-cyan-500/30'
                    } rounded-lg p-3 border`}
                  >
                    <span className="font-medium text-slate-100">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
                <Scroll className="mr-3 text-cyan-400" size={24} />
                Character Essence
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {result.description}
              </p>
            </div>
          </div>

          {/* Status Attributes */}
          <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-slate-100">
              <BarChart3 className="mr-3 text-amber-400" size={24} />
              Attributes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {attributes.map((attr) => (
                <div key={attr.name} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${attr.gradient} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-xl">{attr.icon}</span>
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
              Share Results
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            >
              <RotateCcw className="mr-2" size={16} />
              Start New Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
