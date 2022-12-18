import { Day, Output } from '../Day';
import { Beacon } from '../interfaces/Beacon';
import { Box } from '../interfaces/Box';
import { Position } from '../interfaces/Position';
import { Sensor } from '../interfaces/Sensors';
import { calculateDistance } from '../utilities/calculateDistance';

export class Day15 extends Day {
  private x?: number;
  private y?: number;

  public constructor() {
    super('Day15');
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  private parseInput(input: string): { sensors: Sensor[]; beacons: Beacon[] } {
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

  private findLeft(sensors: Sensor[], y: number): number {
    const lefts = sensors.map((sensor) => sensor.x - (sensor.distance - Math.abs(sensor.y - y)));
    return Math.min(...lefts);
  }

  private findRight(sensors: Sensor[], y: number): number {
    const rights = sensors.map((sensor) => sensor.x + (sensor.distance - Math.abs(sensor.y - y)));
    return Math.max(...rights);
  }

  private contains(sensors: Sensor[], { lowerLeft, lowerRight, upperLeft, upperRight }: Box): boolean {
    for (const sensor of sensors) {
      if (
        calculateDistance(sensor, lowerLeft) <= sensor.distance &&
        calculateDistance(sensor, lowerRight) <= sensor.distance &&
        calculateDistance(sensor, upperLeft) <= sensor.distance &&
        calculateDistance(sensor, upperRight) <= sensor.distance
      )
        return true;
    }
    return false;
  }

  private splitBox({ lowerLeft, lowerRight, upperLeft, upperRight }: Box): {
    lowerLeftBox: Box;
    lowerRightBox: Box;
    upperLeftBox: Box;
    upperRightBox: Box;
  } {
    const lowerX = lowerLeft.x + Math.floor((upperRight.x - lowerLeft.x) / 2);
    const lowerY = lowerLeft.y + Math.floor((upperRight.y - lowerLeft.y) / 2);

    const upperX = lowerX + (upperRight.x === lowerLeft.x ? 0 : 1);
    const upperY = lowerY + (upperRight.y === lowerLeft.y ? 0 : 1);

    return {
      lowerLeftBox: {
        lowerLeft,
        lowerRight: { x: lowerX, y: lowerRight.y },
        upperLeft: { x: upperLeft.x, y: lowerY },
        upperRight: { x: lowerX, y: lowerY },
      },
      lowerRightBox: {
        lowerLeft: { x: upperX, y: lowerLeft.y },
        lowerRight,
        upperLeft: { x: upperX, y: lowerY },
        upperRight: { x: upperRight.x, y: lowerY },
      },
      upperLeftBox: {
        lowerLeft: { x: lowerLeft.x, y: upperY },
        lowerRight: { x: lowerX, y: upperY },
        upperLeft,
        upperRight: { x: lowerX, y: upperRight.y },
      },
      upperRightBox: {
        lowerLeft: { x: upperX, y: upperY },
        lowerRight: { x: lowerRight.x, y: upperY },
        upperLeft: { x: upperX, y: upperLeft.y },
        upperRight,
      },
    };
  }

  private isBoxAPoint({ lowerLeft, upperRight }: Box): boolean {
    return lowerLeft.x === upperRight.x && lowerLeft.y === upperRight.y;
  }

  private findBeacon(sensors: Sensor[], box: Box): Position {
    const boxesToCheck: Box[] = [box];
    let boxToCheck = boxesToCheck.pop();
    while (boxToCheck) {
      if (!this.contains(sensors, boxToCheck)) {
        if (this.isBoxAPoint(boxToCheck)) {
          return boxToCheck.lowerLeft;
        }
        const { lowerLeftBox, lowerRightBox, upperLeftBox, upperRightBox } = this.splitBox(boxToCheck);
        boxesToCheck.push(lowerLeftBox);
        boxesToCheck.push(lowerRightBox);
        boxesToCheck.push(upperLeftBox);
        boxesToCheck.push(upperRightBox);
      }
      boxToCheck = boxesToCheck.pop();
    }

    throw new Error('Unable to find Beacon!');
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

    const box: Box = {
      lowerLeft: { x: 0, y: 0 },
      lowerRight: { x: this.x, y: 0 },
      upperLeft: { x: 0, y: this.y },
      upperRight: { x: this.x, y: this.y },
    };

    const { x, y } = this.findBeacon(sensors, box);

    return x * 4000000 + y;
  }
}
