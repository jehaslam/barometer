import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export interface Field {
  label: string;
  value: string | null;
  isCollapsed?: boolean;
}

interface FieldListProps {
  fields: Field[] | null | undefined;
}

export function FieldList({ fields }: FieldListProps) {
  const [expandedFields, setExpandedFields] = useState<{[key: string]: boolean}>({});

  const toggleField = (label: string) => {
    setExpandedFields(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <View style={styles.fieldInfo}>
      {fields?.map((field, index) => (
        field.value && (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{field.label}:</Text>
            {field.isCollapsed && !expandedFields[field.label] ? (
              <TouchableOpacity onPress={() => toggleField(field.label)}>
                <Text style={styles.link}>Show</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.valueContainer}>
                <Text style={styles.infoValue}>{field.value}</Text>
                {field.isCollapsed && (
                  <TouchableOpacity onPress={() => toggleField(field.label)}>
                    <Text style={styles.link}>Hide</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldInfo: {
    width: '100%',
    padding: 15,
    paddingTop: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    marginRight: 5,
    flexShrink: 0,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  valueContainer: {
    flex: 1,
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  }
}); 