// src/server/trpc/routers/index.ts
import { router } from '../trpc';
import { taskRouter } from './tasks';

export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;