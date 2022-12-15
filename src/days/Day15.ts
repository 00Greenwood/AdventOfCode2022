import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';
import { calculateDistance } from '../utilities/calculateDistance';

type Beacon = Position;

interface Sensor extends Position {
  beacon: Beacon;
  distance: number;
}

export class Day15 extends Day {
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;

  constructor() {
    super('Day15');
  }

  setXRange(minX: number, maxX: number) {
    this.minX = minX;
    this.maxX = maxX;
  }

  setYRange(minY: number, maxY: number) {
    this.minY = minY;
    this.maxY = maxY;
  }

  parseInput(input: string): { sensors: Sensor[]; beacons: Beacon[] } {
    const beacons: Beacon[] = [];
    let sensors: Sensor[] = [];
    input.split('\n').forEach((line) => {
      const matches = [...line.matchAll(/-?\d+/g)];

      let beacon: Beacon | undefined;
      {
        const x = parseInt(matches[2][0]);
        const y = parseInt(matches[3][0]);
        beacon = beacons.find((beacon) => beacon.x === x && beacon.y === y);
        if (!beacon) {
          beacon = { x, y };
          beacons.push(beacon);
        }
      }

      {
        const x = parseInt(matches[0][0]);
        const y = parseInt(matches[1][0]);
        const distance = calculateDistance({ x, y }, beacon);
        sensors.push({ x: parseInt(matches[0][0]), y: parseInt(matches[1][0]), beacon, distance });
      }
    });

    // Sorting sensors to be ordered
    sensors = sensors.sort((a, b) => a.y - b.y);
    sensors = sensors.sort((a, b) => a.x - b.x);

    return { sensors, beacons };
  }

  findLeft(sensors: Sensor[], y: number): number {
    const lefts = sensors.map((sensor) => sensor.x - (sensor.distance - Math.abs(sensor.y - y)));
    return Math.min(...lefts);
  }

  findRight(sensors: Sensor[], y: number): number {
    const rights = sensors.map((sensor) => sensor.x + (sensor.distance - Math.abs(sensor.y - y)));
    return Math.max(...rights);
  }

  public async solvePartOne(input: string): Output {
    const { sensors, beacons } = this.parseInput(input);

    if (this.minY === undefined || this.maxY === undefined || this.minY !== this.maxY) {
      throw new Error('Min and Max of Y should be defined!');
    }
    const y = this.minY;

    let count = 0;
    for (let x = this.findLeft(sensors, y); x <= this.findRight(sensors, y); x++) {
      const sensor = sensors.find((sensor) => calculateDistance(sensor, { x, y }) <= sensor.distance);
      if (!sensor) {
        continue;
      }
      // Skip forward the rest of the values in the sensor.
      const skip = sensor.x - x + sensor.distance - Math.abs(sensor.y - y);
      count += skip + 1;
      x += skip;
    }

    // Remove any beacons on the line.
    beacons.forEach((beacon) => {
      if (beacon.y === y) count--;
    });

    return count;
  }

  public async solvePartTwo(input: string): Output {
    const { sensors } = this.parseInput(input);

    if (this.minX === undefined || this.maxX === undefined || this.minY === undefined || this.maxY === undefined) {
      throw new Error('Min and Max of X and Y should be defined!');
    }

    for (let x = this.minX; x <= this.maxX; x++) {
      for (let y = this.minY; y <= this.maxY; y++) {
        const sensor = sensors.find((sensor) => calculateDistance(sensor, { x, y }) <= sensor.distance);
        if (!sensor) {
          return 4000000 * x + y;
        }
        // Skip forward the rest of the values in the sensor.
        const skip = sensor.y - y + sensor.distance - Math.abs(sensor.x - x);
        y += skip;
      }
    }

    throw new Error('Unable to find Beacon');
  }
}
