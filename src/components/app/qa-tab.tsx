"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2 } from "lucide-react";

type QAPair = {
  question: string;
  answer: string | null;
  isLoading: boolean;
};

export interface QaTabProps {
  onAskQuestion: (question: string) => Promise<void>;
  qaHistory: QAPair[];
}

export function QaTab({ onAskQuestion, qaHistory }: QaTabProps) {
  const [question, setQuestion] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    const currentQuestion = question;
    setQuestion("");
    await onAskQuestion(currentQuestion);
  };
  
  const isLastMessageLoading = qaHistory.length > 0 && qaHistory[qaHistory.length - 1].isLoading;

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [qaHistory]);


  return (
    <div className="flex flex-col h-[calc(65vh-4rem)] lg:h-[calc(100%-4rem)]">
      <ScrollArea className="flex-1 -mx-4" ref={scrollAreaRef}>
        <div className="px-4 pb-4 space-y-6">
            {qaHistory.length === 0 ? (
                <div className="flex items-center justify-center h-full pt-16">
                    <p className="text-sm text-center text-muted-foreground">
                        Ask a specific question about the document, e.g.,<br />"What is the term of this agreement?"
                    </p>
                </div>
            ) : (
                qaHistory.map((qa, index) => (
                <div key={index} className="space-y-4">
                    <div className="flex items-start gap-3 justify-end">
                        <div className="bg-muted p-3 rounded-lg max-w-[85%]">
                            <p className="text-sm">{qa.question}</p>
                        </div>
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[85%]">
                            {qa.isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="typing-indicator" />
                                </div>
                            ) : (
                                <p className="text-sm whitespace-pre-wrap">{qa.answer}</p>
                            )}
                        </div>
                    </div>
                </div>
                ))
            )}
        </div>
      </ScrollArea>
      <form onSubmit={handleAsk} className="flex items-center gap-2 pt-4 border-t">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          disabled={isLastMessageLoading}
        />
        <Button type="submit" size="icon" disabled={!question.trim() || isLastMessageLoading}>
            {isLastMessageLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
