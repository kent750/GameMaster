import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight } from "lucide-react";

interface MBTIQuestion {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  aValue: string;
  bValue: string;
}

interface MBTITestProps {
  onComplete: (mbtiType: string) => void;
}

const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    question: "新しい環境で、あなたはどちらの傾向がありますか？",
    optionA: "積極的に他の人と話して交流する",
    optionB: "しばらく様子を見てから慎重に行動する",
    dimension: 'EI',
    aValue: 'E',
    bValue: 'I'
  },
  {
    id: 2,
    question: "問題を解決する時、どちらを重視しますか？",
    optionA: "具体的な事実や経験に基づいて判断する",
    optionB: "可能性や将来の展望を考慮して判断する",
    dimension: 'SN',
    aValue: 'S',
    bValue: 'N'
  },
  {
    id: 3,
    question: "決断を下す時、何を最も重視しますか？",
    optionA: "論理的な分析と客観的な基準",
    optionB: "人への影響と価値観との一致",
    dimension: 'TF',
    aValue: 'T',
    bValue: 'F'
  },
  {
    id: 4,
    question: "日常生活において、どちらを好みますか？",
    optionA: "計画を立てて決まったスケジュールで行動する",
    optionB: "状況に応じて柔軟に対応する",
    dimension: 'JP',
    aValue: 'J',
    bValue: 'P'
  },
  {
    id: 5,
    question: "エネルギーを回復する時、どちらが効果的ですか？",
    optionA: "友人や同僚と過ごして話をする",
    optionB: "一人の時間を作って静かに過ごす",
    dimension: 'EI',
    aValue: 'E',
    bValue: 'I'
  },
  {
    id: 6,
    question: "学習する時、どちらの方法を好みますか？",
    optionA: "段階的に詳細を積み重ねていく",
    optionB: "全体的な概念やパターンを理解する",
    dimension: 'SN',
    aValue: 'S',
    bValue: 'N'
  },
  {
    id: 7,
    question: "他人を評価する時、何を重視しますか？",
    optionA: "能力や成果の客観的な評価",
    optionB: "努力や動機への共感と理解",
    dimension: 'TF',
    aValue: 'T',
    bValue: 'F'
  },
  {
    id: 8,
    question: "プロジェクトを進める時、どちらを好みますか？",
    optionA: "早めに決定して着実に進める",
    optionB: "選択肢を開いたまま最後まで検討する",
    dimension: 'JP',
    aValue: 'J',
    bValue: 'P'
  }
];

export default function MBTITest({ onComplete }: MBTITestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const handleAnswer = (option: 'A' | 'B') => {
    const question = mbtiQuestions[currentQuestion];
    const value = option === 'A' ? question.aValue : question.bValue;
    
    setAnswers(prev => ({
      ...prev,
      [question.dimension]: value
    }));
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate MBTI type
      const mbtiType = calculateMBTI(answers);
      onComplete(mbtiType);
    }
  };

  const calculateMBTI = (answers: Record<string, string>): string => {
    const ei = answers['EI'] || 'I';
    const sn = answers['SN'] || 'S';
    const tf = answers['TF'] || 'T';
    const jp = answers['JP'] || 'J';
    return `${ei}${sn}${tf}${jp}`;
  };

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;
  const question = mbtiQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-3xl w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <Brain size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">
              パーソナリティ診断
            </h2>
            <p className="text-slate-300 mb-6">
              16の性格タイプの診断を行います。各質問に正直に答えてください。
            </p>
            
            <div className="mb-6">
              <Progress value={progress} className="w-full h-3 bg-slate-700" />
              <p className="text-slate-400 text-sm mt-2">
                質問 {currentQuestion + 1} / {mbtiQuestions.length}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-slate-100 text-center">
              {question.question}
            </h3>
            
            <div className="grid gap-4">
              <button
                onClick={() => handleAnswer('A')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedOption === 'A' 
                    ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-cyan-500/10' 
                    : 'border-slate-600 hover:border-purple-400 bg-slate-700'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mr-4 text-white font-semibold">
                    A
                  </div>
                  <span className="text-slate-100">{question.optionA}</span>
                </div>
              </button>
              
              <button
                onClick={() => handleAnswer('B')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedOption === 'B' 
                    ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-cyan-500/10' 
                    : 'border-slate-600 hover:border-purple-400 bg-slate-700'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mr-4 text-white font-semibold">
                    B
                  </div>
                  <span className="text-slate-100">{question.optionB}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3"
            >
              {currentQuestion < mbtiQuestions.length - 1 ? (
                <>
                  次へ
                  <ArrowRight className="ml-2" size={16} />
                </>
              ) : (
                "診断完了"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}