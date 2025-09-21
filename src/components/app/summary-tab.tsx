"use client"

import { WandSparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export interface SummaryTabProps {
  onGenerateSummary: () => void;
  summary: string;
  isSummaryLoading: boolean;
}

export function SummaryTab({ onGenerateSummary, summary, isSummaryLoading }: SummaryTabProps) {
  return (
    <div className="space-y-4">
      <Button onClick={onGenerateSummary} disabled={isSummaryLoading} className="w-full sm:w-auto">
        {isSummaryLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <WandSparkles className="mr-2 h-4 w-4" />
        )}
        {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
      </Button>
      <ScrollArea className="h-[calc(65vh-6rem)] lg:h-[calc(100%-6rem)] rounded-md border p-4">
        {isSummaryLoading && !summary && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[92%]" />
          </div>
        )}
        {summary ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
        ) : (
          !isSummaryLoading && (
            <div className="flex items-center justify-center h-full">
                <p className="text-sm text-center text-muted-foreground">
                    Click "Generate Summary" to get a plain English<br/>overview of the document.
                </p>
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}
