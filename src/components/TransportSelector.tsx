import { create } from 'zustand';
import { RouteSummary, TransportMode } from '../types';

type TripStore = {
  origin: string;
  destination: string;
  mode: TransportMode;
  route: RouteSummary | null;
  setTrip: (params: { origin: string; destination: string; mode: TransportMode }) => void;
  setRoute: (route: RouteSummary) => void;
  resetRoute: () => void;
};

export const useTripStore = create<TripStore>((set) => ({
  origin: 'Av. Reforma 120',
  destination: 'Parque Central',
  mode: 'auto',
  route: null,
  setTrip: ({ origin, destination, mode }) => set({ origin, destination, mode }),
  setRoute: (route) => set({ route }),
  resetRoute: () => set({ route: null }),
}));
