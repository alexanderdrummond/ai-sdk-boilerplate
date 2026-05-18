"use client";

import type { RefObject } from "react";
import type { UIMessage } from "ai";

import { MessageBubble } from "@/components/chat/message-bubble";

interface MessageListProps {
  messages: UIMessage[];
  isStreaming?: boolean;
  messagesEndRef?: RefObject<HTMLDivElement | null>;
}

export function MessageList({
  messages,
  isStreaming = false,
  messagesEndRef,
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-3xl font-normal text-zinc-950 dark:text-zinc-50">
          New chat
        </h1>
        <p className="mt-2 text-xl font-normal text-zinc-500 dark:text-zinc-400">
          How can I help you today?
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col gap-6 py-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={isStreaming && index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} className="h-px w-full" />
      </div>
    </div>
  );
}
