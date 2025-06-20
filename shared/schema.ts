import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  stage: integer("stage").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  choices: jsonb("choices").$type<Choice[]>().notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  choices: jsonb("choices").$type<number[]>().notNull(),
  completed: integer("completed").default(0),
});

export const characterResults = pgTable("character_results", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  categories: jsonb("categories").$type<string[]>().notNull(),
  attributes: jsonb("attributes").$type<CharacterAttributes>().notNull(),
  description: text("description").notNull(),
});

export interface Choice {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  traits: string[];
}

export interface CharacterAttributes {
  strength: number;
  wisdom: number;
  agility: number;
  mysticism: number;
}

export interface QuizSession {
  id: number;
  choices: number[];
  completed: number;
}

export interface CharacterResult {
  id: number;
  sessionId: number;
  categories: string[];
  attributes: CharacterAttributes;
  description: string;
}

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({
  id: true,
});

export const insertCharacterResultSchema = createInsertSchema(characterResults).omit({
  id: true,
});

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type InsertCharacterResult = z.infer<typeof insertCharacterResultSchema>;
export type Question = typeof questions.$inferSelect;
