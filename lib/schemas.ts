import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1),
});

export const updateNoteSchema = z.object({
  content: z.string(),
});

export const searchSchema = z.object({
  q: z.string().min(1),
});
