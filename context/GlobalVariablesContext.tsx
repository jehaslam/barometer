import React, { createContext, useState } from 'react';
import { IGlobalVariables, globalVariables as initialGlobalVariables } from '@/app/variables/global';

interface GlobalVariablesContextType {
  globalVariables: IGlobalVariables;
  setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>;
}

export const GlobalVariablesContext = createContext<GlobalVariablesContextType | null>(null);

export function GlobalVariablesProvider({ children }: { children: React.ReactNode }) {
  const [globalVariables, setGlobalVariables] = useState<IGlobalVariables>(initialGlobalVariables);

  return (
    <GlobalVariablesContext.Provider value={{ globalVariables, setGlobalVariables }}>
      {children}
    </GlobalVariablesContext.Provider>
  );
} 