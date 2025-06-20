import { questions, quizSessions, characterResults, type Question, type QuizSession, type CharacterResult, type InsertQuizSession, type InsertCharacterResult, type Choice } from "@shared/schema";

export interface IStorage {
  getQuestionsByStage(stage: number): Promise<Question[]>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  getQuizSession(id: number): Promise<QuizSession | undefined>;
  updateQuizSession(id: number, choices: number[], completed: number): Promise<QuizSession>;
  createCharacterResult(result: InsertCharacterResult): Promise<CharacterResult>;
  getCharacterResult(sessionId: number): Promise<CharacterResult | undefined>;
}

export class MemStorage implements IStorage {
  private questions: Map<number, Question>;
  private quizSessions: Map<number, QuizSession>;
  private characterResults: Map<number, CharacterResult>;
  private currentQuestionId: number;
  private currentSessionId: number;
  private currentResultId: number;

  constructor() {
    this.questions = new Map();
    this.quizSessions = new Map();
    this.characterResults = new Map();
    this.currentQuestionId = 1;
    this.currentSessionId = 1;
    this.currentResultId = 1;
    this.initializeQuestions();
  }

  private initializeQuestions() {
    const questionsData: Omit<Question, 'id'>[] = [
      {
        stage: 1,
        title: "You find yourself at a crossroads in an ancient forest. What calls to you?",
        description: "The path you choose will shape your destiny. Listen to your instincts...",
        choices: [
          {
            id: 1,
            title: "The Glowing Embers",
            description: "Follow the warmth of mysterious flames dancing between the trees",
            icon: "fas fa-fire",
            gradient: "from-red-500 to-orange-500",
            traits: ["warrior", "passionate", "direct"]
          },
          {
            id: 2,
            title: "The Whispering Shadows",
            description: "Listen to the ancient secrets hidden in the darkness",
            icon: "fas fa-eye",
            gradient: "from-blue-500 to-purple-500",
            traits: ["mystic", "intuitive", "mysterious"]
          },
          {
            id: 3,
            title: "The Living Path",
            description: "Walk where nature itself seems to guide your steps",
            icon: "fas fa-leaf",
            gradient: "from-green-500 to-emerald-500",
            traits: ["guardian", "harmonious", "balanced"]
          }
        ]
      },
      {
        stage: 2,
        title: "A wounded traveler blocks your path, pleading for help. How do you respond?",
        description: "Your choice reveals the core of your character...",
        choices: [
          {
            id: 4,
            title: "Immediate Action",
            description: "Rush to their aid without hesitation, using your skills to help",
            icon: "fas fa-heart",
            gradient: "from-red-500 to-pink-500",
            traits: ["healer", "compassionate", "selfless"]
          },
          {
            id: 5,
            title: "Cautious Assessment",
            description: "Carefully observe the situation before deciding your approach",
            icon: "fas fa-search",
            gradient: "from-yellow-500 to-orange-500",
            traits: ["scholar", "analytical", "wise"]
          },
          {
            id: 6,
            title: "Protective Vigilance",
            description: "Stand guard while helping, watching for potential threats",
            icon: "fas fa-shield",
            gradient: "from-blue-500 to-indigo-500",
            traits: ["guardian", "vigilant", "protective"]
          }
        ]
      },
      {
        stage: 3,
        title: "You discover an ancient artifact radiating unknown power. What draws you to it?",
        description: "The artifact responds to your deepest nature...",
        choices: [
          {
            id: 7,
            title: "Its Raw Power",
            description: "Feel the strength it could grant you in battles ahead",
            icon: "fas fa-bolt",
            gradient: "from-purple-500 to-red-500",
            traits: ["destroyer", "ambitious", "powerful"]
          },
          {
            id: 8,
            title: "Its Hidden Knowledge",
            description: "Sense the ancient wisdom and secrets it contains",
            icon: "fas fa-scroll",
            gradient: "from-blue-500 to-cyan-500",
            traits: ["sage", "seeker", "enlightened"]
          },
          {
            id: 9,
            title: "Its Protective Aura",
            description: "Feel how it could shield and preserve what you hold dear",
            icon: "fas fa-gem",
            gradient: "from-green-500 to-blue-500",
            traits: ["protector", "nurturing", "stable"]
          }
        ]
      },
      {
        stage: 4,
        title: "Your final trial: a choice that will define your legend. What is your ultimate goal?",
        description: "This moment crystallizes your true purpose...",
        choices: [
          {
            id: 10,
            title: "Forge Your Legacy",
            description: "Become a legend whose name echoes through the ages",
            icon: "fas fa-crown",
            gradient: "from-amber-500 to-yellow-500",
            traits: ["legend", "ambitious", "eternal"]
          },
          {
            id: 11,
            title: "Seek Ultimate Truth",
            description: "Uncover the deepest mysteries of existence itself",
            icon: "fas fa-star",
            gradient: "from-indigo-500 to-purple-500",
            traits: ["seeker", "transcendent", "enlightened"]
          },
          {
            id: 12,
            title: "Guard the Balance",
            description: "Maintain harmony between all forces and protect the innocent",
            icon: "fas fa-balance-scale",
            gradient: "from-teal-500 to-green-500",
            traits: ["guardian", "balanced", "eternal"]
          }
        ]
      }
    ];

    questionsData.forEach((questionData) => {
      const question: Question = {
        id: this.currentQuestionId++,
        ...questionData
      };
      this.questions.set(question.id, question);
    });
  }

  async getQuestionsByStage(stage: number): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(q => q.stage === stage);
  }

  async createQuizSession(session: InsertQuizSession): Promise<QuizSession> {
    const id = this.currentSessionId++;
    const newSession: QuizSession = { id, ...session };
    this.quizSessions.set(id, newSession);
    return newSession;
  }

  async getQuizSession(id: number): Promise<QuizSession | undefined> {
    return this.quizSessions.get(id);
  }

  async updateQuizSession(id: number, choices: number[], completed: number): Promise<QuizSession> {
    const session = this.quizSessions.get(id);
    if (!session) {
      throw new Error("Quiz session not found");
    }
    
    const updatedSession: QuizSession = {
      ...session,
      choices,
      completed
    };
    
    this.quizSessions.set(id, updatedSession);
    return updatedSession;
  }

  async createCharacterResult(result: InsertCharacterResult): Promise<CharacterResult> {
    const id = this.currentResultId++;
    const newResult: CharacterResult = { id, ...result };
    this.characterResults.set(id, newResult);
    return newResult;
  }

  async getCharacterResult(sessionId: number): Promise<CharacterResult | undefined> {
    return Array.from(this.characterResults.values()).find(r => r.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
