"use client";

import { useRef, useState, type RefObject } from "react";
import { FileText, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface DocumentViewerProps {
  documentText: string;
  onDocumentTextChange: (text: string) => void;
  onExplainClause: (clause: string) => void;
  isClauseLoading: boolean;
}

export function DocumentViewer({
  documentText,
  onDocumentTextChange,
  onExplainClause,
  isClauseLoading,
}: DocumentViewerProps) {
  const [selectedText, setSelectedText] = useState("");
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const handleSelectionChange = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value.substring(start, end);
      setSelectedText(text);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <CardTitle className="text-xl">Your Document</CardTitle>
            </div>
            <Button
                size="sm"
                onClick={() => onExplainClause(selectedText)}
                disabled={!selectedText.trim() || isClauseLoading}
            >
                {isClauseLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <WandSparkles className="mr-2 h-4 w-4" />
                )}
                Explain Selection
            </Button>
        </div>
        <CardDescription>
            Select any text to get a plain English explanation.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Textarea
          ref={textAreaRef}
          value={documentText}
          onChange={(e) => onDocumentTextChange(e.target.value)}
          onSelect={handleSelectionChange}
          placeholder="Paste or upload your legal document here."
          className="flex-1 w-full text-sm leading-relaxed resize-none h-[65vh] lg:h-auto"
        />
      </CardContent>
    </Card>
  );
}
