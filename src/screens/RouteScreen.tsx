import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TransportSelector from '../components/TransportSelector';
import { transportOptions } from '../data/transportModes';
import { fetchRoute } from '../services/directions';
import { useTripStore } from '../store/tripStore';
import { RootStackParamList, TransportMode } from '../types';

const routeTheme = {
  auto: '#2563eb',
  walk: '#10b981',
  moto: '#f59e0b',
  scooter: '#8b5cf6',
  metro: '#ef4444',
};

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const { setTrip, setRoute } = useTripStore();
  const [origin, setOrigin] = useState('Av. Reforma 120');
  const [destination, setDestination] = useState('Parque Central');
  const [mode, setMode] = useState<TransportMode>('auto');
  const [loading, setLoading] = useState(false);

  const selected = useMemo(
    () => transportOptions.find((option) => option.id === mode) ?? transportOptions[0],
    [mode]
  );

  const handleRoute = async () => {
    setLoading(true);
    const trip = { origin, destination, mode };
    setTrip(trip);

    const route = await fetchRoute(trip);
    setRoute(route);

    navigation.navigate('Route', trip);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>MapNav</Text>
        <Text style={styles.subtitle}>Navega con tráfico, rutas y guiado por calles</Text>

        <View style={styles.searchCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Origen</Text>
            <TextInput
              style={styles.input}
              value={origin}
              onChangeText={setOrigin}
              placeholder="Ingresa tu origen"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Destino</Text>
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="¿A dónde quieres ir?"
            />
          </View>
        </View>

        <View style={styles.modeHeaderRow}>
          <Text style={styles.modeHeader}>Modo de transporte</Text>
          <Text style={styles.modeBadge}>{selected.tag}</Text>
        </View>

        <TransportSelector value={mode} options={transportOptions} onSelect={setMode} />

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Tiempo estimado</Text>
          <Text style={styles.summaryValue}>{selected.eta}</Text>
          <Text style={styles.summaryMeta}>{selected.distance} · {selected.traffic}</Text>
        </View>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: routeTheme[mode] }]}
          onPress={handleRoute}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>{loading ? 'Calculando ruta...' : 'Ver mi ruta'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 6,
    color: '#475569',
    fontSize: 15,
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: '#475569',
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  modeHeaderRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modeBadge: {
    backgroundColor: '#E0F2FE',
    color: '#0369A1',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryValue: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryMeta: {
    marginTop: 6,
    color: '#475569',
    fontSize: 15,
  },
  primaryButton: {
    marginTop: 22,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
