import React from 'react';
import { ViewStyle } from 'react-native';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';
import { ServiceCard } from './ServiceCard';

interface BarometerComponentProps {
  style?: ViewStyle;
}

export function BarometerComponent({ style }: BarometerComponentProps) {
  const { globalVariables } = useGlobalVariables();
  const temperatureCelsius = globalVariables.weather?.temperature?.toFixed(2) ?? null;
  const temperatureFahrenheit = globalVariables.weather?.temperature  
    ? (globalVariables.weather.temperature * 9/5 + 32).toFixed(2) 
    : null;
  const pressureInHg = globalVariables.pressure !== null 
    ? (globalVariables.pressure * 0.02953).toFixed(2) 
    : null;

  const fields = [
    {
      label: 'Pressure',
      value: globalVariables.pressure !== null 
        ? `${globalVariables.pressure.toFixed(2)} hPa / ${pressureInHg} inHg`
        : null
    },
    {
      label: 'Temperature',
      value: temperatureCelsius !== null 
        ? `${temperatureCelsius} °C / ${temperatureFahrenheit} °F`
        : null
    }
  ];

  return (
    <ServiceCard
      title="Barometer"
      icon="cloud"
      fields={fields}
      hasError={globalVariables.weather?.hasError}
      errorMessage="Weather service unavailable"
      style={style}
    />
  );
}