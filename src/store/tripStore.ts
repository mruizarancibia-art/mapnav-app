import { getModeProfile, getRouteSteps } from '../data/transportModes';
import { RouteCoordinate, RouteSummary, TransportMode } from '../types';

const fallbackRouteCoordinates: Record<TransportMode, RouteCoordinate[]> = {
  auto: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.4405, longitude: -99.1312 },
    { latitude: 19.446, longitude: -99.1294 },
    { latitude: 19.454, longitude: -99.117 },
    { latitude: 19.461, longitude: -99.1068 },
  ],
  walk: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.4352, longitude: -99.1292 },
    { latitude: 19.4378, longitude: -99.1234 },
    { latitude: 19.4412, longitude: -99.1182 },
    { latitude: 19.446, longitude: -99.1133 },
  ],
  moto: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.4384, longitude: -99.1278 },
    { latitude: 19.4445, longitude: -99.1213 },
    { latitude: 19.4519, longitude: -99.1152 },
    { latitude: 19.4584, longitude: -99.1098 },
  ],
  scooter: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.4368, longitude: -99.1287 },
    { latitude: 19.4405, longitude: -99.1228 },
    { latitude: 19.4452, longitude: -99.117 },
    { latitude: 19.4496, longitude: -99.1119 },
  ],
  metro: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.439, longitude: -99.1287 },
    { latitude: 19.4438, longitude: -99.1238 },
    { latitude: 19.4465, longitude: -99.1169 },
    { latitude: 19.451, longitude: -99.1104 },
  ],
};

const fallbackDurations: Record<TransportMode, string> = {
  auto: '18 min',
  walk: '31 min',
  moto: '15 min',
  scooter: '20 min',
  metro: '24 min',
};

const fallbackDistances: Record<TransportMode, string> = {
  auto: '12.4 km',
  walk: '2.8 km',
  moto: '11.1 km',
  scooter: '10.7 km',
  metro: '9.8 km',
};

const fallbackTraffic: Record<TransportMode, string> = {
  auto: 'Con tráfico',
  walk: 'Sin tráfico',
  moto: 'Moderado',
  scooter: 'Mayor flujo',
  metro: 'Horario pesado',
};

const formatCoordinates = (coordinates: { latitude: number; longitude: number }[]) =>
  coordinates.map((coord) => ({
    latitude: coord.latitude,
    longitude: coord.longitude,
  }));

export async function fetchRoute({
  origin,
  destination,
  mode,
}: {
  origin: string;
  destination: string;
  mode: TransportMode;
}): Promise<RouteSummary> {
  const token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;
  const profile = getModeProfile(mode);

  if (token && token !== 'your_mapbox_token_here') {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin};${destination}?geometries=geojson&steps=true&access_token=${token}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const route = data.routes?.[0];

        if (route) {
          const coordinates = route.geometry.coordinates.map(([lng, lat]: number[]) => ({
            latitude: lat,
            longitude: lng,
          }));

          const steps = route.legs?.[0]?.steps?.map((step: any) => ({
            instruction: step.maneuver?.instruction ?? 'Sigue la ruta',
            street: step.name || 'Calle principal',
            distance: `${(step.distance / 1000).toFixed(1)} km`,
            duration: `${Math.max(1, Math.round(step.duration / 60))} min`,
          })) ?? getRouteSteps(mode);

          return {
            origin,
            destination,
            duration: `${Math.max(1, Math.round(route.duration / 60))} min`,
            distance: `${(route.distance / 1000).toFixed(1)} km`,
            traffic: 'Con tráfico en vivo',
            coordinates,
            steps,
          };
        }
      }
    } catch (error) {
      console.warn('Mapbox route fetch failed, falling back to demo route', error);
    }
  }

  return {
    origin,
    destination,
    duration: fallbackDurations[mode],
    distance: fallbackDistances[mode],
    traffic: fallbackTraffic[mode],
    coordinates: formatCoordinates(fallbackRouteCoordinates[mode]),
    steps: getRouteSteps(mode),
  };
}
