import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

//asd
// import { UTApi } from "uploadthing/server";
// import { NextRequest, NextResponse } from "next/server";

// const utapi = new UTApi();

// export async function GET(request: NextRequest) {
//   const fileKey = request.nextUrl.searchParams.get("fileKey");

//   if (!fileKey) {
//     return NextResponse.json({ error: "File key is required" }, { status: 400 });
//   }

//   try {
//     const signedUrl = await utapi.getSignedURL(fileKey);
//     return NextResponse.json({ url: signedUrl });
//   } catch (error) {
//     console.error("Error generating signed URL:", error);
//     return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
//   }
// }
//asd

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();

      const user = await getUser();

      if (!user) {
        console.error("User not authenticated");
        throw new Error("Unauthorized - User not authenticated");
      }

      if (!user.id) {
        console.error("User missing ID");
        throw new Error("Unauthorized - Missing User ID");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
