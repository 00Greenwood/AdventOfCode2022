import { Beacon } from './Beacon';
import { Position } from './Position';

export interface Sensor extends Position {
  beacon: Beacon;
  distance: number;
}
