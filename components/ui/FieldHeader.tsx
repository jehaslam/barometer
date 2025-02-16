import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FieldHeaderProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

export function FieldHeader({ icon, title }: FieldHeaderProps) {
  return (
    <View style={styles.titleContainer}>
      <MaterialIcons name={icon} size={24} color="black" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 10,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  }
}); 