import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSessionSchema, insertCharacterResultSchema } from "@shared/schema";
import { calculateCharacter } from "../client/src/lib/character-calculator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get questions for a specific stage
  app.get("/api/questions/:stage", async (req, res) => {
    try {
      const stage = parseInt(req.params.stage);
      if (isNaN(stage) || stage < 1 || stage > 4) {
        return res.status(400).json({ message: "Invalid stage number" });
      }
      
      const questions = await storage.getQuestionsByStage(stage);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Create a new quiz session
  app.post("/api/quiz/start", async (req, res) => {
    try {
      const { mbtiType } = req.body;
      const sessionData = insertQuizSessionSchema.parse({
        choices: [],
        completed: 0,
        mbtiType: mbtiType || null
      });
      
      const session = await storage.createQuizSession(sessionData);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to create quiz session" });
    }
  });

  // Update quiz session with new choice
  app.patch("/api/quiz/:sessionId", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const { choiceId, stage } = req.body;
      
      if (isNaN(sessionId) || !choiceId || !stage) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const session = await storage.getQuizSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Quiz session not found" });
      }

      const updatedChoices = [...session.choices, choiceId];
      const completed = stage >= 4 ? 1 : 0;
      
      const updatedSession = await storage.updateQuizSession(
        sessionId,
        updatedChoices,
        completed
      );
      
      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to update quiz session" });
    }
  });

  // Get quiz session
  app.get("/api/quiz/:sessionId", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const session = await storage.getQuizSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Quiz session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz session" });
    }
  });

  // Calculate and store character result
  app.post("/api/character/calculate", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      const session = await storage.getQuizSession(sessionId);
      if (!session || !session.completed) {
        return res.status(400).json({ message: "Quiz session not completed" });
      }

      // Check if result already exists
      const existingResult = await storage.getCharacterResult(sessionId);
      if (existingResult) {
        return res.json(existingResult);
      }

      // Calculate character based on choices
      const characterData = calculateCharacter(session.choices, session.mbtiType || undefined);
      
      const resultData = insertCharacterResultSchema.parse({
        sessionId,
        categories: characterData.categories,
        attributes: characterData.attributes,
        description: characterData.description,
        characterNumber: characterData.characterNumber,
        statusTitle: characterData.statusTitle
      });
      
      const result = await storage.createCharacterResult(resultData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate character" });
    }
  });

  // Get character result
  app.get("/api/character/:sessionId", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const result = await storage.getCharacterResult(sessionId);
      
      if (!result) {
        return res.status(404).json({ message: "Character result not found" });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
