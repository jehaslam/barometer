import React from 'react';
import { ViewStyle } from 'react-native';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';
import { ServiceCard } from './ServiceCard';

interface LocationComponentProps {
  style?: ViewStyle;
}

export function LocationComponent({ style }: LocationComponentProps) {
  const { globalVariables } = useGlobalVariables();
  const location = globalVariables.location || null;

  const fields = [
    // Address object fields
    { label: 'Address', value: location?.address|| null },
    { label: 'House Number', value: location?.houseNumber|| null },
    { label: 'Road', value: location?.road|| null },
    { label: 'Hamlet', value: location?.hamlet || null},
    { label: 'City', value: location?.city || null},
    { label: 'County', value: location?.county|| null },
    { label: 'Region', value: location?.region || null},
    { label: 'State', value: location?.state || null},
    { label: 'Postcode', value: location?.postcode || null},
    { label: 'Country', value: location?.country || null},
    
    // Root level fields
    { label: 'Address Type', value: location?.addressType|| null },
    { label: 'Class', value: location?.class || null},
    { label: 'Name', value: location?.name || null},
    { label: 'Type', value: location?.type|| null },
    { label: 'Licence', value: location?.licence || null, isCollapsed: true}
  ];

  return (
    <ServiceCard
      title="Location"
      icon="location-on"
      fields={fields}
      hasError={location?.hasError}
      errorMessage="Location service unavailable"
      style={style}
    />
  );
} 