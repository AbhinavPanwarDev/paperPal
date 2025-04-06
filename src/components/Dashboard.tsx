"use client";

import { format } from "date-fns";
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, MessageSquare, Trash, FileText, Search, Sparkles, ArrowUpRight, FolderOpen } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const utils = trpc.useContext();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
  });
  
  // Generate animated stars
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 3}s`,
    animationDelay: `${Math.random() * 2}s`,
  }));

  return (
    <div className="relative min-h-screen">
      {/* Cosmic background similar to home page */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]"></div>
        <div className="absolute top-0 left-0 w-[50rem] h-[50rem] -translate-x-[60%] -translate-y-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-600/20 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-[50rem] h-[50rem] translate-x-[60%] translate-y-[-40%] rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 translate-y-[30%] rounded-full bg-gradient-to-br from-purple-500/10 to-blue-600/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]"></div>
        
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
      </div>

      <main className="relative mx-auto max-w-7xl px-4 md:px-10 pt-24 pb-20">
        {/* Glowing accent at top of page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-20 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        
        {/* Main header section */}
        <div className="relative mb-16">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-indigo-600/20 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
            <div className="space-y-4 relative">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-blue-500"></div>
                <div className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-500/20 backdrop-blur-sm">
                  <span className="px-3 py-1 text-xs font-medium text-indigo-300 rounded-full">Your Documents</span>
                </div>
              </div>
              
              <div className="flex items-end gap-4 relative">
                <h1 className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">Document Vault</h1>
                <div className="relative bottom-1">
                  <Sparkles className="h-5 w-5 text-indigo-400/70" />
                </div>
              </div>
              
              <p className="text-indigo-200/60 max-w-xl">
                Access and manage all your PDF documents. Chat with them using AI to extract insights and find information quickly.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
              <UploadButton variant="cosmic" />
            </div>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mt-8"></div>
        </div>

        {files && files?.length !== 0 ? (
          <>
            {/* Files section header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-indigo-400" />
                <h2 className="text-xl font-semibold text-white">Your PDFs</h2>
              </div>
              
              <div className="inline-flex items-center gap-1.5 text-indigo-300/80 text-sm border border-indigo-500/20 rounded-full px-4 py-1.5 bg-indigo-950/30">
                <Search className="h-3.5 w-3.5" />
                <span>Showing {files.length} document{files.length === 1 ? '' : 's'}</span>
              </div>
            </div>
          
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {files
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((file, idx) => (
                  <li
                    key={file.id}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-sm border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1"
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    {/* Position these background elements below the link */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-slate-900/80 to-slate-900/90 pointer-events-none"></div>
                    <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                    
                    <Link
                      href={`/dashboard/${file.id}`}
                      className="block relative z-10"
                    >
                      <div className="pt-6 px-6 flex items-center justify-between space-x-6">
                        <div className="relative">
                          <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/20 to-blue-600/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/5">
                            <FileText className="h-6 w-6" />
                            <div className="absolute inset-0 rounded-xl bg-indigo-600/5 animate-pulse opacity-60"></div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full ring-2 ring-slate-900"></div>
                        </div>
                        <div className="flex-1 truncate pl-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="truncate text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
                              {file.name}
                            </h3>
                            <ArrowUpRight className="h-4 w-4 text-indigo-400/60 group-hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-indigo-300/60 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/70"></span>
                              PDF
                            </span>
                            <p className="text-xs text-indigo-300/70">
                              {format(new Date(file.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 mt-4 mb-4">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                      </div>
                    </Link>

                    <div className="px-6 pb-6 flex items-center justify-between relative z-10">
                      <Link 
                        href={`/dashboard/${file.id}`}
                        className="flex items-center gap-2 text-xs font-medium text-indigo-300/80 hover:text-indigo-200 transition-colors group/chat"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </div>
                        <span className="relative">
                          Chat with document
                          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-indigo-400/50 scale-x-0 group-hover/chat:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </span>
                      </Link>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile({ id: file.id });
                        }}
                        size="sm"
                        className="bg-transparent hover:bg-red-500/10 border border-red-500/30 text-red-400/70 hover:text-red-300 rounded-lg w-8 h-8 p-0 relative z-20"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        ) : isLoading ? (
          <div className="mt-20 space-y-8">
            <div className="flex items-center gap-3 mb-8 opacity-60">
              <div className="h-5 w-5 bg-indigo-500/40 rounded animate-pulse"></div>
              <div className="h-8 w-40 bg-indigo-500/40 rounded animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="h-[180px] bg-indigo-950/30 rounded-2xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden flex flex-col"
                >
                  <div className="flex items-center gap-4 p-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/20 animate-pulse"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-indigo-500/30 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-indigo-500/20 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1"></div>
                  <div className="px-6 py-4 border-t border-indigo-500/20 flex justify-between">
                    <div className="h-8 w-28 bg-indigo-500/20 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-8 bg-indigo-500/20 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl opacity-30"></div>
              
              <div className="relative bg-indigo-950/50 backdrop-blur-md p-12 rounded-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 max-w-xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,77,145,0.15),rgba(1,6,19,0.4))]"></div>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                
                <div className="flex flex-col items-center gap-8 relative z-10">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                    <Ghost className="h-12 w-12 text-indigo-300" />
                    <Sparkles className="absolute top-0 right-0 h-5 w-5 text-indigo-400/70" />
                    <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping opacity-50"></div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <h3 className="font-semibold text-2xl text-white">
                      Your document vault is empty
                    </h3>
                    <p className="text-indigo-300/80 text-center max-w-md">
                      Upload your first PDF document to start chatting with it and extracting insights using our powerful AI.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <UploadButton variant="cosmic" />
                    
                    <div className="mt-3 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300/70">
                      Supports PDF files up to 4MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
