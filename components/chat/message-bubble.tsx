import type { UIMessage } from "ai";
import { Streamdown } from "streamdown";

import { TextShimmer } from "@/components/ui/text-shimmer";

interface MessageBubbleProps {
  message: UIMessage;
  isStreaming?: boolean;
}

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const content = getMessageText(message);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-full bg-zinc-200 px-4 py-2 text-sm text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] text-sm leading-relaxed text-zinc-950 dark:text-zinc-50">
        {isStreaming && !content.trim() ? (
          <TextShimmer as="p" className="text-sm">
            Thinking...
          </TextShimmer>
        ) : (
          <Streamdown className="size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {content}
          </Streamdown>
        )}
      </div>
    </div>
  );
}
