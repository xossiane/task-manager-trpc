// src/schemas/task.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const TaskInputSchema = TaskSchema.omit({ id: true, createdAt: true });
