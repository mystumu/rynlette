import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getDecisions, clearDecisions, exportDecisions, Decision } from '@/utils/wheelStorage';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, Trash2, RotateCcw, FileJson, FileText, File } from 'lucide-react';

const History = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [groupedDecisions, setGroupedDecisions] = useState<Record<string, Decision[]>>({});

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = () => {
    const loadedDecisions = getDecisions();

    loadedDecisions.sort((a, b) => b.timestamp - a.timestamp);
    setDecisions(loadedDecisions);

    const grouped = loadedDecisions.reduce((acc, decision) => {
      if (!acc[decision.wheelId]) {
        acc[decision.wheelId] = [];
      }
      acc[decision.wheelId].push(decision);
      return acc;
    }, {} as Record<string, Decision[]>);

    setGroupedDecisions(grouped);
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
      clearDecisions();
      setDecisions([]);
      setGroupedDecisions({});
      toast.success('Historial borrado');
    }
  };

  const formatDecisionRow = (decision: Decision) =>
    `• [${formatDate(decision.timestamp)}] (${decision.wheelName}): ${decision.result}`;

  const handleExport = (type: 'json' | 'txt' | 'md') => {
    try {
      let dataStr = '';
      let mimeType = '';
      let exportFileDefaultName = '';
      if (type === 'json') {
        dataStr = exportDecisions();
        mimeType = 'application/json';
        exportFileDefaultName = `rynlette-history-${new Date().toISOString().slice(0, 10)}.json`;
      } else if (type === 'txt') {
        dataStr = [
          'Historial de Decisiones Rynlette\n',
          ...decisions.map((decision) =>
            `[${formatDate(decision.timestamp)}] (${decision.wheelName}): ${decision.result}`
          ),
        ].join('\n');
        mimeType = 'text/plain';
        exportFileDefaultName = `rynlette-history-${new Date().toISOString().slice(0, 10)}.txt`;
      } else if (type === 'md') {
        dataStr = [
          '# Historial de Decisiones Rynlette',
          '',
          ...decisions.map(formatDecisionRow),
        ].join('\n');
        mimeType = 'text/markdown';
        exportFileDefaultName = `rynlette-history-${new Date().toISOString().slice(0, 10)}.md`;
      }

      const dataUri = `data:${mimeType};charset=utf-8,` + encodeURIComponent(dataStr);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast.success(`Historial exportado como .${type}`);
    } catch (error) {
      console.error(`Error exporting history as ${type}:`, error);
      toast.error(`Error al exportar el historial (.${type})`);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors">
      <Header />

      <main className="flex-grow flex flex-col py-6 px-4">
        <div className="max-w-screen-lg mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-rynlette-darkPurple dark:text-white">
            Historial de Decisiones
          </h1>
          <div
            className="
              bg-white rounded-lg shadow-md p-4 mb-6
              border
              dark:bg-[#22243a]
              dark:border-[#34354c]
              dark:shadow-[0_2px_10px_0_#0005]
              transition-colors
            "
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <p className="text-muted-foreground mb-4 sm:mb-0">
                {decisions.length} decisiones en total
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
                  onClick={handleClearHistory}
                  disabled={decisions.length === 0}
                >
                  <Trash2 size={16} />
                  <span>Borrar Historial</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10 dark:hover:bg-rynlette-purple/20"
                  onClick={() => handleExport('json')}
                  disabled={decisions.length === 0}
                >
                  <FileJson size={16} />
                  <span>Exportar JSON</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10 dark:hover:bg-rynlette-purple/20"
                  onClick={() => handleExport('txt')}
                  disabled={decisions.length === 0}
                >
                  <FileText size={16} />
                  <span>Exportar TXT</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10 dark:hover:bg-rynlette-purple/20"
                  onClick={() => handleExport('md')}
                  disabled={decisions.length === 0}
                >
                  <File size={16} />
                  <span>Exportar MD</span>
                </Button>
              </div>
            </div>
            {decisions.length === 0 ? (
              <div className="text-center py-16">
                <RotateCcw size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-rynlette-darkPurple dark:text-white">No hay decisiones todavía</h3>
                <p className="text-muted-foreground">Gira algunas ruletas para empezar a registrar tus decisiones.</p>
              </div>
            ) : (
              <ScrollArea className="h-[60vh] rounded-md border p-4 dark:border-[#34354c] dark:bg-[#23243b] transition-colors">
                <div className="space-y-8">
                  {Object.entries(groupedDecisions).map(([wheelId, wheelDecisions]) => (
                    <div
                      key={wheelId}
                      className="animate-fade-in"
                    >
                      <h3 className="text-lg font-medium mb-3 text-rynlette-purple dark:text-rynlette-lightPurple border-b pb-2 border-rynlette-purple/30 dark:border-white/10">
                        {wheelDecisions[0]?.wheelName || 'Ruleta sin nombre'}
                      </h3>
                      <div className="space-y-2">
                        {wheelDecisions.map((decision) => (
                          <div
                            key={decision.id}
                            className="
                              p-3 border rounded-md
                              hover:bg-secondary/50
                              transition-colors
                              animate-slide-up
                              bg-card
                              border-rynlette-purple/10
                              dark:bg-[#292a44]
                              dark:border-[#34354c]
                              dark:hover:bg-[#393b5a]
                            "
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 bg-rynlette-purple rounded-full mr-3"></div>
                                <p className="font-medium text-foreground">{decision.result}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(decision.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
