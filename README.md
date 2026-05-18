# AI SDK Chat Boilerplate

A minimal Next.js chat boilerplate using the Vercel AI SDK, a local chat UI, and Streamdown for markdown rendering.

The default setup is provider-neutral through Vercel AI Gateway. You can change models by changing `AI_MODEL`, or replace the model setup in `app/api/chat/route.ts` to call a provider package directly.

## Setup

Install dependencies:

```bash
pnpm install
```

Create `.env.local`:

```bash
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
AI_MODEL=openai/gpt-5.4-mini
```

`AI_MODEL` is optional. The app defaults to `openai/gpt-5.4-mini`.

## Providers

This boilerplate currently uses the AI SDK global model string:

```ts
model: process.env.AI_MODEL ?? "openai/gpt-5.4-mini"
```

With `AI_GATEWAY_API_KEY`, this goes through Vercel AI Gateway. That keeps the starter flexible:

```bash
AI_MODEL=openai/gpt-5.4-mini
AI_MODEL=anthropic/claude-sonnet-4-6
AI_MODEL=google/gemini-3-pro-preview
AI_MODEL=google/gemini-3-flash-preview
```

Find supported providers and model IDs in the AI SDK provider docs:

- [AI SDK Providers](https://ai-sdk.dev/providers/ai-sdk-providers)
- [AI Gateway Provider](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway)
- [Choosing a Provider](https://ai-sdk.dev/docs/getting-started/choosing-a-provider)

### Direct Provider Packages

If you do not want to use AI Gateway, install the provider package and pass its model instance to `streamText`.

For Anthropic:

```bash
pnpm add @ai-sdk/anthropic
```

```ts
import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const result = streamText({
  model: anthropic("claude-sonnet-4-6"),
  messages: await convertToModelMessages(messages),
});
```

Then use Anthropic credentials instead of `AI_GATEWAY_API_KEY`:

```bash
ANTHROPIC_API_KEY=your_anthropic_key
```

Guide: [Anthropic Provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)

### Community Providers

Community providers work the same way: install the provider package, create the provider instance, and pass its model to `streamText`.

For Cloudflare Workers AI:

```bash
pnpm add workers-ai-provider
```

In a Cloudflare Workers runtime, configure an AI binding in `wrangler.toml`:

```toml
[ai]
binding = "AI"
```

Then create the model from the binding:

```ts
import { createWorkersAI } from "workers-ai-provider";

const workersai = createWorkersAI({ binding: env.AI });

const result = streamText({
  model: workersai("@cf/meta/llama-3.1-8b-instruct"),
  messages: await convertToModelMessages(messages),
});
```

Guide: [Cloudflare Workers AI Provider](https://ai-sdk.dev/providers/community-providers/cloudflare-workers-ai)

For other custom providers, start here:

- [Community Providers](https://ai-sdk.dev/providers/ai-sdk-providers#community-providers)
- [Provider & Model Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management)
- [customProvider](https://ai-sdk.dev/docs/reference/ai-sdk-core/custom-provider)

## Development

Run the app:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Files

- `app/page.tsx` renders the one-page chat UI.
- `app/api/chat/route.ts` streams model responses with `streamText`.
- `components/chat/*` contains the local chat UI.
- `components/ui/*` contains the small UI primitives used by the chat.
