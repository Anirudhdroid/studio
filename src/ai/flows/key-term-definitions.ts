'use server';

/**
 * @fileOverview A flow that identifies and defines key legal terms in a document.
 *
 * - getKeyTermDefinitions - A function that takes a document as input and returns a list of key legal terms with their definitions.
 * - KeyTermDefinitionsInput - The input type for the getKeyTermDefinitions function.
 * - KeyTermDefinitionsOutput - The return type for the getKeyTermDefinitions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KeyTermDefinitionsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document to analyze.'),
});
export type KeyTermDefinitionsInput = z.infer<typeof KeyTermDefinitionsInputSchema>;

const KeyTermDefinitionSchema = z.object({
  term: z.string().describe('The key legal term.'),
  definition: z.string().describe('A clear and concise definition of the term.'),
  contextualExplanation: z
    .string()
    .optional()
    .describe(
      'An optional contextual explanation of the term, tailored to the specific document.'
    ),
});

const KeyTermDefinitionsOutputSchema = z.array(KeyTermDefinitionSchema);
export type KeyTermDefinitionsOutput = z.infer<typeof KeyTermDefinitionsOutputSchema>;

export async function getKeyTermDefinitions(
  input: KeyTermDefinitionsInput
): Promise<KeyTermDefinitionsOutput> {
  return keyTermDefinitionsFlow(input);
}

const keyTermDefinitionsPrompt = ai.definePrompt({
  name: 'keyTermDefinitionsPrompt',
  input: {schema: KeyTermDefinitionsInputSchema},
  output: {schema: KeyTermDefinitionsOutputSchema},
  prompt: `You are an expert legal assistant. Your task is to identify and define key legal terms within a document.

  Analyze the following document and extract a list of key legal terms along with their definitions. For each term, provide a clear and concise definition.
  If a term has a specific meaning within the context of the document, provide a contextual explanation in addition to the standard legal definition.

  Document:
  {{documentText}}
  \n
  Format your response as a JSON array of objects, where each object has 'term', 'definition', and optionally 'contextualExplanation' fields.
  `,
});

const keyTermDefinitionsFlow = ai.defineFlow(
  {
    name: 'keyTermDefinitionsFlow',
    inputSchema: KeyTermDefinitionsInputSchema,
    outputSchema: KeyTermDefinitionsOutputSchema,
  },
  async input => {
    const {output} = await keyTermDefinitionsPrompt(input);
    return output!;
  }
);
