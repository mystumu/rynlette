
import React from "react";
import { NormalizedWheelSection } from "./RouletteWheel";
import { polarToPercent } from "@/utils/rouletteUtils";

interface Props {
  normalizedSections: NormalizedWheelSection[];
}

const RouletteWheelSections: React.FC<Props> = ({ normalizedSections }) => {
  return (
    <>
      {normalizedSections.map((section, i) => {
        // Arc middle angle for label position
        const middleAngle = section.startAngle + section.angle / 2;
        // For label positioning in the wheel
        const labelRadius = 90;
        const rad = (middleAngle - 90) * (Math.PI / 180); // -90deg to make 0deg at top
        const x = 128 + labelRadius * Math.cos(rad); // center at 128px (half of 256)
        const y = 128 + labelRadius * Math.sin(rad);

        // Create a clip path for this section with exact angle calculations
        const clipPath = `polygon(50% 50%, ${polarToPercent(section.startAngle)}, ${
          section.angle < 180 
            ? Array.from(Array(Math.ceil(section.angle / 10))).map((_, idx) => 
                polarToPercent(section.startAngle + idx * 10)
              ).join(', ')
            : Array.from(Array(Math.ceil(section.angle / 5))).map((_, idx) => 
                polarToPercent(section.startAngle + idx * 5)
              ).join(', ')
        }, ${polarToPercent(section.endAngle)})`;

        return (
          <React.Fragment key={section.id}>
            {/* Section slice with improved polygon fill */}
            <div
              className="absolute inset-0"
              style={{
                clipPath,
                backgroundColor: section.color,
                zIndex: 1,
              }}
            />
            {/* Label */}
            <div
              className="absolute"
              style={{
                left: x - 40,
                top: y - 14,
                width: 80,
                textAlign: "center",
                fontSize: "14px",
                color: "#fff",
                fontWeight: 600,
                textShadow: "0 1px 4px #0009",
                zIndex: 2,
                pointerEvents: 'none',
                background: "rgba(0,0,0,0.08)",
                borderRadius: 16,
                padding: 0,
                lineHeight: "1.15",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
            >
              {section.text}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default RouletteWheelSections;
