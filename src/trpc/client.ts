// src/trpc/client.ts
import { AppRouter } from '@/app/server/trpc/routers';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();