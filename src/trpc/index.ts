import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
export const appRouter = router({
  // test: publicProcedure.query(() => {
  //   return "Hiii";
  // }), // publicProcedure.query is essentially a public GET request

  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    //Guard Clause
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    //query to check if the user is in the db or not

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // if no user in db, then we need to create one
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }

    return {success: true}
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
