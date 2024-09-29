import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  test: publicProcedure.query(() => {
    return "Hiii";
  }), // publicProcedure.query is essentially a public GET request
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
