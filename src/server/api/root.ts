import { createTRPCRouter } from "@/server/api/trpc";
import { weatherBitRouter } from "./routers/weatherbit";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  weather: weatherBitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
