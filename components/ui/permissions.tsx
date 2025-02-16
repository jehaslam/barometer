import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IGlobalVariables } from '@/app/variables/global';
import { FieldList } from './FieldList';
import { FieldHeader } from './FieldHeader';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';

interface PermissionsComponentProps {
  style?: ViewStyle;
}

export function PermissionsComponent({ style }: PermissionsComponentProps) {
  const { globalVariables } = useGlobalVariables();
  const fields = [
    {
      label: 'GPS Permission',
      value: globalVariables.permissions?.hasGpsPermission ? 'Granted' : 'Denied'
    }
  ];

  if (globalVariables.permissions?.hasGpsPermission) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <FieldHeader icon="security" title="Permissions" />
      <FieldList fields={fields} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  }
});