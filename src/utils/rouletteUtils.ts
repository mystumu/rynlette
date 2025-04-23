
import { WheelSection, NormalizedWheelSection } from "@/components/RouletteWheel";

/**
 * Calculates a random spin angle.
 */
export function getRandomSpinAngle(): number {
  const minRotations = 3;
  const maxRotations = 5;
  const fullRotations = (minRotations + Math.random() * (maxRotations - minRotations)) * 360;
  const randomFinalAngle = Math.random() * 360;
  return fullRotations + randomFinalAngle;
}

/**
 * Returns the winning section, given the angle.
 * @param normalizedSections List of sections with angles
 * @param finalRotation The ending rotation in degrees
 */
export function getWinnerSection(normalizedSections: NormalizedWheelSection[], finalRotation: number): NormalizedWheelSection | undefined {
  // Normalize the rotation angle to be between 0-360
  const normalizedAngle = finalRotation % 360;
  // The pointer is fixed at the top (0 degrees in the wheel coordinate system)
  const pointerPosition = 0;
  // Calculate the position on the wheel that's at the pointer
  // We need to reverse the angle because the wheel rotates clockwise but our sections are defined counterclockwise
  const normalizedPos = ((pointerPosition - normalizedAngle) + 360) % 360;
  
  // Find the section that covers the normalizedPos
  return normalizedSections.find(
    (section) => normalizedPos >= section.startAngle && normalizedPos < section.endAngle
  ) || normalizedSections[0]; // Default to first section if no match
}

/**
 * Helper for rendering wheel polygon label
 */
export function polarToPercent(deg: number) {
  const rad = (deg - 90) * (Math.PI / 180); // -90deg so 0deg is top
  const r = 100; // radius percent for full wheel
  const x = 50 + r * Math.cos(rad);
  const y = 50 + r * Math.sin(rad);
  return `${x}% ${y}%`;
}

/**
 * Calculates the final rotation needed to align the pointer with the winning section.
 * @param winningSection The section that should be aligned with the pointer
 * @param currentRotation The current rotation of the wheel
 */
export function calculateAlignedRotation(winningSection: NormalizedWheelSection, currentRotation: number): number {
  // Calculate middle angle of the winning section
  const winnerMiddleAngle = winningSection.startAngle + (winningSection.angle / 2);
  
  // We want the winner's middle angle to be at the top (0 degrees)
  // Calculate how many full rotations we've already made
  const fullRotations = Math.floor(currentRotation / 360) * 360;
  
  // The final rotation should position the winner's middle at the pointer (0 degrees)
  // We subtract the winner's middle angle to align it with 0 degrees
  return fullRotations - winnerMiddleAngle;
}
