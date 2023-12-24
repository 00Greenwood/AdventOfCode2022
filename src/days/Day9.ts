import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

interface Motion {
  direction: string;
  steps: number;
}

export class Day9 extends Day {
  private lastIndex = 0;
  private knots: Position[] = [];
  private positions = new Set<string>(['0, 0']);

  public constructor() {
    super('Day9');
  }

  private reset(numberOfKnots: number) {
    this.lastIndex = numberOfKnots - 1;
    this.knots = [];

    for (let i = 0; i < numberOfKnots; i++) {
      this.knots.push({ x: 0, y: 0 });
    }
    this.positions = new Set<string>(['0, 0']);
  }

  private parseInput(input: string): Motion[] {
    return input.split('\n').map((line) => {
      const inputs = line.split(' ');
      return { direction: inputs[0], steps: parseInt(inputs[1]) };
    });
  }

  private moveUp({ x, y }: Position): Position {
    return { x, y: y + 1 };
  }

  private moveDown({ x, y }: Position): Position {
    return { x, y: y - 1 };
  }

  private moveLeft({ x, y }: Position): Position {
    return { x: x - 1, y };
  }

  private moveRight({ x, y }: Position): Position {
    return { x: x + 1, y };
  }

  private isKnotTouching(index: number): boolean {
    return (
      this.knots[index].x >= this.knots[index - 1].x - 1 &&
      this.knots[index].x <= this.knots[index - 1].x + 1 &&
      this.knots[index].y >= this.knots[index - 1].y - 1 &&
      this.knots[index].y <= this.knots[index - 1].y + 1
    );
  }

  private updateKnot(index: number) {
    const diffX = this.knots[index - 1].x - this.knots[index].x;
    const diffY = this.knots[index - 1].y - this.knots[index].y;
    if (diffY > 0) {
      this.knots[index] = this.moveUp(this.knots[index]);
    } else if (diffY < 0) {
      this.knots[index] = this.moveDown(this.knots[index]);
    }

    if (diffX > 0) {
      this.knots[index] = this.moveRight(this.knots[index]);
    } else if (diffX < 0) {
      this.knots[index] = this.moveLeft(this.knots[index]);
    }
  }

  private updateHead({ direction, steps }: Motion) {
    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case 'U':
          this.knots[0] = this.moveUp(this.knots[0]);
          break;
        case 'D':
          this.knots[0] = this.moveDown(this.knots[0]);
          break;
        case 'L':
          this.knots[0] = this.moveLeft(this.knots[0]);
          break;
        case 'R':
          this.knots[0] = this.moveRight(this.knots[0]);
          break;
      }
      for (let i = 1; i < this.knots.length; i++) {
        if (!this.isKnotTouching(i)) {
          this.updateKnot(i);
        }
      }
      this.positions.add(`${this.knots[this.lastIndex].x}, ${this.knots[this.lastIndex].y}`);
    }
  }

  public solvePartOne(input: string): Output {
    this.reset(2);
    const motions = this.parseInput(input);
    motions.forEach((motion) => {
      this.updateHead(motion);
    });
    return this.positions.size;
  }

  public solvePartTwo(input: string): Output {
    this.reset(10);
    const motions = this.parseInput(input);
    motions.forEach((motion) => {
      this.updateHead(motion);
    });
    return this.positions.size;
  }
}
