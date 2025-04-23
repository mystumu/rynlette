
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSavedWheels, deleteWheel, SavedWheel } from '@/utils/wheelStorage';
import { Settings, Trash2, Clock, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

interface LoadWheelDialogProps {
  onLoad: (wheel: SavedWheel) => void;
}

const LoadWheelDialog: React.FC<LoadWheelDialogProps> = ({ onLoad }) => {
  const [open, setOpen] = useState(false);
  const [wheels, setWheels] = useState<SavedWheel[]>([]);
  
  useEffect(() => {
    if (open) {
      refreshWheels();
    }
  }, [open]);
  
  const refreshWheels = () => {
    const savedWheels = getSavedWheels();
    // Sort by last modified date (newest first)
    savedWheels.sort((a, b) => b.lastModified - a.lastModified);
    setWheels(savedWheels);
  };
  
  const handleLoad = (wheel: SavedWheel) => {
    onLoad(wheel);
    setOpen(false);
    toast.success(`Ruleta "${wheel.name}" cargada`);
  };
  
  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (deleteWheel(id)) {
      refreshWheels();
      toast.success(`Ruleta "${name}" eliminada`);
    } else {
      toast.error('Error al eliminar la ruleta');
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10"
        >
          <FolderOpen size={16} />
          <span>Cargar Ruleta</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle>Cargar Ruleta</DialogTitle>
          <DialogDescription>
            Selecciona una ruleta guardada
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-72 rounded-md border p-2">
          {wheels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Settings className="mb-2" />
              <p>No hay ruletas guardadas</p>
            </div>
          ) : (
            <div className="space-y-2">
              {wheels.map((wheel) => (
                <div
                  key={wheel.id}
                  className="flex flex-col p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors animate-slide-up"
                  onClick={() => handleLoad(wheel)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-rynlette-purple">{wheel.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDelete(wheel.id, wheel.name, e)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>Modificado: {formatDate(wheel.lastModified)}</span>
                  </div>
                  <div className="flex flex-wrap mt-2 gap-1">
                    {wheel.sections.slice(0, 5).map((section) => (
                      <div
                        key={section.id}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: section.color }}
                        title={section.text}
                      />
                    ))}
                    {wheel.sections.length > 5 && (
                      <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">
                        +{wheel.sections.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LoadWheelDialog;
