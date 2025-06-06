import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TaskSchema, TaskInputSchema } from '@/schemas/task';

type Task = z.infer<typeof TaskSchema>;


const tasks: Task[] = [];

export const taskRouter = router({
  list: publicProcedure.query(() => tasks),

  create: publicProcedure
    .input(TaskInputSchema)
    .mutation(({ input }) => {
      const newTask: Task = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      tasks.push(newTask);
      return newTask;
    }),

  update: publicProcedure
    .input(TaskInputSchema.extend({ id: z.string() }))
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input.id);
      if (index === -1) throw new Error('Task not found');

      tasks[index] = {
        ...tasks[index],
        ...input,
      };

      return tasks[index];
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input);
      if (index === -1) throw new Error('Task not found');
      tasks.splice(index, 1);
      return input;
    }),

  get: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      const task = tasks.find((t) => t.id === input);
      if (!task) throw new Error('Task not found');
      return task;
    }),
});
