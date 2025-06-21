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
        title: "古き森の分かれ道で、あなたに呼びかけるものは？",
        description: "選ぶ道があなたの運命を決める。直感に従って...",
        choices: [
          {
            id: 1,
            title: "燃える炎",
            description: "樹々の間で踊る神秘的な炎の暖かさに導かれる",
            icon: "fas fa-fire",
            gradient: "from-red-500 to-orange-500",
            traits: ["warrior", "passionate", "direct"]
          },
          {
            id: 2,
            title: "ささやく影",
            description: "闇に隠された古代の秘密に耳を傾ける",
            icon: "fas fa-eye",
            gradient: "from-blue-500 to-purple-500",
            traits: ["mystic", "intuitive", "mysterious"]
          },
          {
            id: 3,
            title: "生きる道",
            description: "自然そのものがあなたの歩みを導く場所を歩む",
            icon: "fas fa-leaf",
            gradient: "from-green-500 to-emerald-500",
            traits: ["guardian", "harmonious", "balanced"]
          }
        ]
      },
      {
        stage: 2,
        title: "傷ついた旅人があなたの道を塞ぎ、助けを求めている。どう応える？",
        description: "あなたの選択が本質を明かす...",
        choices: [
          {
            id: 4,
            title: "即座の行動",
            description: "躊躇なく駆け寄り、あなたの技能で助ける",
            icon: "fas fa-heart",
            gradient: "from-red-500 to-pink-500",
            traits: ["healer", "compassionate", "selfless"]
          },
          {
            id: 5,
            title: "慎重な観察",
            description: "状況を注意深く観察してから対応を決める",
            icon: "fas fa-search",
            gradient: "from-yellow-500 to-orange-500",
            traits: ["scholar", "analytical", "wise"]
          },
          {
            id: 6,
            title: "守護の警戒",
            description: "助けながらも周囲の脅威を警戒して立つ",
            icon: "fas fa-shield",
            gradient: "from-blue-500 to-indigo-500",
            traits: ["guardian", "vigilant", "protective"]
          }
        ]
      },
      {
        stage: 3,
        title: "未知の力を放つ古代の遺物を発見した。何があなたを惹きつける？",
        description: "遺物はあなたの最も深い本質に反応する...",
        choices: [
          {
            id: 7,
            title: "純粋な力",
            description: "来るべき戦いであなたに授けるであろう強さを感じる",
            icon: "fas fa-bolt",
            gradient: "from-purple-500 to-red-500",
            traits: ["destroyer", "ambitious", "powerful"]
          },
          {
            id: 8,
            title: "隠された知識",
            description: "それに宿る古代の知恵と秘密を感じ取る",
            icon: "fas fa-scroll",
            gradient: "from-blue-500 to-cyan-500",
            traits: ["sage", "seeker", "enlightened"]
          },
          {
            id: 9,
            title: "護りのオーラ",
            description: "大切なものを守り抜く力を感じる",
            icon: "fas fa-gem",
            gradient: "from-green-500 to-blue-500",
            traits: ["protector", "nurturing", "stable"]
          }
        ]
      },
      {
        stage: 4,
        title: "最後の試練：あなたの伝説を決める選択。究極の目標は？",
        description: "この瞬間があなたの真の目的を結晶化させる...",
        choices: [
          {
            id: 10,
            title: "伝説を築く",
            description: "時を超えて語り継がれる伝説となる",
            icon: "fas fa-crown",
            gradient: "from-amber-500 to-yellow-500",
            traits: ["legend", "ambitious", "eternal"]
          },
          {
            id: 11,
            title: "究極の真理を求める",
            description: "存在そのものの最深の謎を解き明かす",
            icon: "fas fa-star",
            gradient: "from-indigo-500 to-purple-500",
            traits: ["seeker", "transcendent", "enlightened"]
          },
          {
            id: 12,
            title: "均衡を守る",
            description: "全ての力の調和を保ち、無垢な者を守り抜く",
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
