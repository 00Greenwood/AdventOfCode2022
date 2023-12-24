import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

type Direction = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';
interface Elf extends Position {
  directions: Direction[];
  proposedPosition?: Position;
}
type Elves = Map<string, Elf>;

const checkMove = (elf: Elf, elves: Elves): string | undefined => {
  {
    const direction = elf.directions.splice(0, 1).at(0);
    if (!direction) throw new Error('Unable to splice off first direction!');
    elf.directions.push(direction);
  }

  if (
    !elves.has(`${elf.x - 1},${elf.y - 1}`) &&
    !elves.has(`${elf.x - 1},${elf.y}`) &&
    !elves.has(`${elf.x - 1},${elf.y + 1}`) &&
    !elves.has(`${elf.x},${elf.y + 1}`) &&
    !elves.has(`${elf.x + 1},${elf.y + 1}`) &&
    !elves.has(`${elf.x + 1},${elf.y}`) &&
    !elves.has(`${elf.x + 1},${elf.y - 1}`) &&
    !elves.has(`${elf.x},${elf.y - 1}`)
  ) {
    // No need to move!
    return undefined;
  }

  for (const direction of elf.directions) {
    switch (direction) {
      case 'NORTH':
        if (
          !elves.has(`${elf.x - 1},${elf.y - 1}`) &&
          !elves.has(`${elf.x},${elf.y - 1}`) &&
          !elves.has(`${elf.x + 1},${elf.y - 1}`)
        ) {
          elf.proposedPosition = { x: elf.x, y: elf.y - 1 };
          return `${elf.x},${elf.y - 1}`;
        }
        break;
      case 'SOUTH':
        if (
          !elves.has(`${elf.x - 1},${elf.y + 1}`) &&
          !elves.has(`${elf.x},${elf.y + 1}`) &&
          !elves.has(`${elf.x + 1},${elf.y + 1}`)
        ) {
          elf.proposedPosition = { x: elf.x, y: elf.y + 1 };
          return `${elf.x},${elf.y + 1}`;
        }
        break;
      case 'WEST':
        if (
          !elves.has(`${elf.x - 1},${elf.y - 1}`) &&
          !elves.has(`${elf.x - 1},${elf.y}`) &&
          !elves.has(`${elf.x - 1},${elf.y + 1}`)
        ) {
          elf.proposedPosition = { x: elf.x - 1, y: elf.y };
          return `${elf.x - 1},${elf.y}`;
        }
        break;
      case 'EAST':
        if (
          !elves.has(`${elf.x + 1},${elf.y - 1}`) &&
          !elves.has(`${elf.x + 1},${elf.y}`) &&
          !elves.has(`${elf.x + 1},${elf.y + 1}`)
        ) {
          elf.proposedPosition = { x: elf.x + 1, y: elf.y };
          return `${elf.x + 1},${elf.y}`;
        }
        break;
    }
  }
  // Unable to move anywhere!
  return undefined;
};

const simulateRound = (elves: Elves): boolean => {
  const proposedMoves = new Map<string, Elf[]>();
  elves.forEach((elf) => {
    const move = checkMove(elf, elves);
    if (!move) return; // Unable to move!
    const movingElves = proposedMoves.get(move);
    if (movingElves) movingElves.push(elf);
    else proposedMoves.set(move, [elf]);
  });

  proposedMoves.forEach((movingElves) => {
    if (movingElves.length > 1) {
      // Multiple moving elves mean do nothing!
      movingElves.forEach((elf) => {
        elf.proposedPosition = undefined;
      });
      return;
    }

    const elf = movingElves.at(0);
    if (!elf) throw new Error('Proposed moves does not have an Elf!');

    if (!elf.proposedPosition) throw new Error('Elf moves does not have a proposed position!');
    elves.delete(`${elf.x},${elf.y}`);
    elf.x = elf.proposedPosition.x;
    elf.y = elf.proposedPosition.y;
    elf.proposedPosition = undefined;
    elves.set(`${elf.x},${elf.y}`, elf);
  });

  return proposedMoves.size > 0;
};

const findBoundingBoxArea = (elves: Elves): number => {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  elves.forEach(({ x, y }) => {
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  });
  return (1 + maxX - minX) * (1 + maxY - minY);
};

export class Day23 extends Day {
  public constructor() {
    super('Day23');
  }

  private parseInput(input: string): Elves {
    const elves: Elves = new Map();
    input.split('\n').forEach((line, y) =>
      line.split('').forEach((char, x) => {
        if (char === '#') elves.set(`${x},${y}`, { x, y, directions: ['EAST', 'NORTH', 'SOUTH', 'WEST'] });
      })
    );
    return elves;
  }

  public solvePartOne(input: string): Output {
    const elves = this.parseInput(input);
    for (let i = 0; i < 10; i++) {
      simulateRound(elves);
    }
    return findBoundingBoxArea(elves) - elves.size;
  }

  public solvePartTwo(input: string): Output {
    const elves = this.parseInput(input);
    let count = 1;
    while (simulateRound(elves)) {
      count++;
    }
    return count;
  }
}
