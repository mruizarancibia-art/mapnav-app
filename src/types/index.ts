export type TransportMode = 'auto' | 'walk' | 'moto' | 'scooter' | 'metro';

export type RootStackParamList = {
  Home: undefined;
  Route: {
    origin: string;
    destination: string;
    mode: TransportMode;
  };
};

export type TransportOption = {
  id: TransportMode;
  label: string;
  eta: string;
  distance: string;
  traffic: string;
  accent: string;
  tag: string;
};

export type RouteStep = {
  instruction: string;
  street: string;
  distance: string;
  duration: string;
};

export type RouteCoordinate = {
  latitude: number;
  longitude: number;
};

export type RouteSummary = {
  duration: string;
  distance: string;
  traffic: string;
  coordinates: RouteCoordinate[];
  steps: RouteStep[];
  origin: string;
  destination: string;
};
