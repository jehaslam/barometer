import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ServiceErrorProps {
  message: string;
  hasError?: boolean | null | undefined;
}

export function ServiceError({ message, hasError }: ServiceErrorProps) {
  if (hasError !== true) return null;
  
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={24} color="red" style={styles.alertIcon} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIcon: {
    marginRight: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  }
}); 