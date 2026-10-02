import { TransportMode, RouteStep } from '../types';

export const getRouteSteps = (mode: TransportMode): RouteStep[] => {
  switch (mode) {
    case 'auto':
      return [
        { instruction: 'Sal de la avenida principal', street: 'Avenida Reforma', distance: '320 m', duration: '2 min' },
        { instruction: 'Sigue recto por la vía rápida', street: 'Calzada del Sol', distance: '1.2 km', duration: '5 min' },
        { instruction: 'Gira a la derecha', street: 'Calle 9', distance: '420 m', duration: '2 min' },
        { instruction: 'Continúa por la calle del centro', street: 'Calle del Centro', distance: '760 m', duration: '4 min' },
        { instruction: 'Llegada aproximada', street: 'Plaza del Parque', distance: '150 m', duration: '1 min' },
      ];
    case 'walk':
      return [
        { instruction: 'Dirígete hacia el parque', street: 'Paseo de la Paz', distance: '480 m', duration: '6 min' },
        { instruction: 'Cruza la avenida peatonal', street: 'Avenida de los Pinos', distance: '620 m', duration: '8 min' },
        { instruction: 'Gira a la izquierda', street: 'Calle San Ramón', distance: '540 m', duration: '7 min' },
        { instruction: 'Sigue por la zona comercial', street: 'Calle del Mercado', distance: '360 m', duration: '5 min' },
        { instruction: 'Llegada a la plaza central', street: 'Plaza del Parque', distance: '210 m', duration: '3 min' },
      ];
    case 'moto':
      return [
        { instruction: 'Avanza por la avenida principal', street: 'Avenida Reforma', distance: '650 m', duration: '2 min' },
        { instruction: 'Toma la salida hacia el boulevard', street: 'Boulevard Central', distance: '1.6 km', duration: '6 min' },
        { instruction: 'Gira ligeramente a la derecha', street: 'Calle 5', distance: '480 m', duration: '2 min' },
        { instruction: 'Mantente en la vía secundaria', street: 'Calle del Puerto', distance: '900 m', duration: '4 min' },
        { instruction: 'Llegada', street: 'Parque Central', distance: '180 m', duration: '1 min' },
      ];
    case 'scooter':
      return [
        { instruction: 'Sigue por la ciclovía', street: 'Ciclovía Norte', distance: '700 m', duration: '4 min' },
        { instruction: 'Cruza la rotonda', street: 'Rotonda Sur', distance: '520 m', duration: '3 min' },
        { instruction: 'Gira a la izquierda hacia la zona verde', street: 'Calle de la Vereda', distance: '640 m', duration: '4 min' },
        { instruction: 'Continúa recto por la avenida moderna', street: 'Avenida de los Árboles', distance: '750 m', duration: '5 min' },
        { instruction: 'Finaliza en la plaza', street: 'Plaza del Parque', distance: '120 m', duration: '1 min' },
      ];
    case 'metro':
      return [
        { instruction: 'Dirígete a la estación más cercana', street: 'Estación Centro', distance: '340 m', duration: '5 min' },
        { instruction: 'Toma la línea azul', street: 'Línea Azul', distance: '2.1 km', duration: '8 min' },
        { instruction: 'Cambia en estación del parque', street: 'Estación Parque', distance: '500 m', duration: '3 min' },
        { instruction: 'Toma la línea verde', street: 'Línea Verde', distance: '1.4 km', duration: '7 min' },
        { instruction: 'Salga y camine al destino', street: 'Salida del metro', distance: '240 m', duration: '4 min' },
      ];
    default:
      return [];
  }
};

export const getModeProfile = (mode: TransportMode) => {
  switch (mode) {
    case 'auto':
      return 'driving';
    case 'walk':
      return 'walking';
    case 'moto':
      return 'driving';
    case 'scooter':
      return 'cycling';
    case 'metro':
      return 'driving';
    default:
      return 'driving';
  }
};
