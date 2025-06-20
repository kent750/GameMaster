import { Scroll } from "lucide-react";
import ChoiceCard from "./choice-card";
import type { Question } from "@shared/schema";

interface QuestionStageProps {
  question: Question;
  selectedChoice: number | null;
  onChoiceSelect: (choiceId: number) => void;
}

export default function QuestionStage({ question, selectedChoice, onChoiceSelect }: QuestionStageProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <Scroll className="text-2xl" size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-100">
          {question.title}
        </h2>
        <p className="text-slate-300">
          {question.description}
        </p>
      </div>

      {/* Choice Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {question.choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            isSelected={selectedChoice === choice.id}
            onSelect={() => onChoiceSelect(choice.id)}
          />
        ))}
      </div>
    </div>
  );
}
