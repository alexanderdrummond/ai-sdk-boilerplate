# AI SDK Chat Boilerplate

A minimal Next.js chat boilerplate using the Vercel AI SDK, a local chat UI, and Streamdown for markdown rendering.

## Setup

Install dependencies:

```bash
pnpm install
```

Create `.env.local`:

```bash
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
AI_MODEL=openai/gpt-5-mini
```

`AI_MODEL` is optional. The app defaults to `openai/gpt-5-mini`.

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