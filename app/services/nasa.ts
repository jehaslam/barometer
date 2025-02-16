import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGlobalVariables } from '@/app/variables/global';
import { parseDate } from '../helpers/date';

export const getElevation = async (
  latitude: number,
  longitude: number,
  setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>
): Promise<number | null> => {
  try {
    // Check if there is a valid elevation value in AsyncStorage
    const storedData = await AsyncStorage.getItem('nasaelevationdata');
    if (storedData) {
      const { elevation, datetime, acquisitionDate } = JSON.parse(storedData);
      const storedTime = new Date(datetime).getTime();
      const currentTime = new Date().getTime();

      // Check if the stored value is less than an hour old
      if (currentTime - storedTime < 3600000) { // 3600000 ms = 1 hour
        setGlobalVariables(prev => ({
          ...prev,
          nasaData: {
            ...prev.nasaData,
            elevation,
            acquisitionDate: new Date(acquisitionDate),
            hasError: false,
          },
        }));
        return elevation;
      }
    }

    // Fetch elevation from the USGS Elevation API
    const response = await fetch(`https://epqs.nationalmap.gov/v1/json?x=${longitude}&y=${latitude}&wkid=4326&units=Meters&includeDate=true`);
    const data = await response.json();

    if (data && data.value && data.attributes && data.attributes.AcquisitionDate) {
      const elevation = parseFloat(data.value);
      const acquisitionDate = parseDate(data.attributes.AcquisitionDate);
      const datetime = new Date().toISOString();

      // Store elevation, datetime, and acquisitionDate in AsyncStorage
      await AsyncStorage.setItem('nasaelevationdata', JSON.stringify({ elevation, datetime, acquisitionDate }));

      setGlobalVariables(prev => ({
        ...prev,
        nasaData: {
          ...prev.nasaData,
          elevation,
          acquisitionDate,
          hasError: false,
        },
      }));

      return elevation;
    } else {
      console.error('Error fetching elevation data');
      setGlobalVariables(prev => ({
        ...prev,
        nasaData: {
          ...prev.nasaData,
          elevation: null,
          acquisitionDate: null,
          hasError: true,
        },
      }));
      return null;
    }
  } catch (error) {
    console.error('Error fetching elevation data:', error);
    setGlobalVariables(prev => ({
      ...prev,
      nasaData: {
        ...prev.nasaData,
        elevation: null,
        acquisitionDate: null,
        hasError: true,
      },
    }));
    return null;
  }
};

// Default export
export default getElevation;