import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalVariables as initialGlobalVariables, IGlobalVariables } from '@/app/variables/global';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BarometerComponent } from '@/components/ui/barometer';
import { LocationComponent } from '@/components/ui/location';
import { getPressure } from '@/app/services/pressure';
import { getLocation } from '@/app/services/location';
import { getTemperature } from '@/app/services/temperature';
import { getElevation } from '@/app/services/nasa';
import { MaterialIcons } from '@expo/vector-icons';
import { PermissionsComponent } from '@/components/ui/permissions';
import { NasaComponent } from '@/components/ui/nasa';

export default function HomeScreen() {
  const [globalVariables, setGlobalVariables] = useState<IGlobalVariables>(initialGlobalVariables);

  useEffect(() => {
    const fetchLocation = async () => {
      await getLocation(setGlobalVariables);
    };

    fetchLocation();
    const unsubscribePressure = getPressure(setGlobalVariables);

    return () => {
      unsubscribePressure();
    };
  }, []);

  useEffect(() => {
    const fetchTemperature = async () => {
      if (globalVariables.location && globalVariables.weather?.temperature === null) {
        const { latitude, longitude } = globalVariables.location;
        await getTemperature(latitude, longitude, setGlobalVariables);
      }
    };

    fetchTemperature();
  }, [globalVariables.location]);

  useEffect(() => {
    const fetchElevation = async () => {
      if (globalVariables.location?.latitude && globalVariables.location?.longitude) {
        const { latitude, longitude } = globalVariables.location;
        await getElevation(latitude, longitude, setGlobalVariables);
      }
    };

    fetchElevation();
  }, [globalVariables.location]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#036' }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <MaterialIcons
            name="cloud"
            size={310}
            color="#808080"
            style={styles.headerImage}
          />
          <MaterialIcons
            name="terrain"
            size={200}
            color="#036"
            style={styles.overlayImage}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sensors</ThemedText>
      </ThemedView>
      <PermissionsComponent globalVariables={globalVariables} />
      <BarometerComponent globalVariables={globalVariables} />
      <LocationComponent globalVariables={globalVariables} />
      <NasaComponent globalVariables={globalVariables} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    color: '#57a',
    left: '-25%',
  },
  overlayImage: {
    position: 'absolute',
    bottom: 0,
    left: -20,
  },
});