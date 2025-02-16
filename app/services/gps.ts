import * as Gps from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGlobalVariables } from '@/app/variables/global';

export const getGps = async (setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>): Promise<void> => {
  try {
    const { status } = await Gps.requestForegroundPermissionsAsync();

    // Set the permission status
    setGlobalVariables(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        hasGpsPermission: status === 'granted',
      },
    }));

    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      setGlobalVariables(prev => ({ ...prev, gps: null }));
      return;
    }

    const location = await Gps.getCurrentPositionAsync({});

    setGlobalVariables(prev => ({
      ...prev,
      gps: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
        hasError: false
      }
    }));
  } catch (error) {
    console.error('Error getting GPS:', error);
    setGlobalVariables(prev => ({
      ...prev,
      gps: {
        latitude: 0,
        longitude: 0,
        altitude: null,
        hasError: true
      }
    }));
  }
};

// Default export
export default getGps;