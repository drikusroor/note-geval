import { z } from "zod";

const envSchema = z.object({
  NOTES_AUTH_PASSWORD: z.string().min(1),
  NOTES_DIR: z.string().min(1),
  JWT_SECRET: z.string().min(8),
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse({
  NOTES_AUTH_PASSWORD: process.env.NOTES_AUTH_PASSWORD,
  NOTES_DIR: process.env.NOTES_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});
