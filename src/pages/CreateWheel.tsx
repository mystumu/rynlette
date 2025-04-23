import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouletteWheel, { WheelSection } from '@/components/RouletteWheel';
import WheelEditor from '@/components/WheelEditor';
import SaveWheelDialog from '@/components/SaveWheelDialog';
import LoadWheelDialog from '@/components/LoadWheelDialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SavedWheel, saveDecision, generateDefaultWheel } from '@/utils/wheelStorage';
import { toast } from 'sonner';
import { Timer, ArrowUpDown, BadgeCheck } from 'lucide-react';

const CreateWheel = () => {
  const initialWheel = generateDefaultWheel();
  
  const [sections, setSections] = useState<WheelSection[]>(initialWheel.sections);
  const [currentWheel, setCurrentWheel] = useState<SavedWheel | null>(initialWheel);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const [timerModeEnabled, setTimerModeEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const [eliminateOptions, setEliminateOptions] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerActive && timeRemaining === 0) {
      handleSpin();
      setTimerActive(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerActive, timeRemaining]);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    if (sections.length < 2) {
      toast.error('Necesitas al menos 2 opciones');
      return;
    }
    
    setIsSpinning(true);
  };
  
  const startTimer = () => {
    setTimeRemaining(timerDuration);
    setTimerActive(true);
    toast(`La ruleta girará en ${timerDuration} segundos`);
  };
  
  const stopTimer = () => {
    setTimerActive(false);
    toast.error('Temporizador cancelado');
  };
  
  const handleWheelResult = (result: WheelSection) => {
    if (currentWheel) {
      saveDecision({
        wheelId: currentWheel.id,
        wheelName: currentWheel.name,
        result: result.text
      });
    }
    
    if (eliminateOptions) {
      setEliminatedOptions(prev => [...prev, result.id]);
      
      if (eliminatedOptions.length >= sections.length - 2) {
        setTimeout(() => {
          toast.info('Todas las opciones han sido seleccionadas. Reiniciando.');
          setEliminatedOptions([]);
        }, 2000);
      }
    }
  };
  
  const activeSections = eliminateOptions
    ? sections.filter(section => !eliminatedOptions.includes(section.id))
    : sections;
  
  const handleLoadWheel = (wheel: SavedWheel) => {
    setSections(wheel.sections);
    setCurrentWheel(wheel);
    setEliminatedOptions([]);
  };
  
  const handleSaveWheel = (name: string) => {
    setCurrentWheel(prev => prev ? { ...prev, name, sections } : null);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col py-6 px-4">
        <div className="max-w-screen-lg mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-rynlette-darkPurple">
            {currentWheel?.name || 'Nueva Ruleta'}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col items-center">
              <RouletteWheel 
                sections={activeSections.length > 0 ? activeSections : sections}
                onResult={handleWheelResult}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
              />
              
              {timerModeEnabled && (
                <div className="
                  mt-4 p-4 rounded-lg shadow-md border w-full max-w-md animate-fade-in
                  bg-white border-rynlette-lightPurple
                  dark:bg-[#22243a] dark:border-[#34354c] dark:shadow-[0_2px_10px_0_#0005]
                ">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Timer size={18} className="mr-2 text-rynlette-purple" />
                      <h3 className="font-medium text-rynlette-darkPurple dark:text-white">
                        Modo Temporizador
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={60}
                        value={timerDuration}
                        onChange={(e) => setTimerDuration(Number(e.target.value))}
                        className="w-16 text-center"
                        disabled={timerActive}
                      />
                      <span className="text-sm text-muted-foreground">seg</span>
                    </div>
                  </div>
                  {timerActive ? (
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div
                        className="bg-rynlette-purple h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(timeRemaining / timerDuration) * 100}%` }}
                      ></div>
                      <div className="text-center text-sm font-medium text-rynlette-purple mt-1">
                        {timeRemaining} segundos
                      </div>
                    </div>
                  ) : null}

                  {!timerActive ? (
                    <Button
                      onClick={startTimer}
                      className="w-full bg-rynlette-purple hover:bg-rynlette-darkPurple"
                      disabled={isSpinning}
                    >
                      Iniciar Temporizador
                    </Button>
                  ) : (
                    <Button
                      onClick={stopTimer}
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              )}
              
              {eliminateOptions && eliminatedOptions.length > 0 && (
                <div className="
                  mt-4 p-4 rounded-lg shadow-md border w-full max-w-md animate-fade-in
                  bg-white border-rynlette-lightPurple
                  dark:bg-[#22243a] dark:border-[#34354c] dark:shadow-[0_2px_10px_0_#0005]
                ">
                  <div className="flex items-center mb-2">
                    <BadgeCheck size={18} className="mr-2 text-rynlette-orange" />
                    <h3 className="font-medium text-rynlette-darkPurple dark:text-white">
                      Opciones eliminadas
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {eliminatedOptions.map(id => {
                      const section = sections.find(s => s.id === id);
                      return section ? (
                        <div
                          key={id}
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: section.color }}
                        >
                          {section.text}
                        </div>
                      ) : null;
                    })}
                  </div>
                  {eliminatedOptions.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEliminatedOptions([])}
                      className="mt-2 w-full text-muted-foreground hover:text-foreground"
                    >
                      Reiniciar eliminaciones
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="edit" className="flex-1">
                    Editar Ruleta
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">
                    Configuración
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-4">
                  <WheelEditor sections={sections} onChange={setSections} />
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <SaveWheelDialog 
                      sections={sections} 
                      onSave={handleSaveWheel}
                      defaultName={currentWheel?.name || ''}
                    />
                    <LoadWheelDialog onLoad={handleLoadWheel} />
                  </div>
                </TabsContent>
                
                <TabsContent
                  value="settings"
                  className="
                    bg-white p-4 rounded-lg shadow-md
                    dark:bg-[#22243a] dark:border-[#34354c] dark:shadow-[0_2px_10px_0_#0005] border
                    transition-colors
                  "
                >
                  <h3 className="text-lg font-medium mb-4 text-rynlette-darkPurple dark:text-white">
                    Opciones de la Ruleta
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Timer size={18} className="mr-2 text-rynlette-purple" />
                          <Label htmlFor="timer-mode" className="font-medium dark:text-white">Modo Temporizador</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          La ruleta girará automáticamente después de unos segundos
                        </p>
                      </div>
                      <Switch
                        id="timer-mode"
                        checked={timerModeEnabled}
                        onCheckedChange={setTimerModeEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <ArrowUpDown size={18} className="mr-2 text-rynlette-orange" />
                          <Label htmlFor="eliminate-options" className="font-medium dark:text-white">
                            Eliminar Opciones Seleccionadas
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Las opciones ya seleccionadas no volverán a aparecer
                        </p>
                      </div>
                      <Switch
                        id="eliminate-options"
                        checked={eliminateOptions}
                        onCheckedChange={(checked) => {
                          setEliminateOptions(checked);
                          setEliminatedOptions([]);
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateWheel;
