import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //making sure user is logged in
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  //making sure user is synced to our database...
  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  // the signed-in users getting redirected to Dashboard component...
  return <Dashboard />
};

export default Page;
