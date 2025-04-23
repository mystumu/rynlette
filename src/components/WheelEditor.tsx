
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { WheelSection } from './RouletteWheel';
import { Trash2, Plus, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface WheelEditorProps {
  sections: WheelSection[];
  onChange: (sections: WheelSection[]) => void;
}

const defaultColors = [
  '#6B46C1', // purple
  '#9F7AEA', // violet
  '#ED8936', // orange
  '#38B2AC', // teal
  '#ED64A6', // pink
  '#805AD5', // indigo
  '#D53F8C', // pink
  '#DD6B20', // orange
  '#38A169', // green
  '#3182CE', // blue
];

const WheelEditor: React.FC<WheelEditorProps> = ({ sections, onChange }) => {
  const [editingSections, setEditingSections] = useState<WheelSection[]>(sections);

  useEffect(() => {
    setEditingSections(sections);
  }, [sections]);

  const handleAddSection = () => {
    const newColor = defaultColors[editingSections.length % defaultColors.length];
    const newSection: WheelSection = {
      id: Date.now().toString(),
      text: `Opción ${editingSections.length + 1}`,
      color: newColor,
      weight: 1
    };

    const updatedSections = [...editingSections, newSection];
    setEditingSections(updatedSections);
    onChange(updatedSections);

    toast.success('Sección añadida');
  };

  const handleRemoveSection = (id: string) => {
    if (editingSections.length <= 2) {
      toast.error('Debe haber al menos 2 secciones');
      return;
    }

    const updatedSections = editingSections.filter(section => section.id !== id);
    setEditingSections(updatedSections);
    onChange(updatedSections);

    toast.success('Sección eliminada');
  };

  const handleTextChange = (id: string, text: string) => {
    const updatedSections = editingSections.map(section =>
      section.id === id ? { ...section, text } : section
    );
    setEditingSections(updatedSections);
    onChange(updatedSections);
  };

  const handleColorChange = (id: string, color: string) => {
    const updatedSections = editingSections.map(section =>
      section.id === id ? { ...section, color } : section
    );
    setEditingSections(updatedSections);
    onChange(updatedSections);
  };

  const handleWeightChange = (id: string, weight: number) => {
    const updatedSections = editingSections.map(section =>
      section.id === id ? { ...section, weight } : section
    );
    setEditingSections(updatedSections);
    onChange(updatedSections);
  };

  const handleDistributeEvenly = () => {
    const updatedSections = editingSections.map(section => ({ ...section, weight: 1 }));
    setEditingSections(updatedSections);
    onChange(updatedSections);

    toast.success('Pesos distribuidos uniformemente');
  };

  return (
    <div
      className="
        w-full max-w-md mx-auto p-4
        rounded-lg shadow-md border
        bg-white
        dark:bg-[#22243a] dark:border-[#34354c] dark:shadow-[0_2px_10px_0_#0005]
        transition-colors
        ryn-feature-card
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-rynlette-purple dark:text-white">Editar Ruleta</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDistributeEvenly}
            className="flex items-center gap-1"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Distribuir</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleAddSection}
            className="bg-rynlette-purple hover:bg-rynlette-darkPurple flex items-center gap-1"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Añadir</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {editingSections.map((section, index) => (
          <div
            key={section.id}
            className="
              p-3 border rounded-md hover:shadow-sm transition-shadow animate-fade-in
              dark:border-[#34354c] dark:bg-[#22243a]
            "
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Input
                type="color"
                value={section.color}
                onChange={(e) => handleColorChange(section.id, e.target.value)}
                className="w-12 h-8 p-1 border rounded cursor-pointer"
              />
              <Input
                type="text"
                value={section.text}
                onChange={(e) => handleTextChange(section.id, e.target.value)}
                placeholder="Nombre de la sección"
                className="flex-grow"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSection(section.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={18} />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-14">Peso: {section.weight}</span>
              <Slider
                value={[section.weight]}
                min={1}
                max={10}
                step={1}
                onValueChange={([value]) => handleWeightChange(section.id, value)}
                className="flex-grow"
              />
            </div>
          </div>
        ))}
      </div>

      {editingSections.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay secciones. Añade una nueva para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default WheelEditor;
