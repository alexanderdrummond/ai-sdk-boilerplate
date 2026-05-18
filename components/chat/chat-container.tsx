"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import { ArrowDown } from "lucide-react";

import { ChatInput } from "@/components/chat/chat-input";
import { MessageList } from "@/components/chat/message-list";

interface ChatContainerProps {
  messages: UIMessage[];
  isStreaming?: boolean;
  onSendMessage: (message: string) => void | Promise<void>;
  onStop?: () => void;
  error?: string;
}

export function ChatContainer({
  messages,
  isStreaming = false,
  onSendMessage,
  onStop,
  error,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAtBottomRef = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
        isAtBottomRef.current = entry.isIntersecting;
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );

    const target = messagesEndRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const scrollParent = messagesEndRef.current?.closest(".overflow-y-auto");
    if (scrollParent) {
      scrollParent.scrollTo({ top: scrollParent.scrollHeight, behavior });
      return;
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom(isStreaming ? "auto" : "smooth");
    }
  }, [messages, isStreaming, scrollToBottom]);

  const isCenteredLanding = messages.length === 0 && !isStreaming;

  if (isCenteredLanding) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4">
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            messagesEndRef={messagesEndRef}
          />
          <div className="mt-4 w-full">
            <ChatInput
              onSend={onSendMessage}
              onStop={onStop}
              isStreaming={isStreaming}
              placeholder="Start typing..."
            />
          </div>
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4">
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          messagesEndRef={messagesEndRef}
        />
      </div>

      <div className="sticky bottom-0 w-full bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent pb-4 pt-10 dark:from-zinc-950 dark:via-zinc-950/90">
        <div className="relative mx-auto w-full max-w-3xl px-4">
          <button
            aria-label="Scroll to bottom"
            className={`absolute -top-12 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 shadow-sm transition-all duration-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 ${
              isAtBottom
                ? "pointer-events-none translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
            onClick={() => scrollToBottom("smooth")}
            type="button"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
          <ChatInput
            onSend={onSendMessage}
            onStop={onStop}
            isStreaming={isStreaming}
            placeholder="Start typing..."
          />
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
