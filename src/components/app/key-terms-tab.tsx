"use client"

import { WandSparkles, Loader2 } from "lucide-react";
import type { KeyTermDefinitionsOutput } from "@/ai/flows/key-term-definitions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";


export interface KeyTermsTabProps {
  onGenerateKeyTerms: () => void;
  keyTerms: KeyTermDefinitionsOutput;
  isKeyTermsLoading: boolean;
}

export function KeyTermsTab({ onGenerateKeyTerms, keyTerms, isKeyTermsLoading }: KeyTermsTabProps) {
  return (
    <div className="space-y-4">
      <Button onClick={onGenerateKeyTerms} disabled={isKeyTermsLoading} className="w-full sm:w-auto">
        {isKeyTermsLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <WandSparkles className="mr-2 h-4 w-4" />
        )}
        {isKeyTermsLoading ? 'Defining...' : 'Define Key Terms'}
      </Button>
      <ScrollArea className="h-[calc(65vh-6rem)] lg:h-[calc(100%-6rem)] rounded-md border">
        {isKeyTermsLoading && keyTerms.length === 0 && (
          <div className="p-4 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {keyTerms.length > 0 ? (
          <Accordion type="single" collapsible className="w-full p-2 md:p-4">
            {keyTerms.map((item) => (
              <AccordionItem value={item.term} key={item.term}>
                <AccordionTrigger>{item.term}</AccordionTrigger>
                <AccordionContent className="space-y-3 pt-1">
                  <p className="text-sm">{item.definition}</p>
                  {item.contextualExplanation && (
                    <div className="p-3 bg-muted/50 rounded-md border border-muted">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">In this context</h4>
                      <p className="text-sm italic mt-1">{item.contextualExplanation}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          !isKeyTermsLoading && (
            <div className="flex items-center justify-center h-full p-4">
                <p className="text-sm text-center text-muted-foreground">
                    Click "Define Key Terms" to identify and explain<br/>important legal terms in the document.
                </p>
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}
