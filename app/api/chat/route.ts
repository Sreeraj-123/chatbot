import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai'; // 1. Import this helper

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    // 2. Wrap the messages in the converter
    messages: await convertToModelMessages(messages), 
  });

  return result.toUIMessageStreamResponse();
}