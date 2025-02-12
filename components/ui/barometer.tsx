import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { IGlobalVariables } from '@/app/variables/global';
import { MaterialIcons } from '@expo/vector-icons';

interface BarometerComponentProps {
  globalVariables: IGlobalVariables;
}

export function BarometerComponent({ globalVariables }: BarometerComponentProps) {
  const temperatureCelsius = globalVariables.weather?.temperature?.toFixed(2) ?? null;
  const temperatureFahrenheit = globalVariables.weather && globalVariables.weather.temperature !== null ? (globalVariables.weather.temperature * 9/5 + 32).toFixed(2) : null;

  // Convert pressure from hPa to inHg
  const pressureInHg = globalVariables.pressure !== null ? (globalVariables.pressure * 0.02953).toFixed(2) : null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="cloud" size={24} color="black" />
        <Text style={styles.title}>Barometer</Text>
      </View>
      <Text style={styles.info}>
        Pressure: {globalVariables.pressure !== null ? (
          `${globalVariables.pressure.toFixed(2)} hPa / ${pressureInHg} inHg`
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Temperature:</Text>
        {globalVariables.weather?.hasError ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={24} color="red" style={styles.alertIcon} />
            <Text style={styles.errorText}>Weather service unavailable</Text>
          </View>
        ) : temperatureCelsius !== null ? (
          <Text style={styles.infoValue}>{`${temperatureCelsius} °C / ${temperatureFahrenheit} °F`}</Text>
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  info: {
    fontSize: 16,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    marginLeft: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});