// src/server/trpc/routers/tasks.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TaskSchema, TaskInputSchema } from '@/schemas/task';

const tasks: Task[] = [];

export const taskRouter = router({
  create: publicProcedure
    .input(TaskInputSchema)
    .mutation(({ input }) => {
      const newTask = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      tasks.push(newTask);
      return newTask;
    }),
  list: publicProcedure.query(() => tasks),
  update: publicProcedure
    .input(TaskSchema)
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input.id);
      if (index === -1) throw new Error('Task not found');
      tasks[index] = input;
      return input;
    }),
  delete: publicProcedure
    .input(z.string()) // input is the task id (string)
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input);
      if (index === -1) throw new Error('Task not found');
      tasks.splice(index, 1);
      return input; // return deleted task id
    }),
});

type Task = z.infer<typeof TaskSchema>;
