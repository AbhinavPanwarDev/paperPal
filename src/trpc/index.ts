import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
export const appRouter = router({
  // test: publicProcedure.query(() => {
  //   return "Hiii";
  // }), // publicProcedure.query is essentially a public GET request

  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!(await user).id || !(await user).email)
      throw new TRPCError({ code: "UNAUTHORIZED" });

     //query to check if the user is in the db or not
     
    return {success: true}
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
