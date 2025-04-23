
import React, { useState, useRef, useMemo } from 'react';
import { toast } from 'sonner';
import { ChevronDown } from 'lucide-react';
import RouletteWheelSections from "./RouletteWheelSections";
import RouletteResult from "./RouletteResult";
import { 
  getRandomSpinAngle, 
  getWinnerSection, 
  calculateAlignedRotation 
} from "@/utils/rouletteUtils";

export interface WheelSection {
  id: string;
  text: string;
  color: string;
  weight: number;
}

// Extended interface for normalized sections with angle information
export interface NormalizedWheelSection extends WheelSection {
  angle: number;
  startAngle: number;
  endAngle: number;
}

interface RouletteWheelProps {
  sections: WheelSection[];
  onResult?: (section: WheelSection) => void;
  isSpinning: boolean;
  setIsSpinning: (value: boolean) => void;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({
  sections,
  onResult,
  isSpinning,
  setIsSpinning,
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<WheelSection | null>(null);
  const [rotationDeg, setRotationDeg] = useState(0);

  // Calculate normalized sections once when sections change
  const normalizedSections = useMemo(() => {
    if (sections.length === 0) return [];
    const totalWeight = sections.reduce((sum, section) => sum + section.weight, 0);
    let lastAngle = 0;
    return sections.map(section => {
      const angle = (section.weight / totalWeight) * 360;
      const startAngle = lastAngle;
      const endAngle = lastAngle + angle;
      lastAngle = endAngle;
      return {
        ...section,
        angle,
        startAngle,
        endAngle
      };
    });
  }, [sections]);

  // Enhanced spin logic with proper animation
  const spinWheel = () => {
    if (isSpinning || sections.length < 2) return;
    setResult(null);
    setIsSpinning(true);

    // Use helper to calculate random angle
    const finalRotation = getRandomSpinAngle();

    // Remove any existing animation class
    if (wheelRef.current) {
      wheelRef.current.classList.remove('animate-spin-wheel');
      // Force reflow to ensure the class removal is processed
      void wheelRef.current.offsetWidth;
      wheelRef.current.style.setProperty('--spin-deg', `${finalRotation}deg`);
      wheelRef.current.classList.add('animate-spin-wheel');
    }

    setRotationDeg(finalRotation);

    // Wait for the animation (5s). Then determine winner and adjust position
    setTimeout(() => {
      // Determine the winning section based on final rotation
      const winningSection = getWinnerSection(normalizedSections, finalRotation);
      
      if (winningSection) {
        // Calculate the rotation needed to align the pointer with the winning section
        const alignedRotation = calculateAlignedRotation(winningSection, finalRotation);
        
        // Apply the aligned rotation
        setRotationDeg(alignedRotation);
        
        // Set result and trigger callback
        setResult(winningSection);
        if (onResult) onResult(winningSection);

        toast.success(`¡${winningSection.text || 'Sección'} ha sido seleccionada!`, {
          duration: 2500,
        });
      }

      setIsSpinning(false);
    }, 5000);
  };

  // Render the wheel with optimized mobile design
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[375px] sm:max-w-md mx-auto my-6">
      {/* Pointer - positioned at 0 degrees (top) */}
      <div className="custom-pointer z-20">
        <ChevronDown size={32} className="text-rynlette-orange" />
      </div>

      {/* Wheel */}
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-rynlette-darkPurple bg-white shadow-lg overflow-hidden"
        style={{
          touchAction: 'manipulation',
        }}
      >
        <div
          ref={wheelRef}
          className="absolute w-full h-full"
          style={{
            transform: !isSpinning ? `rotate(${rotationDeg}deg)` : undefined,
            transition: !isSpinning ? 'transform 0.3s ease-out' : 'none',
          }}
        >
          <RouletteWheelSections normalizedSections={normalizedSections} />
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || sections.length < 2}
        className="mt-6 bg-rynlette-purple hover:bg-rynlette-darkPurple text-white font-bold py-3 px-8 rounded-full shadow-md transition-all hover-scale text-lg disabled:opacity-60"
        style={{ width: '90%', minWidth: 160, maxWidth: 280 }}
      >
        {isSpinning ? 'Girando...' : '¡Girar!'}
      </button>

      {/* Result display */}
      <RouletteResult result={result} isSpinning={isSpinning} />
    </div>
  );
};

export default RouletteWheel;
