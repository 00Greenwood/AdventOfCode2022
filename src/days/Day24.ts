import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

type Direction = '^' | 'v' | '<' | '>';
interface Blizzard extends Position {
  direction: Direction;
}

type Valley = Map<string, Blizzard[]>;

const updateBlizzard = (blizzard: Blizzard, width: number, height: number) => {
  switch (blizzard.direction) {
    case '^':
      blizzard.y -= 1;
      if (blizzard.y < 0) blizzard.y += height;
      return;
    case 'v':
      blizzard.y += 1;
      if (blizzard.y >= height) blizzard.y = 0;
      return;
    case '<':
      blizzard.x -= 1;
      if (blizzard.x < 0) blizzard.x += width;
      return;
    case '>':
      blizzard.x += 1;
      if (blizzard.x >= width) blizzard.x = 0;
      return;
  }
};

const updateBlizzards = (valley: Valley, width: number, height: number) => {
  const updated: Blizzard[] = [];
  for (const blizzards of valley.values()) {
    if (!Array.isArray(blizzards)) continue;
    let blizzard = blizzards.pop();
    while (blizzard) {
      updateBlizzard(blizzard, width, height);
      updated.push(blizzard);
      blizzard = blizzards.pop();
    }
  }
  for (const blizzard of updated) {
    const blizzards = valley.get(`${blizzard.x},${blizzard.y}`);
    if (!blizzards) throw new Error('Unable to find Blizzards!');
    blizzards.push(blizzard);
  }
};

const canMove = (valley: Valley, { x, y }: Position) => {
  const blizzards = valley.get(`${x},${y}`);
  if (!blizzards) return false; // Wall!
  return blizzards.length === 0;
};

const findPositionsToCheck = (valley: Valley, position: Position): Position[] => {
  const { x, y } = position;

  const positions: Position[] = [];

  const downPosition = { x, y: y + 1 };
  if (canMove(valley, downPosition)) positions.push(downPosition);

  const rightPosition = { x: x + 1, y };
  if (canMove(valley, rightPosition)) positions.push(rightPosition);

  const upPosition = { x, y: y - 1 };
  if (canMove(valley, upPosition)) positions.push(upPosition);

  const leftPosition = { x: x - 1, y };
  if (canMove(valley, leftPosition)) positions.push(leftPosition);

  // Wait!
  if (canMove(valley, position)) positions.push(position);

  return positions;
};

const findPath = (valley: Valley, start: Position, end: Position, width: number, height: number): number => {
  let positionsToCheck: Position[] = [start];

  let steps = 0;

  while (positionsToCheck.length > 0) {
    const newPositionsToCheck: Position[] = [];

    while (positionsToCheck.length > 0) {
      const positionToCheck = positionsToCheck.pop();
      if (!positionToCheck) throw new Error('Unable to pop off last position!');
      // Check for the end!
      if (positionToCheck.x === end.x && positionToCheck.y === end.y) {
        return steps;
      }
      for (const newPosition of findPositionsToCheck(valley, positionToCheck)) {
        if (!newPositionsToCheck.find((position) => position.x === newPosition.x && position.y === newPosition.y)) {
          newPositionsToCheck.push(newPosition);
        }
      }
    }

    steps++;
    updateBlizzards(valley, width, height);
    positionsToCheck = newPositionsToCheck;
  }

  throw new Error('Unable to find end!');
};

export class Day24 extends Day {
  public constructor() {
    super('Day24');
  }

  private parseInput(input: string): Valley {
    const valley: Valley = new Map();
    input.split('\n').forEach((line, y) =>
      line.split('').forEach((char, x) => {
        switch (char) {
          case '.':
            valley.set(`${x - 1},${y - 1}`, []);
            break;
          case '#':
            break;
          default:
            valley.set(`${x - 1},${y - 1}`, [{ x: x - 1, y: y - 1, direction: char as Direction }]);
            break;
        }
      })
    );
    return valley;
  }

  public solvePartOne(input: string): Output {
    const valley = this.parseInput(input);

    const height = input.split('\n').length - 2; // Account for Walls!
    const width = (valley.size - 2) / height; // Account for start & end!

    updateBlizzards(valley, width, height);

    const start: Position = { y: -1, x: 0 };
    const end: Position = { y: height, x: width - 1 };

    return findPath(valley, start, end, width, height);
  }

  public solvePartTwo(input: string): Output {
    const valley = this.parseInput(input);

    const height = input.split('\n').length - 2; // Account for Walls!
    const width = (valley.size - 2) / height; // Account for start & end!

    updateBlizzards(valley, width, height);

    const start: Position = { y: -1, x: 0 };
    const end: Position = { y: height, x: width - 1 };

    const tripOne = findPath(valley, start, end, width, height);
    const tripTwo = findPath(valley, end, start, width, height);
    const tripThree = findPath(valley, start, end, width, height);
    return tripOne + tripTwo + tripThree;
  }
}
