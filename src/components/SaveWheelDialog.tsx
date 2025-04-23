
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { WheelSection } from './RouletteWheel';
import { saveWheel } from '@/utils/wheelStorage';
import { toast } from 'sonner';

interface SaveWheelDialogProps {
  sections: WheelSection[];
  onSave?: (name: string) => void;
  defaultName?: string;
}

const SaveWheelDialog: React.FC<SaveWheelDialogProps> = ({ sections, onSave, defaultName = '' }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultName);
  
  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Por favor, ingresa un nombre para tu ruleta');
      return;
    }
    
    try {
      saveWheel({ name, sections });
      toast.success(`¡Ruleta "${name}" guardada con éxito!`);
      
      if (onSave) {
        onSave(name);
      }
      
      setOpen(false);
    } catch (error) {
      console.error('Error saving wheel:', error);
      toast.error('Error al guardar la ruleta');
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-rynlette-purple text-rynlette-purple hover:bg-rynlette-purple/10"
        >
          <Save size={16} />
          <span>Guardar Ruleta</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle>Guardar Ruleta</DialogTitle>
          <DialogDescription>
            Guarda tu ruleta personalizada para usarla más tarde
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mi ruleta personalizada"
              className="col-span-3"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-rynlette-purple hover:bg-rynlette-darkPurple"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveWheelDialog;
