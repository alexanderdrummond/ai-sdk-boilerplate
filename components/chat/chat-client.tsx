"use client";

import { useChat } from "@ai-sdk/react";

import { ChatContainer } from "@/components/chat/chat-container";

export function ChatClient() {
  const { messages, sendMessage, status, stop, error } = useChat();
  const isStreaming = status === "submitted" || status === "streaming";

  return (
    <ChatContainer
      messages={messages}
      isStreaming={isStreaming}
      onSendMessage={(message) => sendMessage({ text: message })}
      onStop={stop}
      error={error?.message}
    />
  );
}
