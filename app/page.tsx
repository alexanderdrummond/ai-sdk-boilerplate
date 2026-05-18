import { ChatClient } from "@/components/chat/chat-client";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <ChatClient />
    </main>
  );
}
