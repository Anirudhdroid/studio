import { Gavel } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="p-4 border-b bg-card">
      <div className="container mx-auto flex items-center gap-3">
        <Gavel className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Legalese Decoder
        </h1>
      </div>
    </header>
  );
}
