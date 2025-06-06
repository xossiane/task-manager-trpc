import { appRouter } from '@/server/trpc/routers';
import { createCallerFactory } from '@/server/trpc/trpc';

export const createCaller = createCallerFactory(appRouter);


export const api = createCaller({});
