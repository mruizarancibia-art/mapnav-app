import { TransportOption, TransportMode } from '../types';

export const transportOptions: TransportOption[] = [
  {
    id: 'auto',
    label: 'Auto',
    eta: '18 min',
    distance: '12.4 km',
    traffic: 'Con tráfico',
    accent: '#2563eb',
    tag: 'Rápido',
  },
  {
    id: 'walk',
    label: 'Caminando',
    eta: '31 min',
    distance: '2.8 km',
    traffic: 'Sin tráfico',
    accent: '#10b981',
    tag: 'Salud',
  },
  {
    id: 'moto',
    label: 'Moto',
    eta: '15 min',
    distance: '11.1 km',
    traffic: 'Moderado',
    accent: '#f59e0b',
    tag: 'Ágil',
  },
  {
    id: 'scooter',
    label: 'Scooter',
    eta: '20 min',
    distance: '10.7 km',
    traffic: 'Mayor flujo',
    accent: '#8b5cf6',
    tag: 'Eco',
  },
  {
    id: 'metro',
    label: 'Metro',
    eta: '24 min',
    distance: '9.8 km',
    traffic: 'Horario pesado',
    accent: '#ef4444',
    tag: 'Tránsito',
  },
];

export const getTravelModeLabel = (mode: TransportMode) => {
  return transportOptions.find((option) => option.id === mode)?.label ?? 'Ruta';
};
