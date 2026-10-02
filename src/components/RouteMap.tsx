import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TransportMode, TransportOption } from '../types';

type Props = {
  value: TransportMode;
  options: TransportOption[];
  onSelect: (mode: TransportMode) => void;
};

export default function TransportSelector({ value, options, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = option.id === value;
        return (
          <Pressable
            key={option.id}
            style={[
              styles.option,
              active && { backgroundColor: option.accent },
              active && styles.optionActive,
            ]}
            onPress={() => onSelect(option.id)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
            <Text style={[styles.tag, active && styles.tagActive]}>{option.tag}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  option: {
    width: '30%',
    minHeight: 82,
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#EAF2FF',
    borderWidth: 1,
    borderColor: '#D6E3FF',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionActive: {
    shadowColor: '#1d4ed8',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  labelActive: {
    color: '#fff',
  },
  tag: {
    fontSize: 11,
    color: '#475569',
    marginTop: 6,
  },
  tagActive: {
    color: '#F8FAFC',
  },
});
