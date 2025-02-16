import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGlobalVariables } from '@/app/variables/global';

export const getLocation = async (setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>): Promise<void> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    // Set the permission status
    setGlobalVariables(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        hasLocationPermission: status === 'granted',
      },
    }));

    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      setGlobalVariables(prev => ({ ...prev, location: null }));
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: location.coords.latitude || 0,
      longitude: location.coords.longitude || 0,
      altitude: location.coords.altitude || 0,
    };

    setGlobalVariables(prev => ({
      ...prev,
      location: newLocation,
    }));
  } catch (error) {
    console.error('Error getting location:', error);
    setGlobalVariables(prev => ({
      ...prev,
      location: null,
    }));
  }
};

// Default export
export default getLocation;