
import React from "react";
import { WheelSection } from "./RouletteWheel";

interface Props {
  result: WheelSection | null;
  isSpinning: boolean;
}

const RouletteResult: React.FC<Props> = ({ result, isSpinning }) => {
  if (!result || isSpinning) return null;
  return (
    <div className="mt-3 p-3 bg-white rounded-md shadow text-rynlette-darkPurple w-full text-center animate-bounce-in">
      <p className="text-base font-semibold">Resultado:</p>
      <p className="text-xl font-bold">{result.text}</p>
    </div>
  );
};

export default RouletteResult;
