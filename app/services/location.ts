import * as Location from 'expo-location';
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
    const newLocation = (location?.coords?.latitude && location?.coords?.longitude && location?.coords?.altitude) ? {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
    } : null;

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