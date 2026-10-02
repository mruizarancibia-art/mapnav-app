import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RouteMap from '../components/RouteMap';
import { useTripStore } from '../store/tripStore';
import { RootStackParamList } from '../types';

const modeColors = {
  auto: '#2563eb',
  walk: '#10b981',
  moto: '#f59e0b',
  scooter: '#8b5cf6',
  metro: '#ef4444',
};

export default function RouteScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Route'>>();
  const { route: storedRoute } = useTripStore();
  const { origin, destination, mode } = route.params;
  const accent = modeColors[mode];
  const currentRoute = storedRoute ?? {
    origin,
    destination,
    duration: '18 min',
    distance: '12.4 km',
    traffic: 'Con tráfico',
    coordinates: [
      { latitude: 19.4326, longitude: -99.1332 },
      { latitude: 19.4405, longitude: -99.1312 },
      { latitude: 19.446, longitude: -99.1294 },
      { latitude: 19.454, longitude: -99.117 },
      { latitude: 19.461, longitude: -99.1068 },
    ],
    steps: [
      { instruction: 'Sal de la avenida principal', street: 'Avenida Reforma', distance: '320 m', duration: '2 min' },
      { instruction: 'Sigue recto por la vía rápida', street: 'Calzada del Sol', distance: '1.2 km', duration: '5 min' },
      { instruction: 'Gira a la derecha', street: 'Calle 9', distance: '420 m', duration: '2 min' },
      { instruction: 'Llegada aproximada', street: 'Plaza del Parque', distance: '150 m', duration: '1 min' },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Ruta</Text>
        </View>

        <RouteMap route={currentRoute} accent={accent} />

        <View style={styles.summaryCard}>
          <Text style={styles.label}>Trayecto</Text>
          <Text style={styles.routeText}>{origin}</Text>
          <Text style={styles.routeTextSmall}>hasta</Text>
          <Text style={styles.routeText}>{destination}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ETA</Text>
              <Text style={styles.statValue}>{currentRoute.duration}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tráfico</Text>
              <Text style={styles.statValue}>{currentRoute.traffic}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Indicaciones por calle</Text>
          {currentRoute.steps.map((step, index) => (
            <View key={`${step.street}-${index}`} style={styles.stepRow}>
              <View style={[styles.stepDot, { backgroundColor: accent }]} />
              <View style={styles.stepInfo}>
                <Text style={styles.stepInstruction}>{step.instruction}</Text>
                <Text style={styles.stepStreet}>{step.street}</Text>
                <Text style={styles.stepMeta}>{step.distance} · {step.duration}</Text>
              </View>
            </View>
          ))}
        </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#0F172A',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginTop: 18,
  },
  label: {
    color: '#64748B',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  routeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
  },
  routeTextSmall: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginTop: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 4,
    marginRight: 10,
  },
  stepInfo: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepStreet: {
    marginTop: 4,
    fontSize: 13,
    color: '#475569',
  },
  stepMeta: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },
});
