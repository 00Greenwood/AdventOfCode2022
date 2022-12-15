import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

interface Location extends Position {
  height: number;
  value: number;
}

type Grid = Location[][];

export class Day12 extends Day {
  constructor() {
    super('Day12');
  }

  parseInput(input: string): Grid {
    return input
      .split('\n')
      .map((line, i) =>
        line
          .split('')
          .map((char, j) => ({ x: i, y: j, height: char.charCodeAt(0) - 96, value: Number.MAX_SAFE_INTEGER }))
      );
  }

  findStart(grid: Grid): Location {
    for (const row of grid) {
      for (const entry of row) {
        if (entry.height === 'S'.charCodeAt(0) - 96) {
          entry.height = 'a'.charCodeAt(0) - 97;
          entry.value = 0;
          return entry;
        }
      }
    }
    throw Error('Unable to find Start!');
  }

  findEnd(grid: Grid): Location {
    for (const row of grid) {
      for (const entry of row) {
        if (entry.height === 'E'.charCodeAt(0) - 96) {
          entry.height = 'z'.charCodeAt(0) - 95;
          return entry;
        }
      }
    }
    throw Error('Unable to find End!');
  }

  isWithinBoundary(x: number, y: number, grid: Grid): boolean {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
  }

  checkRight(previous: Location, grid: Grid) {
    const { x, y } = previous;
    if (this.isWithinBoundary(x + 1, y, grid)) {
      this.checkPosition(grid[x + 1][y], previous, grid);
    }
  }

  checkLeft(previous: Location, grid: Grid) {
    const { x, y } = previous;
    if (this.isWithinBoundary(x - 1, y, grid)) {
      this.checkPosition(grid[x - 1][y], previous, grid);
    }
  }

  checkUp(previous: Location, grid: Grid) {
    const { x, y } = previous;
    if (this.isWithinBoundary(x, y + 1, grid)) {
      this.checkPosition(grid[x][y + 1], previous, grid);
    }
  }

  checkDown(previous: Location, grid: Grid) {
    const { x, y } = previous;
    if (this.isWithinBoundary(x, y - 1, grid)) {
      this.checkPosition(grid[x][y - 1], previous, grid);
    }
  }

  checkPosition(next: Location, previous: Location, grid: Grid) {
    if (next.height <= previous.height + 1 && next.value > previous.value + 1) {
      next.value = previous.value + 1;

      this.checkLeft(next, grid);
      this.checkUp(next, grid);
      this.checkDown(next, grid);
      this.checkRight(next, grid);
    }
  }

  public async solvePartOne(input: string): Output {
    const grid = this.parseInput(input);
    const start = this.findStart(grid);
    const end = this.findEnd(grid);

    this.checkLeft(start, grid);
    this.checkUp(start, grid);
    this.checkDown(start, grid);
    this.checkRight(start, grid);

    return end.value;
  }

  public async solvePartTwo(input: string): Output {
    const grid = this.parseInput(input);
    const start = this.findStart(grid);
    start.height = 1;
    const end = this.findEnd(grid);

    for (const row of grid) {
      for (const entry of row) {
        if (entry.height === 1) entry.value = 0;
      }
    }

    for (const row of grid) {
      for (const entry of row) {
        if (entry.height === 1) {
          this.checkLeft(entry, grid);
          this.checkUp(entry, grid);
          this.checkDown(entry, grid);
          this.checkRight(entry, grid);
        }
      }
    }

    return end.value;
  }
}
