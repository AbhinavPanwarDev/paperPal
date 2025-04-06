import { Send, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useContext, useRef } from 'react'
import { ChatContext } from './ChatContext'

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const {
    addMessage,
    handleInputChange,
    isLoading,
    message,
  } = useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className='fixed bottom-0 left-0 w-full z-10'>
      <div className='max-w-3xl mx-auto px-4 pb-4'>
        <div className='relative'>
          {/* Gradient glow effect */}
          <div className='absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl opacity-70 blur'></div>
          
          {/* Main container */}
          <div className='relative bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl border border-indigo-500/50 shadow-lg'>
            <div className='flex items-end gap-2'>
              {/* Textarea container */}
              <div className='flex-1 relative'>
                <Textarea
                  rows={1}
                  ref={textareaRef}
                  maxRows={4}
                  autoFocus
                  onChange={handleInputChange}
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      addMessage()
                      textareaRef.current?.focus()
                    }
                  }}
                  placeholder='Ask about your document...'
                  className='resize-none pr-12 py-3 bg-slate-800/50 border-none text-indigo-50 placeholder:text-indigo-200/40 focus:ring-indigo-500/50 rounded-lg scrollbar-thumb-indigo-500 scrollbar-thumb-rounded scrollbar-track-slate-800/50 scrollbar-w-2 scrolling-touch'
                />
                
                {/* Small sparkle icon at bottom left of textarea */}
                <div className='absolute bottom-2 left-2 opacity-30'>
                  <Sparkles className='h-3 w-3 text-indigo-300' />
                </div>
              </div>

              {/* Send button */}
              <Button
                disabled={isLoading || isDisabled}
                aria-label='send message'
                onClick={() => {
                  addMessage()
                  textareaRef.current?.focus()
                }}
                className='relative group overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 p-2 h-auto shadow-md shadow-indigo-500/20 border border-indigo-500/50'
              >
                <span className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                <Send className='h-5 w-5 text-white relative z-10' />
              </Button>
            </div>
            
            {/* Text assistance hint */}
            <div className='mt-1 px-2 flex justify-between items-center'>
              <div className='text-xs text-indigo-300/60'>
                <span className='opacity-60'>Shift + Enter for new line</span>
              </div>
              {isLoading && (
                <div className='flex items-center gap-1.5'>
                  <div className='w-1 h-1 rounded-full bg-indigo-400/70 animate-pulse'></div>
                  <div className='w-1 h-1 rounded-full bg-indigo-400/70 animate-pulse delay-75'></div>
                  <div className='w-1 h-1 rounded-full bg-indigo-400/70 animate-pulse delay-150'></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput