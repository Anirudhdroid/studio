'use server';

import {
  summarizeDocument,
  type SummarizeDocumentInput,
} from '@/ai/flows/ai-summarization';
import {
  explainClause,
  type ExplainClauseInput,
} from '@/ai/flows/clause-explanations';
import {
  askQuestion,
  type AskQuestionInput,
} from '@/ai/flows/interactive-qa';
import {
  getKeyTermDefinitions,
  type KeyTermDefinitionsInput,
} from '@/ai/flows/key-term-definitions';

export async function generateSummaryAction(input: SummarizeDocumentInput) {
  if (!input.documentText.trim()) {
    throw new Error('Document text cannot be empty.');
  }
  return await summarizeDocument(input);
}

export async function explainClauseAction(input: ExplainClauseInput) {
  if (!input.documentText.trim() || !input.clauseText.trim()) {
    throw new Error('Document and clause text cannot be empty.');
  }
  return await explainClause(input);
}

export async function askQuestionAction(input: AskQuestionInput) {
  if (!input.documentText.trim() || !input.question.trim()) {
    throw new Error('Document and question cannot be empty.');
  }
  return await askQuestion(input);
}

export async function getKeyTermsAction(input: KeyTermDefinitionsInput) {
  if (!input.documentText.trim()) {
    throw new Error('Document text cannot be empty.');
  }
  return await getKeyTermDefinitions(input);
}
