export type Location = {
  latitude: number;
  longitude: number;
  altitude: number | null;
};

export type Weather = {
  temperature: number | null;
  hasError: boolean;
};

export type NasaData = {
  elevation: number | null;
  acquisitionDate: Date | null;
  hasError: boolean;
};

export type Permissions = {
  hasLocationPermission: boolean;
};

export interface IGlobalVariables {
  location: Location | null;
  pressure: number | null;
  weather: Weather | null;
  permissions: Permissions | null;
  nasaData: NasaData | null;
}

export const globalVariables: IGlobalVariables = {
  location: null,
  pressure: null,
  weather: {
    temperature: null,
    hasError: false,
  },
  permissions: null,
  nasaData: null,
};

// Default export
export default globalVariables;