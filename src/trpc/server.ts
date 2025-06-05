// src/trpc/server.ts
import { appRouter } from '@/app/server/trpc/routers';
import { createCallerFactory } from '@/app/server/trpc/trpc';

export const createCaller = createCallerFactory(appRouter);

// Esse 'api' é o nome que você precisa exportar:
export const api = createCaller({});
