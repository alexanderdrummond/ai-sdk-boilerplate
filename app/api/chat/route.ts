import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
      model: process.env.AI_MODEL ?? "openai/gpt-5.4-mini",
      messages: await convertToModelMessages(messages),
      system:
        "You are a concise, helpful assistant. Use clear markdown when it improves readability.",
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      {
        error: "Failed to process chat request",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
