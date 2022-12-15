import path, { resolve } from 'path';
import { Worker, workerData } from 'worker_threads';
import { Day, Output } from '../Day';
import { Beacon } from '../interfaces/Beacon';
import { Range } from '../interfaces/Range';
import { Sensor } from '../interfaces/Sensors';
import { calculateDistance } from '../utilities/calculateDistance';

export class Day15 extends Day {
  x?: number;
  y?: number;

  constructor() {
    super('Day15');
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
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
    sensors = sensors.sort((a, b) => b.distance - a.distance);

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

    if (!this.y) {
      throw new Error('Y should be defined!');
    }
    const y = this.y;

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

    if (!this.x || !this.y) {
      throw new Error('X and Y should be defined!');
    }
    const x = this.x;

    return await new Promise<number>((resolve, reject) => {
      const worker = new Worker(path.resolve(__dirname, '../workers/findBeacon.js'), {
        workerData: {
          path: './findBeacon.ts',
          sensors,
          y: this.y,
        },
      });

      worker.on('message', (data) => {
        worker.terminate();
        resolve(data);
      });

      worker.on('error', (error) => {
        worker.terminate();
        reject(error);
      });

      const range: Range = { lower: 0, upper: x };
      worker.postMessage(range);
    });
  }
}
