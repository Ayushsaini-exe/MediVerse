'use server';
/**
 * @fileOverview An AI-powered chatbot to answer user queries and provide assistance, including retrieving relevant product listings from the catalog.
 *
 * - aiHealthChatbotAssistance - A function that handles the chatbot assistance process.
 * - AIHealthChatbotAssistanceInput - The input type for the aiHealthChatbotAssistance function.
 * - AIHealthChatbotAssistanceOutput - The return type for the aiHealthChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHealthChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type AIHealthChatbotAssistanceInput = z.infer<typeof AIHealthChatbotAssistanceInputSchema>;

const AIHealthChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type AIHealthChatbotAssistanceOutput = z.infer<typeof AIHealthChatbotAssistanceOutputSchema>;

export async function aiHealthChatbotAssistance(input: AIHealthChatbotAssistanceInput): Promise<AIHealthChatbotAssistanceOutput> {
  return aiHealthChatbotAssistanceFlow(input);
}

const productSearchTool = ai.defineTool({
  name: 'searchProducts',
  description: 'Searches for products in the catalog based on keywords.',
  inputSchema: z.object({
    keywords: z.string().describe('Keywords to search for in the product catalog.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of product names that match the keywords.'),
}, async (input) => {
  // TODO: Implement the actual product search logic here.
  // This is a placeholder implementation.
  console.log(`Searching for products with keywords: ${input.keywords}`);
  return [`Product 1 matching ${input.keywords}`, `Product 2 matching ${input.keywords}`];
});

const prompt = ai.definePrompt({
  name: 'aiHealthChatbotAssistancePrompt',
  input: {schema: AIHealthChatbotAssistanceInputSchema},
  output: {schema: AIHealthChatbotAssistanceOutputSchema},
  tools: [productSearchTool],
  prompt: `You are a helpful AI-powered chatbot providing health-related assistance. 

  Your job is to respond to user queries with helpful and informative answers.

  If the user's query contains keywords related to products, use the searchProducts tool to find relevant products in the catalog and include them in your response.
  If the user's query is a greeting, respond in a friendly and conversational manner.
  If the user expresses gratitude, you're welcome to respond with a thank you message.
  If you cannot satisfy the request, indicate so and suggest alternative ways to find information.

  User query: {{{query}}}`,
});

const aiHealthChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'aiHealthChatbotAssistanceFlow',
    inputSchema: AIHealthChatbotAssistanceInputSchema,
    outputSchema: AIHealthChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
