// @/lib/actions.ts
"use server";

import { aiHealthChatbotAssistance } from "@/ai/flows/ai-health-chatbot-assistance";

export async function getChatbotResponse(query: string) {
  try {
    const result = await aiHealthChatbotAssistance({ query });
    return { response: result.response };
  } catch (error) {
    console.error(error);
    return { response: "Sorry, I encountered an error. Please try again." };
  }
}
