'use server';

/**
 * @fileOverview A clause explanation AI agent.
 *
 * - explainClause - A function that handles the clause explanation process.
 * - ExplainClauseInput - The input type for the explainClause function.
 * - ExplainClauseOutput - The return type for the explainClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainClauseInputSchema = z.object({
  documentText: z.string().describe('The entire text of the legal document.'),
  clauseText: z.string().describe('The specific clause the user wants explained.'),
});
export type ExplainClauseInput = z.infer<typeof ExplainClauseInputSchema>;

const ExplainClauseOutputSchema = z.object({
  explanation: z.string().describe('A plain-English explanation of the clause and its implications.'),
});
export type ExplainClauseOutput = z.infer<typeof ExplainClauseOutputSchema>;

export async function explainClause(input: ExplainClauseInput): Promise<ExplainClauseOutput> {
  return explainClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainClausePrompt',
  input: {schema: ExplainClauseInputSchema},
  output: {schema: ExplainClauseOutputSchema},
  prompt: `You are an expert legal assistant specializing in explaining legal clauses in plain English.

You will be provided with the full text of a legal document, as well as a specific clause from that document that the user wants explained. Your task is to provide a clear and concise explanation of the clause, its meaning, and its implications, suitable for someone who is not a legal expert.

Full Document Text:
{{documentText}}

Clause to Explain:
{{clauseText}}`,
});

const explainClauseFlow = ai.defineFlow(
  {
    name: 'explainClauseFlow',
    inputSchema: ExplainClauseInputSchema,
    outputSchema: ExplainClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
