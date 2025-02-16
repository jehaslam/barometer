import { useContext } from 'react';
import { GlobalVariablesContext } from '@/context/GlobalVariablesContext';

export function useGlobalVariables() {
  const context = useContext(GlobalVariablesContext);
  if (!context) {
    throw new Error('useGlobalVariables must be used within a GlobalVariablesProvider');
  }
  return context;
} 