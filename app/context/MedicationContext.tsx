import { createContext, useContext, useState, ReactNode } from "react";

interface MedicationContextType {
  medications: any[];
  setMedications: React.Dispatch<React.SetStateAction<any[]>>;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState<any[]>([]);

  return (
    <MedicationContext.Provider value={{ medications, setMedications }}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedication() {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
}
