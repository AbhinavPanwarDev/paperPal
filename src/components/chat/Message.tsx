import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from "../ui/Icons";
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'


interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}

const Message = ({ message, isNextMessageSamePerson }: MessageProps) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": message.isUserMessage,
      })}
    >
      <div
        className={cn(
          "relative flex h-8 w-8 aspect-square items-center justify-center", {
            "order-2 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md shadow-indigo-500/10": message.isUserMessage,
            "order-1 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700/80 shadow-md": !message.isUserMessage,
            "invisible": isNextMessageSamePerson,
          }
        )}
      >
        {message.isUserMessage ? (
          <Icons.user className="fill-white text-white h-4 w-4" />
        ) : (
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
            <Icons.logo className="fill-white h-3 w-3" />
          </div>
        )}
      </div>

      <div
        className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
          "order-1 items-end": message.isUserMessage,
          "order-2 items-start": !message.isUserMessage,
        })}
      >
        <div
          className={cn("px-4 py-2 rounded-2xl", {
            "bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/10": message.isUserMessage,
            "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-indigo-50 shadow-md": !message.isUserMessage,
            "rounded-br-none": !isNextMessageSamePerson && message.isUserMessage,
            "rounded-bl-none": !isNextMessageSamePerson && !message.isUserMessage,
          })}
        >
           {typeof message.text === 'string' ? (
              <ReactMarkdown
                className={cn('prose', {
                  'prose-invert': true,
                  'text-indigo-50': !message.isUserMessage,
                })}>
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message.id !== 'loading-message' ? (
              <div
                className={cn(
                  'text-xs select-none mt-2 w-full text-right',
                  {
                    'text-indigo-300/70': !message.isUserMessage,
                    'text-blue-200/80': message.isUserMessage,
                  }
                )}>
                {format(
                  new Date(message.createdAt),
                  'HH:mm'
                )}
              </div>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
