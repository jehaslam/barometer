import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGlobalVariables } from '@/app/variables/global';

export const getTemperature = async (latitude: number, longitude: number, setGlobalVariables: React.Dispatch<React.SetStateAction<IGlobalVariables>>): Promise<number | null> => {
  try {
    // Check if there is a valid temperature value in AsyncStorage
    const storedData = await AsyncStorage.getItem('tempom');
    if (storedData) {
      const { temperature, datetime } = JSON.parse(storedData);
      const storedTime = new Date(datetime).getTime();
      const currentTime = new Date().getTime();

      // Check if the stored value is less than an hour old
      if (currentTime - storedTime < 3600000) { // 3600000 ms = 1 hour
        setGlobalVariables(prev => ({
          ...prev,
          weather: {
            ...prev.weather,
            temperature,
            hasError: false,
          },
        }));
        return temperature;
      }
    }

    // Fetch temperature from the Open-Meteo API
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await response.json();
    console.log(data);

    if (!data.current_weather || data.current_weather.temperature === undefined) {
      setGlobalVariables(prev => ({
        ...prev,
        weather: {
          ...prev.weather,
          temperature: null,
          hasError: true,
        },
      }));
      return null;
    }

    // Get the current temperature from the API response
    const temperature = data.current_weather.temperature;
    const datetime = new Date().toISOString();

    // Store temperature and datetime in AsyncStorage
    await AsyncStorage.setItem('tempom', JSON.stringify({ temperature, datetime }));

    setGlobalVariables(prev => ({
      ...prev,
      weather: {
        ...prev.weather,
        temperature,
        hasError: false,
      },
    }));

    return temperature;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    setGlobalVariables(prev => ({
      ...prev,
      weather: {
        ...prev.weather,
        temperature: null,
        hasError: true,
      },
    }));
    return null;
  }
};

// Default export
export default getTemperature;