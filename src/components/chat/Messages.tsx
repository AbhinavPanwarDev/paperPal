import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Message from "./Message";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext);

  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    );

  const messages = data?.pages.flatMap((page) => page.messages);

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
      </span>
    ),
  };

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  return (
    <div className="flex max-h-[calc(100vh-10rem)] flex-1 flex-col-reverse gap-6 p-4 pt-8 overflow-y-auto scrollbar-thumb-indigo-500 scrollbar-thumb-rounded scrollbar-track-slate-800/30 scrollbar-w-2 scrolling-touch">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;

          return (
            <Message
              message={message}
              isNextMessageSamePerson={isNextMessageSamePerson}
              key={message.id}
            />
          );
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-end gap-2">
            <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 animate-pulse">
              <div className="h-3 w-3 rounded-full bg-indigo-500/30"></div>
            </div>
            <div className="flex flex-col gap-2 max-w-md">
              <div className="h-14 w-64 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-end justify-end gap-2">
            <div className="flex flex-col gap-2 max-w-md">
              <div className="h-10 w-40 rounded-lg bg-indigo-600/20 backdrop-blur-sm border border-indigo-500/30 animate-pulse"></div>
            </div>
            <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-600/30 backdrop-blur-sm border border-indigo-500/50 animate-pulse">
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 animate-pulse">
              <div className="h-3 w-3 rounded-full bg-indigo-500/30"></div>
            </div>
            <div className="flex flex-col gap-2 max-w-md">
              <div className="h-20 w-80 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-lg opacity-70"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20 backdrop-blur-sm border border-indigo-500/30 shadow-lg">
              <MessageSquare className="h-8 w-8 text-indigo-300" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-indigo-300/70" />
            </div>
          </div>
          <h3 className="font-semibold text-xl text-white">
            Start the conversation
          </h3>
          <p className="text-indigo-300/70 text-sm text-center max-w-sm">
            Ask questions about your document to get instant answers and insights.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
