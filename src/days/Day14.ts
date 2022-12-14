import { Day, Output } from "../Day";

type Type = "AIR" | "ROCK" | "SAND";

type Grid = Record<number, Record<number, Type>>;

interface Position {
  x: number;
  y: number;
}

export class Day14 extends Day {
  constructor() {
    super("Day14");
  }

  parseInput(input: string): Grid {
    const grid: Grid = {};
    input.split("\n").forEach((line) => {
      const positions: Position[] = line.split(" -> ").map((positions) => {
        const values = positions.split(",").map((value) => parseInt(value));
        return { x: values[0], y: values[1] };
      });
      let start = positions[0];

      for (let i = 1; i < positions.length; i++) {
        const end = positions[i];
        for (let j = start.x; j <= end.x; j++) {
          if (!grid[j]) grid[j] = {};
          grid[j][end.y] = "ROCK";
        }
        for (let j = start.x; j >= end.x; j--) {
          if (!grid[j]) grid[j] = {};
          grid[j][end.y] = "ROCK";
        }
        for (let j = start.y; j <= end.y; j++) {
          if (!grid[end.x]) grid[end.x] = {};
          grid[end.x][j] = "ROCK";
        }
        for (let j = start.y; j >= end.y; j--) {
          if (!grid[end.x]) grid[end.x] = {};
          grid[end.x][j] = "ROCK";
        }
        start = end;
      }
    });

    return grid;
  }

  moveDown(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x][y + 1] || grid[x][y + 1] === "AIR") {
      grid[x][y + 1] = "SAND";
      grid[x][y] = "AIR";
      return true;
    }
    return false;
  }

  moveDownLeft(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x - 1]) grid[x - 1] = {};
    if (!grid[x - 1][y + 1] || grid[x - 1][y + 1] === "AIR") {
      grid[x - 1][y + 1] = "SAND";
      grid[x][y] = "AIR";
      return true;
    }
    return false;
  }

  moveDownRight(grid: Grid, { x, y }: Position): boolean {
    if (!grid[x + 1]) grid[x + 1] = {};
    if (!grid[x + 1][y + 1] || grid[x + 1][y + 1] === "AIR") {
      grid[x + 1][y + 1] = "SAND";
      grid[x][y] = "AIR";
      return true;
    }
    return false;
  }

  findLowestFloor(grid: Grid): number {
    const values = new Set<number>();
    Object.values(grid).forEach((row) => Object.keys(row).forEach((key) => values.add(parseInt(key))));
    return Math.max(...values);
  }

  countSand(grid: Grid): number {
    return Object.values(grid).reduce(
      (total, row) => total + Object.values(row).reduce((subTotal, value) => subTotal + (value === "SAND" ? 1 : 0), 0),
      0
    );
  }

  public async solvePartOne(input: string): Output {
    const grid = this.parseInput(input);

    const bottom = this.findLowestFloor(grid);

    let simulating = true;
    while (simulating) {
      let pointer: Position = { x: 500, y: 0 };
      if (!grid[pointer.x]) grid[pointer.x] = {};
      grid[pointer.x][pointer.y] = "SAND";

      let falling = true;
      while (falling) {
        const { x, y } = pointer;

        if (y > bottom) {
          grid[x][y] = "AIR";
          simulating = false;
          break;
        }

        if (this.moveDown(grid, pointer)) {
          pointer = { x: x, y: y + 1 };
          continue;
        }

        if (this.moveDownLeft(grid, pointer)) {
          pointer = { x: x - 1, y: y + 1 };
          continue;
        }

        if (this.moveDownRight(grid, pointer)) {
          pointer = { x: x + 1, y: y + 1 };
          continue;
        }

        falling = false;
      }
    }

    return this.countSand(grid);
  }

  public async solvePartTwo(input: string): Output {
    const grid = this.parseInput(input);

    const bottom = this.findLowestFloor(grid);

    let simulating = true;
    while (simulating) {
      let pointer: Position = { x: 500, y: 0 };
      if (!grid[pointer.x]) grid[pointer.x] = {};

      if (grid[pointer.x][pointer.y] === "SAND") {
        simulating = false;
        break;
      }
      grid[pointer.x][pointer.y] = "SAND";

      let falling = true;
      while (falling) {
        const { x, y } = pointer;

        if (y > bottom) {
          break;
        }

        if (this.moveDown(grid, pointer)) {
          pointer = { x: x, y: y + 1 };
          continue;
        }

        if (this.moveDownLeft(grid, pointer)) {
          pointer = { x: x - 1, y: y + 1 };
          continue;
        }

        if (this.moveDownRight(grid, pointer)) {
          pointer = { x: x + 1, y: y + 1 };
          continue;
        }

        falling = false;
      }
    }

    return this.countSand(grid);
  }
}
