import React from 'react';
import { ViewStyle } from 'react-native';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';
import { ServiceCard } from './ServiceCard';

interface NasaComponentProps {
  style?: ViewStyle;
}

export function NasaComponent({ style }: NasaComponentProps) {
  const { globalVariables } = useGlobalVariables();
  const elevationMeters = globalVariables.nasaData?.elevation?.toFixed(2) ?? null;
  const elevationFeet = globalVariables.nasaData?.elevation !== null 
    ? ((globalVariables.nasaData?.elevation ?? 0) * 3.28084).toFixed(2)
    : null;
  const acquisitionDate = globalVariables.nasaData?.acquisitionDate 
    ? globalVariables.nasaData.acquisitionDate.toLocaleDateString()
    : null;

  const fields = [
    {
      label: 'Elevation',
      value: elevationMeters !== null 
        ? `${elevationMeters} m / ${elevationFeet} ft`
        : null
    },
    {
      label: 'Acquisition Date',
      value: acquisitionDate
    }
  ];

  return (
    <ServiceCard
      title="NASA Elevation"
      icon="rocket"
      fields={fields}
      hasError={globalVariables.nasaData?.hasError}
      errorMessage="Nasa service unavailable"
      style={style}
    />
  );
}