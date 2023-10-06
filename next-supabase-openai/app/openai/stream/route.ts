import getOpenAIClient from '@/lib/openai-client';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server';
 
// uncomment when https://github.com/vercel/next.js/issues/45371 is fixed
// export const runtime = 'edge';
 
// you can change this to any model you want
const MODEL = 'gpt-3.5-turbo' as const;
 
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
 
  const client = getOpenAIClient();
 
  const response = await client.chat.completions.create({
    model: MODEL,
    stream: true,
    messages: getPromptMessages(prompt),
    max_tokens: 500,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}
 
function getPromptMessages(topic: string) {
  return [
    {
      content: `Given the topic "${topic}", return a list of possible titles for a blog post. Separate each title with a new line.`,
      role: 'user' as const,
    },
  ];
}