import type { Choice } from "@shared/schema";

interface ChoiceCardProps {
  choice: Choice;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ChoiceCard({ choice, isSelected, onSelect }: ChoiceCardProps) {
  return (
    <div
      className={`choice-card bg-slate-800 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'selected border-purple-500 bg-gradient-to-br from-purple-500/20 to-cyan-500/10' 
          : 'border-slate-600 hover:border-purple-400'
      }`}
      onClick={onSelect}
    >
      <div className="text-center">
        <div className={`w-12 h-12 bg-gradient-to-br ${choice.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
          <i className={`${choice.icon} text-xl text-white`} />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-slate-100">
          {choice.title}
        </h3>
        <p className="text-slate-300 text-sm">
          {choice.description}
        </p>
      </div>
    </div>
  );
}
