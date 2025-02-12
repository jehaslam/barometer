import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { IGlobalVariables } from '@/app/variables/global';
import { MaterialIcons } from '@expo/vector-icons';

interface LocationComponentProps {
  globalVariables: IGlobalVariables;
}

export function LocationComponent({ globalVariables }: LocationComponentProps) {
  const convertMetersToFeet = (meters: number) => (meters * 3.28084).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="gps-fixed" size={24} color="black" />
        <Text style={styles.title}>GPS</Text>
      </View>
      <Text style={styles.info}>
        Latitude: {globalVariables.location && globalVariables.location.latitude !== null ? (
          globalVariables.location.latitude
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </Text>
      <Text style={styles.info}>
        Longitude: {globalVariables.location && globalVariables.location.longitude !== null ? (
          globalVariables.location.longitude
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </Text>
      <Text style={styles.info}>
        Altitude: {globalVariables.location && globalVariables.location.altitude !== null ? (
          `${globalVariables.location.altitude} m / ${convertMetersToFeet(globalVariables.location.altitude)} ft`
        ) : (
          <ActivityIndicator size="small" color="black" />
        )}
      </Text>
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
});