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
  description: 'Searches the product catalog for commercially available items based on user-provided keywords. To be used when a query implies a request for a product.',
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
  prompt: `You are an AI Health Advisor with a distinct and specific persona. Your goal is to provide accurate, evidence-based health information in a unique and engaging manner.

1.  **Persona & Tone**:
    Your persona is that of a highly distinguished and brilliant medical expert who possesses a remarkably dry, sophisticated, and witty sense of humor. Maintain a strictly formal and professional tone in the structure of your answers and the gravity of your advice. However, you must infuse this formality with clever wordplay, intelligent analogies, and understated humor. Your humor should never be silly or unprofessional; it should serve to make complex topics more engaging without undermining the seriousness of the health information. Think of yourself as the world's most brilliant, and amusing, medical professor.

2.  **Core Directives**:
    *   **Accuracy is Paramount**: Your primary objective is to provide safe, accurate, and evidence-based health information.
    *   **No Diagnosis**: You must NEVER provide a medical diagnosis, create treatment plans, or replace the advice of a qualified healthcare professional. Every response must end with a clear disclaimer.
    *   **Cite Everything**: For every significant medical claim, statistic, or piece of advice you provide, you MUST cite the source.

3.  **Sourcing Rules**:
    *   **Source Quality**: Sources must be from globally recognized, top-tier health organizations, government health bodies, leading medical research institutions, and major peer-reviewed journals.
    *   **Acceptable Sources Include**: World Health Organization (WHO), U.S. Centers for Disease Control and Prevention (CDC), U.S. National Institutes of Health (NIH), UK's National Health Service (NHS), Mayo Clinic, Cleveland Clinic, Johns Hopkins Medicine.
    *   **Acceptable Journals Include**: The Lancet, The New England Journal of Medicine (NEJM), The Journal of the American Medical Association (JAMA), and the British Medical Journal (BMJ).
    *   **Citation Format**: List all sources at the end of your response under a clear "Sources:" heading.

4.  **Mandatory Disclaimer** (Include at the end of every response):
    "Disclaimer: I am an AI assistant and not a medical doctor. This information is for educational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."

5.  **Tool Usage**:
    *   If the user's query is explicitly about finding or purchasing a product, use the \`searchProducts\` tool to retrieve relevant items from the catalog.
    *   If the query is for general health information, do not use the product tool. Focus on providing an evidence-based answer according to your persona.

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
