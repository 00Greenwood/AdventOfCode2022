import { Position } from '../interfaces/Position';

export const calculateDistance = (one: Position, two: Position): number => {
  return Math.abs(two.x - one.x) + Math.abs(two.y - one.y);
};
