import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { RouteSummary } from '../types';

type Props = {
  route: RouteSummary;
  accent: string;
};

export default function RouteMap({ route, accent }: Props) {
  const origin = route.coordinates[0];
  const destination = route.coordinates[route.coordinates.length - 1];

  const coordinates = route.coordinates.map((point) => ({
    latitude: point.latitude,
    longitude: point.longitude,
  }));

  const region = {
    latitude: origin.latitude,
    longitude: origin.longitude,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  return (
    <View style={styles.card}>
      <MapView style={styles.map} initialRegion={region} region={region} showsUserLocation>
        <Marker coordinate={origin} title="Origen" pinColor="#10b981" />
        <Marker coordinate={destination} title="Destino" pinColor="#ef4444" />
        <Polyline coordinates={coordinates} strokeColor={accent} strokeWidth={5} lineDashPattern={[0]} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 18,
    height: 260,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
