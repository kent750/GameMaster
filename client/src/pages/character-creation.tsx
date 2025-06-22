import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import QuestionStage from "@/components/question-stage";
import CharacterResults from "@/components/character-results";
import TypeSelect from "@/components/type-select";
import { Button } from "@/components/ui/button";
import { RotateCcw, Crown } from "lucide-react";
import type { Question, QuizSession, CharacterResult } from "@shared/schema";

export default function CharacterCreation() {
  const [currentStage, setCurrentStage] = useState(1);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<number | null>(null);
  const [showTypeSelect, setShowTypeSelect] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Start a new quiz session
  const startSessionMutation = useMutation({
    mutationFn: (type?: string) => apiRequest("POST", "/api/quiz/start", { mbtiType: type }),
    onSuccess: async (response) => {
      const session: QuizSession = await response.json();
      setSessionId(session.id);
    },
  });

  // Update quiz session with choice
  const updateSessionMutation = useMutation({
    mutationFn: ({ sessionId, choiceId, stage }: { sessionId: number; choiceId: number; stage: number }) =>
      apiRequest("PATCH", `/api/quiz/${sessionId}`, { choiceId, stage }),
    onSuccess: async (response) => {
      const session: QuizSession = await response.json();
      setSelectedChoices(session.choices);
      if (session.completed) {
        setIsComplete(true);
        calculateCharacterMutation.mutate({ sessionId: session.id });
      }
    },
  });

  // Calculate character result
  const calculateCharacterMutation = useMutation({
    mutationFn: ({ sessionId }: { sessionId: number }) =>
      apiRequest("POST", "/api/character/calculate", { sessionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/character/${sessionId}`] });
    },
  });

  // Fetch questions for current stage
  const { data: questions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: [`/api/questions/${currentStage}`],
    enabled: !isComplete && sessionId !== null,
  });

  // Fetch character result when complete
  const { data: characterResult, isLoading: resultLoading } = useQuery<CharacterResult>({
    queryKey: [`/api/character/${sessionId}`],
    enabled: isComplete && sessionId !== null,
  });

  // Initialize session on mount
  useEffect(() => {
    if (!sessionId && !showTypeSelect) {
      startSessionMutation.mutate(selectedType || undefined);
    }
  }, [showTypeSelect, selectedType]);

  const handleChoiceSelect = (choiceId: number) => {
    setCurrentChoice(choiceId);
    
    // Auto-advance to next stage after selection
    if (sessionId) {
      updateSessionMutation.mutate({
        sessionId,
        choiceId,
        stage: currentStage
      });

      if (currentStage < 5) {
        setCurrentStage(currentStage + 1);
        setCurrentChoice(null);
      }
    }
  };



  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setCurrentChoice(null);
    }
  };

  const handleRestart = () => {
    setCurrentStage(1);
    setSessionId(null);
    setSelectedChoices([]);
    setIsComplete(false);
    setCurrentChoice(null);
    setShowTypeSelect(true);
    setSelectedType(null);
  };

  const handleTypeComplete = (type: string) => {
    setSelectedType(type);
    setShowTypeSelect(false);
  };

  if (showTypeSelect) {
    return <TypeSelect onComplete={handleTypeComplete} />;
  }

  if (isComplete && characterResult) {
    return <CharacterResults result={characterResult} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mist-bg" style={{ backgroundColor: 'var(--game-dark)' }}>
      <div className="max-w-4xl w-full">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-game-gold-bright mb-4 animate-float">
            <Crown className="inline-block mr-4 text-game-gold" size={48} />
            あなたの選択
          </h1>
          <p className="text-slate-300 text-lg mb-8">神秘的な選択であなたの真の性格を発見してください</p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((stage) => (
                <div
                  key={stage}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    stage <= currentStage 
                      ? 'bg-game-gold animate-glow' 
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-400 text-sm">ステージ {currentStage} / 5</span>
          </div>
        </div>

        {/* Question Stage */}
        {questionsLoading ? (
          <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-game-gold to-game-gold-dim rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Crown size={32} className="text-slate-900" />
              </div>
              <div className="h-8 bg-slate-700 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded w-2/3 mx-auto animate-pulse"></div>
            </div>
          </div>
        ) : questions && questions.length > 0 ? (
          <QuestionStage
            question={questions[0]}
            selectedChoice={currentChoice}
            onChoiceSelect={handleChoiceSelect}
          />
        ) : null}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStage === 1}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200"
          >
            前へ
          </Button>
          
          <div className="text-slate-400 text-sm">
            {updateSessionMutation.isPending ? "処理中..." : "選択肢をクリックして進行"}
          </div>
          
          <Button
            onClick={handleRestart}
            variant="outline"
            className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200"
          >
            <RotateCcw className="mr-2" size={16} />
            やり直し
          </Button>
        </div>
      </div>
    </div>
  );
}
