import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

type IterateDirection = (pos: Position) => Position;

export class Day8 extends Day {
  private width = 0;
  private height = 0;
  private trees: number[][] = [];

  public constructor() {
    super('Day8');
  }

  private parseInput(input: string): number[][] {
    return input.split('\n').map((line) => line.split('').map((char) => parseInt(char)));
  }

  private isWithinBoundary(pos: Position): boolean {
    return pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height;
  }

  private iterateUp(pos: Position): Position {
    return { x: pos.x, y: pos.y - 1 };
  }

  private iterateDown(pos: Position): Position {
    return { x: pos.x, y: pos.y + 1 };
  }

  private iterateLeft(pos: Position): Position {
    return { x: pos.x - 1, y: pos.y };
  }

  private iterateRight(pos: Position): Position {
    return { x: pos.x + 1, y: pos.y };
  }

  private isVisibleFromDirection(height: number, pos: Position, iterateDirection: IterateDirection): boolean {
    let nextPos = iterateDirection(pos);
    while (this.isWithinBoundary(nextPos) && this.trees[nextPos.x][nextPos.y] < height) {
      nextPos = iterateDirection(nextPos);
    }
    return !this.isWithinBoundary(nextPos);
  }

  private isVisible(pos: Position): boolean {
    const height = this.trees[pos.x][pos.y];
    return (
      this.isVisibleFromDirection(height, pos, this.iterateUp) ||
      this.isVisibleFromDirection(height, pos, this.iterateDown) ||
      this.isVisibleFromDirection(height, pos, this.iterateLeft) ||
      this.isVisibleFromDirection(height, pos, this.iterateRight)
    );
  }

  private countVisibleDirection(height: number, pos: Position, iterateDirection: IterateDirection): number {
    let nextPos = iterateDirection(pos);
    let count = 0;
    while (this.isWithinBoundary(nextPos) && this.trees[nextPos.x][nextPos.y] < height) {
      count++;
      nextPos = iterateDirection(nextPos);
    }
    if (this.isWithinBoundary(nextPos)) {
      count++;
    }
    return count;
  }

  private countVisible(pos: Position): number {
    const height = this.trees[pos.x][pos.y];

    return (
      this.countVisibleDirection(height, pos, this.iterateUp) *
      this.countVisibleDirection(height, pos, this.iterateDown) *
      this.countVisibleDirection(height, pos, this.iterateLeft) *
      this.countVisibleDirection(height, pos, this.iterateRight)
    );
  }

  public solvePartOne(input: string): Output {
    this.trees = this.parseInput(input);
    this.width = this.trees.length;
    this.height = this.trees[0].length;
    let count = this.width * 2 + this.height * 2 - 4;

    for (let i = 1; i < this.width - 1; i++) {
      for (let j = 1; j < this.height - 1; j++) {
        if (this.isVisible({ x: i, y: j })) {
          count++;
        }
      }
    }
    return count;
  }

  public solvePartTwo(input: string): Output {
    this.trees = this.parseInput(input);
    this.width = this.trees.length;
    this.height = this.trees[0].length;
    const maximum = new Set<number>();

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        maximum.add(this.countVisible({ x: i, y: j }));
      }
    }
    return Math.max(...maximum);
  }
}
