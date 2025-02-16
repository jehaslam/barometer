import React from 'react';
import { ViewStyle } from 'react-native';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';
import { ServiceCard } from './ServiceCard';

interface GpsComponentProps {
  style?: ViewStyle;
}

export function GpsComponent({ style }: GpsComponentProps) {
  const { globalVariables } = useGlobalVariables();
  const convertMetersToFeet = (meters: number) => (meters * 3.28084).toFixed(2);
  const gps = globalVariables.gps || null;

  const fields = [
    { 
      label: 'Latitude', 
      value: gps?.latitude?.toString() || null
    },
    { 
      label: 'Longitude', 
      value: gps?.longitude?.toString() || null
    },
    { 
      label: 'Altitude',
      value: gps && gps?.altitude ?
        `${gps.altitude.toFixed(2)} m / ${convertMetersToFeet(gps.altitude)} ft` :
        null
    }
  ];

  return (
    <ServiceCard
      title="GPS"
      icon="gps-fixed"
      fields={fields}
      hasError={gps?.hasError}
      errorMessage="GPS service unavailable"
      style={style}
    />
  );
}