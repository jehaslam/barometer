import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IGlobalVariables } from '@/app/variables/global';

interface PermissionsComponentProps {
  globalVariables: IGlobalVariables;
}

export function PermissionsComponent({ globalVariables }: PermissionsComponentProps) {
  const openAppSettings = () => {
    Linking.openSettings();
  };

  if (globalVariables.permissions?.hasLocationPermission) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="security" size={24} color="black" />
        <Text style={styles.title}>Permissions</Text>
      </View>
      <Text style={styles.message}>You do not have the right permissions set.</Text>
      <Text style={styles.message}>Location Permission needs to be enabled to retrieve GPS coordinates, in order to retrieve z-axis and weather information.</Text>
      <TouchableOpacity onPress={openAppSettings} style={styles.linkContainer}>
        <Text style={styles.linkText}>Open App Settings</Text>
      </TouchableOpacity>
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
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
});