import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

type Type = 'AIR' | 'ROCK' | 'SAND';

type Grid = Record<number, Record<number, Type>>;

export class Day14 extends Day {
  public constructor() {
    super('Day14');
  }

  private parseInput(input: string): Grid {
    const grid: Grid = {};
    input.split('\n').forEach((line) => {
      const positions: Position[] = line.split(' -> ').map((positions) => {
        const values = positions.split(',').map((value) => parseInt(value));
        return { x: values[0], y: values[1] };
      });
      let start = positions[0];

      for (let i = 1; i < positions.length; i++) {
        const end = positions[i];
        for (let j = start.x; j <= end.x; j++) {
          if (!grid[j]) grid[j] = {};
          grid[j][end.y] = 'ROCK';
        }
        for (let j = start.x; j >= end.x; j--) {
          if (!grid[j]) grid[j] = {};
          grid[j][end.y] = 'ROCK';
        }
        for (let j = start.y; j <= end.y; j++) {
          if (!grid[end.x]) grid[end.x] = {};
          grid[end.x][j] = 'ROCK';
        }
        for (let j = start.y; j >= end.y; j--) {
          if (!grid[end.x]) grid[end.x] = {};
          grid[end.x][j] = 'ROCK';
        }
        start = end;
      }
    });

    return grid;
  }

  private moveDown(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x][y + 1] || grid[x][y + 1] === 'AIR') {
      grid[x][y + 1] = 'SAND';
      grid[x][y] = 'AIR';
      return true;
    }
    return false;
  }

  private moveDownLeft(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x - 1]) grid[x - 1] = {};
    if (!grid[x - 1][y + 1] || grid[x - 1][y + 1] === 'AIR') {
      grid[x - 1][y + 1] = 'SAND';
      grid[x][y] = 'AIR';
      return true;
    }
    return false;
  }

  private moveDownRight(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x + 1]) grid[x + 1] = {};
    if (!grid[x + 1][y + 1] || grid[x + 1][y + 1] === 'AIR') {
      grid[x + 1][y + 1] = 'SAND';
      grid[x][y] = 'AIR';
      return true;
    }
    return false;
  }

  private findLowestFloor(grid: Grid): number {
    const values = new Set<number>();
    Object.values(grid).forEach((row) => Object.keys(row).forEach((key) => values.add(parseInt(key))));
    return Math.max(...values);
  }

  private createSand(grid: Grid): Position {
    const pointer: Position = { x: 500, y: 0 };
    if (!grid[pointer.x]) grid[pointer.x] = {};
    grid[pointer.x][pointer.y] = 'SAND';
    return pointer;
  }

  private simulateSand(
    grid: Grid,
    pointer: Position,
    bottom: number,
    onReturn?: (grid: Grid, x: number, y: number) => void
  ) {
    const { x, y } = pointer;

    if (y > bottom) {
      onReturn?.(grid, x, y);
      return;
    }

    if (this.moveDown(grid, pointer)) {
      this.simulateSand(grid, { x: x, y: y + 1 }, bottom, onReturn);
    } else if (this.moveDownLeft(grid, pointer)) {
      this.simulateSand(grid, { x: x - 1, y: y + 1 }, bottom, onReturn);
    } else if (this.moveDownRight(grid, pointer)) {
      this.simulateSand(grid, { x: x + 1, y: y + 1 }, bottom, onReturn);
    }
  }

  private countSand(grid: Grid): number {
    return Object.values(grid).reduce(
      (total, row) => total + Object.values(row).reduce((subTotal, value) => subTotal + (value === 'SAND' ? 1 : 0), 0),
      0
    );
  }

  public async solvePartOne(input: string): Output {
    const grid = this.parseInput(input);
    const bottom = this.findLowestFloor(grid);

    let simulating = true;
    while (simulating) {
      const pointer = this.createSand(grid);

      const onReturn = (grid: Grid, x: number, y: number) => {
        grid[x][y] = 'AIR';
        simulating = false;
      };

      this.simulateSand(grid, pointer, bottom, onReturn);
    }

    return this.countSand(grid);
  }

  public async solvePartTwo(input: string): Output {
    const grid = this.parseInput(input);
    const bottom = this.findLowestFloor(grid);

    const simulating = true;
    while (simulating) {
      if (grid[500][0] === 'SAND') {
        break;
      }

      const pointer = this.createSand(grid);
      this.simulateSand(grid, pointer, bottom);
    }

    return this.countSand(grid);
  }
}
