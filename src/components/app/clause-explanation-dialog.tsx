"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface ClauseExplanationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  clause: string;
  explanation: string;
  isLoading: boolean;
}

export function ClauseExplanationDialog({
  isOpen,
  onOpenChange,
  clause,
  explanation,
  isLoading,
}: ClauseExplanationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Clause Explanation</DialogTitle>
          <DialogDescription>
            An AI-powered explanation of the selected clause.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-muted-foreground">Selected Clause:</h4>
            <blockquote className="text-sm p-3 bg-muted rounded-md border-l-4 border-muted-foreground/20 italic">
              {clause}
            </blockquote>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-muted-foreground">Explanation:</h4>
            <div className="h-[250px] w-full rounded-md border p-3">
              <ScrollArea className="h-full">
                {isLoading ? (
                   <div className="space-y-3 pr-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[90%]" />
                      <Skeleton className="h-4 w-[95%]" />
                      <Skeleton className="h-4 w-[80%]" />
                   </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{explanation}</p>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
