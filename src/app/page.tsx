"use client";

import { useState } from "react";
import type { KeyTermDefinitionsOutput } from "@/ai/flows/key-term-definitions";
import {
  askQuestionAction,
  explainClauseAction,
  generateSummaryAction,
  getKeyTermsAction,
} from "@/app/actions";
import { AppHeader } from "@/components/app/app-header";
import { AiTools } from "@/components/app/ai-tools";
import { ClauseExplanationDialog } from "@/components/app/clause-explanation-dialog";
import { DocumentViewer } from "@/components/app/document-viewer";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_LEGAL_DOCUMENT } from "@/lib/legal-document";

type QAPair = {
  question: string;
  answer: string | null;
  isLoading: boolean;
};

export default function Home() {
  const { toast } = useToast();

  // State management
  const [documentText, setDocumentText] = useState(SAMPLE_LEGAL_DOCUMENT);
  const [summary, setSummary] = useState("");
  const [keyTerms, setKeyTerms] = useState<KeyTermDefinitionsOutput>([]);
  const [qaHistory, setQaHistory] = useState<QAPair[]>([]);
  const [selectedClause, setSelectedClause] = useState("");
  const [clauseExplanation, setClauseExplanation] = useState("");

  // Loading states
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isKeyTermsLoading, setIsKeyTermsLoading] = useState(false);
  const [isClauseLoading, setIsClauseLoading] = useState(false);
  const [isClauseModalOpen, setIsClauseModalOpen] = useState(false);

  const handleError = (feature: string) => {
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: `Failed to generate ${feature}. Please try again.`,
    });
  };

  // Handlers for AI actions
  const handleGenerateSummary = async () => {
    if (!documentText.trim()) return;
    setIsSummaryLoading(true);
    setSummary("");
    try {
      const result = await generateSummaryAction({ documentText });
      setSummary(result.summary);
    } catch (error) {
      handleError("summary");
      console.error("Summary failed:", error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleGenerateKeyTerms = async () => {
    if (!documentText.trim()) return;
    setIsKeyTermsLoading(true);
    setKeyTerms([]);
    try {
      const result = await getKeyTermsAction({ documentText });
      setKeyTerms(result);
    } catch (error) {
      handleError("key terms");
      console.error("Key terms failed:", error);
    } finally {
      setIsKeyTermsLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!documentText.trim() || !question.trim()) return;
    
    const newHistory: QAPair[] = [...qaHistory, { question, answer: null, isLoading: true }];
    setQaHistory(newHistory);

    try {
      const result = await askQuestionAction({ documentText, question });
      setQaHistory(prev => prev.map((qa, i) => i === prev.length - 1 ? {...qa, answer: result.answer, isLoading: false} : qa));
    } catch (error) {
      handleError("answer");
      console.error("Q&A failed:", error);
      setQaHistory(prev => prev.map((qa, i) => i === prev.length - 1 ? {...qa, answer: "Sorry, I couldn't get an answer.", isLoading: false} : qa));
    }
  };

  const handleExplainClause = async (clause: string) => {
    if (!documentText.trim() || !clause.trim()) return;
    setSelectedClause(clause);
    setIsClauseLoading(true);
    setClauseExplanation("");
    setIsClauseModalOpen(true);
    try {
      const result = await explainClauseAction({ documentText, clauseText: clause });
      setClauseExplanation(result.explanation);
    } catch (error) {
      handleError("clause explanation");
      console.error("Clause explanation failed:", error);
      setClauseExplanation("Sorry, I couldn't generate an explanation for this clause.");
    } finally {
      setIsClauseLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 lg:p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-full items-start">
          <DocumentViewer
            documentText={documentText}
            onDocumentTextChange={setDocumentText}
            onExplainClause={handleExplainClause}
            isClauseLoading={isClauseLoading}
          />
          <AiTools
            summary={summary}
            isSummaryLoading={isSummaryLoading}
            onGenerateSummary={handleGenerateSummary}
            keyTerms={keyTerms}
            isKeyTermsLoading={isKeyTermsLoading}
            onGenerateKeyTerms={handleGenerateKeyTerms}
            qaHistory={qaHistory}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      </main>
      <ClauseExplanationDialog
        isOpen={isClauseModalOpen}
        onOpenChange={setIsClauseModalOpen}
        clause={selectedClause}
        explanation={clauseExplanation}
        isLoading={isClauseLoading}
      />
    </div>
  );
}
