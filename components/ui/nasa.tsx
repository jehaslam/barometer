import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IGlobalVariables } from '@/app/variables/global';

interface NasaComponentProps {
  globalVariables: IGlobalVariables;
}

export function NasaComponent({ globalVariables }: NasaComponentProps) {
  const elevationMeters = globalVariables.nasaData?.elevation?.toFixed(2) ?? null;
  const elevationFeet = globalVariables.nasaData?.elevation !== null && globalVariables.nasaData?.elevation !== undefined ? (globalVariables.nasaData.elevation * 3.28084).toFixed(2) : null;
  const acquisitionDate = globalVariables.nasaData?.acquisitionDate ? globalVariables.nasaData.acquisitionDate.toLocaleDateString() : null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="rocket" size={24} color="black" />
        <Text style={styles.title}>NASA Elevation</Text>
      </View>
      {globalVariables.nasaData?.hasError ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={24} color="red" style={styles.alertIcon} />
          <Text style={styles.errorText}>Nasa service unavailable</Text>
        </View>
      ) : (
        <>
          <Text style={styles.info}>
            Elevation: {elevationMeters !== null ? (
              `${elevationMeters} m / ${elevationFeet} ft`
            ) : (
              <ActivityIndicator size="small" color="black" />
            )}
          </Text>
          <Text style={styles.info}>
            Acquisition Date: {acquisitionDate !== null ? (
              acquisitionDate
            ) : (
              <ActivityIndicator size="small" color="black" />
            )}
          </Text>
        </>
      )}
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