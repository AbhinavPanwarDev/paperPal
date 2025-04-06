"use client";

import { ChevronLeft, Link, Loader2, XCircle } from "lucide-react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./ChatContext";
import { useState, useEffect } from "react";

interface ChatWrapperProps {
  fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 1000,
    }
  );

  // Generate animated stars for the background
  const stars = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 3}s`,
    animationDelay: `${Math.random() * 2}s`,
  }));

  if (isLoading)
    return (
      <div className='relative min-h-full bg-slate-950 flex flex-col justify-between gap-2'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]'></div>
        
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
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
        
        <div className='relative flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-4 animate-in fade-in duration-500'>
            <div className='relative'>
              <div className='absolute inset-0 blur-xl bg-indigo-400/30 rounded-full' />
              <Loader2 className='h-10 w-10 text-indigo-400 animate-spin relative z-10' />
            </div>
            <h3 className='font-semibold text-xl text-white'>
              Loading...
            </h3>
            <p className='text-indigo-300/80 text-sm px-8 text-center'>
              We&apos;re preparing your PDF for the best experience.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === 'PROCESSING')
    return (
      <div className='relative min-h-full bg-slate-950 flex flex-col justify-between gap-2'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]'></div>
        
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
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
        
        <div className='relative flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-4 animate-pulse'>
            <div className='relative'>
              <div className='absolute inset-0 blur-xl bg-indigo-500/30 rounded-full animate-pulse' />
              <Loader2 className='h-10 w-10 text-indigo-400 animate-spin relative z-10' />
            </div>
            <h3 className='font-semibold text-xl bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
              Processing PDF...
            </h3>
            <p className='text-indigo-300/80 text-sm px-8 text-center'>
              We&apos;re analyzing your document for seamless interaction.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

    
  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-slate-950 flex flex-col justify-between gap-2">
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]'></div>
        
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
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
        
        <div className="relative flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <div className='relative'>
              <div className='absolute inset-0 blur-lg bg-red-500/20 rounded-full' />
              <XCircle className="h-10 w-10 text-red-400 relative z-10" />
            </div>
            <h3 className="font-semibold text-xl text-red-400">Processing Failed</h3>
            <p className="text-indigo-300/80 text-sm px-8 text-center">
              We encountered an error while processing your document.
            </p>
            <Link
              href="/dashboard"
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2 text-white font-medium shadow-lg shadow-indigo-500/30 border border-indigo-500/50 hover:shadow-indigo-500/40 transition-all duration-300 mt-4"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1.5" />
                Return to Dashboard
              </span>
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

    return (
      <ChatContextProvider fileId={fileId}>
        <div className='relative min-h-full bg-slate-950 flex flex-col'>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]'></div>
          <div className='absolute inset-0 bg-[size:20px_20px] opacity-20' style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)' }}></div>
          
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
                animationDuration: star.animationDuration,
                animationDelay: star.animationDelay,
              }}
            />
          ))}
          
          <div className='flex-1 flex flex-col justify-between relative'>
            <div className='h-full overflow-y-auto pb-32'>
              <Messages fileId={fileId} />
            </div>
            <div className='relative mt-auto'>
              <div className='absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pointer-events-none'></div>
              <div className='relative'>
                <ChatInput />
              </div>
            </div>
          </div>
        </div>
      </ChatContextProvider>
    )
};

export default ChatWrapper;
