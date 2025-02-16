import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FieldHeader } from './FieldHeader';
import { ServiceError } from './ServiceError';
import { FieldList, Field } from './FieldList';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface ServiceCardProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  fields: Field[] | null | undefined;
  hasError?: boolean | null | undefined;
  errorMessage?: string;
  style?: ViewStyle;
}

export function ServiceCard({ title, icon, fields, hasError, errorMessage = "Service unavailable", style }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const arrowRotation = useRef(new Animated.Value(1)).current;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
    Animated.timing(arrowRotation, {
      toValue: !isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateZ = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        onPress={toggleExpand}
        style={styles.headerContainer}
      >
        <FieldHeader icon={icon} title={title} />
        <Animated.View style={[styles.arrow, { transform: [{ rotateZ }] }]}>
          <MaterialIcons 
            name="keyboard-arrow-right"
            size={36} 
            color="black" 
          />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          <ServiceError message={errorMessage} hasError={hasError} />
          <FieldList fields={fields} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  arrow: {
    padding: 15
  }
}); 