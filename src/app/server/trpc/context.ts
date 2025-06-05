// src/server/trpc/context.ts
import { inferAsyncReturnType } from '@trpc/server';

export async function createContext() {
  return {
    // Context object
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;