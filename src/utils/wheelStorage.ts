import { WheelSection } from '@/components/RouletteWheel';

export interface SavedWheel {
  id: string;
  name: string;
  sections: WheelSection[];
  createdAt: number;
  lastModified: number;
}

// Save a wheel to localStorage
export const saveWheel = (wheel: Omit<SavedWheel, 'id' | 'createdAt' | 'lastModified'>): SavedWheel => {
  const savedWheels = getSavedWheels();
  
  // If wheel already exists, update it
  const existingWheel = savedWheels.find(w => w.name === wheel.name);
  
  if (existingWheel) {
    const updatedWheel = {
      ...existingWheel,
      sections: wheel.sections,
      lastModified: Date.now()
    };
    
    const updatedWheels = savedWheels.map(w => 
      w.id === existingWheel.id ? updatedWheel : w
    );
    
    localStorage.setItem('rynlette_wheels', JSON.stringify(updatedWheels));
    return updatedWheel;
  }
  
  // Otherwise, create a new wheel
  const newWheel: SavedWheel = {
    id: Date.now().toString(),
    name: wheel.name,
    sections: wheel.sections,
    createdAt: Date.now(),
    lastModified: Date.now()
  };
  
  localStorage.setItem('rynlette_wheels', JSON.stringify([...savedWheels, newWheel]));
  return newWheel;
};

// Get all saved wheels from localStorage
export const getSavedWheels = (): SavedWheel[] => {
  const storedWheels = localStorage.getItem('rynlette_wheels');
  if (!storedWheels) return [];
  
  try {
    return JSON.parse(storedWheels);
  } catch (error) {
    console.error('Error parsing stored wheels:', error);
    return [];
  }
};

// Get a specific wheel by ID
export const getWheelById = (id: string): SavedWheel | null => {
  const wheels = getSavedWheels();
  return wheels.find(wheel => wheel.id === id) || null;
};

// Delete a wheel by ID
export const deleteWheel = (id: string): boolean => {
  const wheels = getSavedWheels();
  const filtered = wheels.filter(wheel => wheel.id !== id);
  
  if (filtered.length === wheels.length) {
    return false; // Wheel not found
  }
  
  localStorage.setItem('rynlette_wheels', JSON.stringify(filtered));
  return true;
};

// Save decision history
export interface Decision {
  id: string;
  wheelId: string;
  wheelName: string;
  result: string;
  timestamp: number;
}

export const saveDecision = (decision: Omit<Decision, 'id' | 'timestamp'>): Decision => {
  const savedDecisions = getDecisions();
  
  const newDecision: Decision = {
    id: Date.now().toString(),
    ...decision,
    timestamp: Date.now()
  };
  
  localStorage.setItem('rynlette_decisions', JSON.stringify([...savedDecisions, newDecision]));
  return newDecision;
};

export const getDecisions = (): Decision[] => {
  const storedDecisions = localStorage.getItem('rynlette_decisions');
  if (!storedDecisions) return [];
  
  try {
    return JSON.parse(storedDecisions);
  } catch (error) {
    console.error('Error parsing stored decisions:', error);
    return [];
  }
};

export const clearDecisions = (): void => {
  localStorage.setItem('rynlette_decisions', JSON.stringify([]));
};

// Export decisions as JSON
export const exportDecisions = (): string => {
  const decisions = getDecisions();
  return JSON.stringify(decisions, null, 2);
};

// Generate default wheel with random sections
export const generateDefaultWheel = (): SavedWheel => {
  const defaultOptions = [
    'Pizza', 'Hamburguesa', 'Tacos', 'Sushi', 'Pasta', 'Ensalada'
  ];
  
  const defaultColors = [
    '#6B46C1', '#9F7AEA', '#ED8936', '#38B2AC', '#ED64A6', '#805AD5'
  ];
  
  const sections: WheelSection[] = defaultOptions.map((option, index) => ({
    id: `default-${index}`,
    text: option,
    color: defaultColors[index % defaultColors.length],
    weight: 1
  }));
  
  return {
    id: 'default',
    name: 'Ruleta de Comida',
    sections,
    createdAt: Date.now(),
    lastModified: Date.now()
  };
};
