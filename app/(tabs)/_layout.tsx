import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <View style={styles.blueBar}>
        <Text style={styles.sensorText}>Sensors</Text>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <MaterialIcons name="map" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={28} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  blueBar: {
    height: 75,
    backgroundColor: '#036', // Updated blue color
    justifyContent: 'center',
    alignItems: 'center',
  },
  sensorText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});