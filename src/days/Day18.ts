import { Day, Output } from '../Day';
import { Point } from '../interfaces/Point';

type Points = Map<string, Point>;

export class Day18 extends Day {
  public constructor() {
    super('Day18');
  }

  private parseInput(input: string): Points {
    const points: Points = new Map();
    input.split('\n').forEach((line) => {
      points.set(line, new Point(line));
    });
    return points;
  }

  private findMinimum(points: Points): Point {
    const values = [...points.values()];
    const minX = Math.min(...values.map((point) => point.x));
    const minY = Math.min(...values.map((point) => point.y));
    const minZ = Math.min(...values.map((point) => point.z));
    return new Point(`${minX - 1},${minY - 1},${minZ - 1}`);
  }

  private findMaximum(points: Points): Point {
    const values = [...points.values()];
    const maxX = Math.max(...values.map((point) => point.x));
    const maxY = Math.max(...values.map((point) => point.y));
    const maxZ = Math.max(...values.map((point) => point.z));
    return new Point(`${maxX + 1},${maxY + 1},${maxZ + 1}`);
  }

  private calculateDistance(first: Point, second: Point): number {
    return Math.abs(second.x - first.x) + Math.abs(second.y - first.y) + Math.abs(second.z - first.z);
  }

  private areTouching(first: Point, second: Point): boolean {
    return this.calculateDistance(first, second) === 1;
  }

  private countSides(points: Points): number {
    let sides = points.size * 6;
    const values = [...points.values()];
    for (let i = 0; i < points.size; i++) {
      for (let j = i + 1; j < points.size; j++) {
        if (this.areTouching(values[i], values[j])) sides -= 2;
      }
    }
    return sides;
  }

  private contains(points: Points, toFind: Point): boolean {
    return points.has(toFind.toString());
  }

  private getConnected(points: Points, start: Point): string[] {
    const connected: string[] = [];
    const pointsToCheck: string[] = [start.toString()];
    let toCheck = pointsToCheck.pop();
    while (toCheck) {
      if (connected.includes(toCheck)) {
        toCheck = pointsToCheck.pop();
        continue;
      }
      connected.push(toCheck);

      const pointToCheck = points.get(toCheck);
      if (!pointToCheck) throw new Error('Unable to find point!');

      const right = points.get(`${pointToCheck.x + 1},${pointToCheck.y},${pointToCheck.z}`);
      if (right) pointsToCheck.push(right.toString());

      const left = points.get(`${pointToCheck.x - 1},${pointToCheck.y},${pointToCheck.z}`);
      if (left) pointsToCheck.push(left.toString());

      const up = points.get(`${pointToCheck.x},${pointToCheck.y},${pointToCheck.z + 1}`);
      if (up) pointsToCheck.push(up.toString());

      const down = points.get(`${pointToCheck.x},${pointToCheck.y},${pointToCheck.z - 1}`);
      if (down) pointsToCheck.push(down.toString());

      const forward = points.get(`${pointToCheck.x},${pointToCheck.y + 1},${pointToCheck.z}`);
      if (forward) pointsToCheck.push(forward.toString());

      const back = points.get(`${pointToCheck.x},${pointToCheck.y - 1},${pointToCheck.z}`);
      if (back) pointsToCheck.push(back.toString());

      toCheck = pointsToCheck.pop();
    }

    return connected;
  }

  public async solvePartOne(input: string): Output {
    const lava = this.parseInput(input);
    return this.countSides(lava);
  }

  public async solvePartTwo(input: string): Output {
    const lava = this.parseInput(input);
    const minimum = this.findMinimum(lava);
    const maximum = this.findMaximum(lava);
    const air: Points = new Map();
    for (let i = minimum.x; i <= maximum.x; i++) {
      for (let j = minimum.y; j <= maximum.y; j++) {
        for (let k = minimum.z; k <= maximum.z; k++) {
          const point = new Point(`${i},${j},${k}`);
          if (!this.contains(lava, point)) air.set(point.toString(), point);
        }
      }
    }

    const toDelete = this.getConnected(air, minimum);
    toDelete.forEach((point) => air.delete(point.toString()));

    return this.countSides(lava) - this.countSides(air);
  }
}
