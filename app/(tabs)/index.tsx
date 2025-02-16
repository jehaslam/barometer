import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';
import { BarometerComponent } from '@/components/ui/barometer';
import { GpsComponent } from '@/components/ui/gps';
import { getPressure } from '@/app/services/pressure';
import { getGps } from '@/app/services/gps';
import { getTemperature } from '@/app/services/temperature';
import { getElevation } from '@/app/services/nasa';
import { PermissionsComponent } from '@/components/ui/permissions';
import { NasaComponent } from '@/components/ui/nasa';
import { getLocation } from '@/app/services/location';
import { LocationComponent } from '@/components/ui/location';

export default function HomeScreen() {
  const { globalVariables, setGlobalVariables } = useGlobalVariables();

  useEffect(() => {
    const fetchGps = async () => {
      await getGps(setGlobalVariables);
    };

    fetchGps();
    const unsubscribePressure = getPressure(setGlobalVariables);

    return () => {
      unsubscribePressure();
    };
  }, []);

  useEffect(() => {
    const fetchTemperature = async () => {
      if (globalVariables.gps && globalVariables.weather?.temperature === null) {
        const { latitude, longitude } = globalVariables.gps;
        await getTemperature(latitude, longitude, setGlobalVariables);
      }
    };

    fetchTemperature();
  }, [globalVariables.gps]);

  useEffect(() => {
    const fetchElevation = async () => {
      if (globalVariables.gps?.latitude && globalVariables.gps?.longitude) {
        const { latitude, longitude } = globalVariables.gps;
        await getElevation(latitude, longitude, setGlobalVariables);
      }
    };

    fetchElevation();
  }, [globalVariables.gps]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (globalVariables.gps?.latitude && globalVariables.gps?.longitude) {
        const { latitude, longitude } = globalVariables.gps;
        await getLocation(latitude, longitude, setGlobalVariables);
      }
    };

    fetchLocation();
  }, [globalVariables.gps]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <PermissionsComponent style={styles.card} />
      <BarometerComponent style={styles.card} />
      <GpsComponent style={styles.card} />
      <NasaComponent style={styles.card} />
      <LocationComponent style={styles.card} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',  // This ensures child components don't overflow the border radius
  },
});