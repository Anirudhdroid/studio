import { Bot } from 'lucide-react';
import { KeyTermsTab, type KeyTermsTabProps } from './key-terms-tab';
import { QaTab, type QaTabProps } from './qa-tab';
import { SummaryTab, type SummaryTabProps } from './summary-tab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AiToolsProps = SummaryTabProps & KeyTermsTabProps & QaTabProps;

export function AiTools(props: AiToolsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6" />
          <CardTitle className="text-xl">AI Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="key-terms">Key Terms</TabsTrigger>
            <TabsTrigger value="q-a">Q&amp;A</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <SummaryTab {...props} />
          </TabsContent>
          <TabsContent value="key-terms" className="mt-4">
            <KeyTermsTab {...props} />
          </TabsContent>
          <TabsContent value="q-a" className="mt-4">
            <QaTab {...props} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
