import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  //retrieving the file-id
  const { fileid } = params;

  //make the db call
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });
  if (!file) notFound(); //shows 404 if not file is found

  // Generate a few stars with different positions for the background
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)] relative bg-slate-950 overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,94,255,0.15),rgba(10,10,35,0.4))] opacity-50"></div>
      <div className="absolute inset-0 bg-[size:20px_20px] opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)' }}></div>
      
      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: 0.5,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] lg:w-96 border-l border-indigo-500/20 bg-gradient-to-r from-slate-950 to-slate-900/90">
          <ChatWrapper fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
