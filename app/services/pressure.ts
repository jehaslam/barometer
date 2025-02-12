import { Barometer } from 'expo-sensors';
import { IGlobalVariables } from '../../app/variables/global';

export const getPressure = (setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>): (() => void) => {
  let lastUpdate = Date.now();
  Barometer.addListener(({ pressure }) => {
    const now = Date.now();
    if (!pressure || now - lastUpdate >= 1000) { // Update every second
      setGlobalVariables(prev => ({
        ...prev,
        pressure: pressure, // Convert kPa to hPa
      }));
      lastUpdate = now;
    }
  });

  return () => {
    Barometer.removeAllListeners();
  };
};

// Default export
export default getPressure;