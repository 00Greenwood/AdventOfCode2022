import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

enum Direction {
  'RIGHT' = 0,
  'DOWN' = 1,
  'LEFT' = 2,
  'UP' = 3,
}

const directionMap: Record<Direction, (position: Location) => Location> = {
  0: ({ x, y, direction }: Location) => ({ x: x + 1, y, direction }),
  1: ({ x, y, direction }: Location) => ({ x, y: y + 1, direction }),
  2: ({ x, y, direction }: Location) => ({ x: x - 1, y, direction }),
  3: ({ x, y, direction }: Location) => ({ x, y: y - 1, direction }),
};

type Tile = 'SOLID' | 'AIR';
type Tiles = Map<number, Map<number, Tile>>;

interface Location extends Position {
  direction: Direction;
}

type Turn = 'L' | 'R';
type Instruction = number | Turn;

type OutOfBoundsTransformer = (position: Location) => void;

const move = (tiles: Tiles, location: Location, distance: number, transformer: OutOfBoundsTransformer) => {
  for (let i = 0; i < distance; i++) {
    const nextPosition = directionMap[location.direction](location);

    let nextRow = tiles.get(nextPosition.y);
    if (nextRow === undefined || !nextRow.has(nextPosition.x)) {
      // Next position is out-of-bound, wrap!
      transformer(nextPosition);
      nextRow = tiles.get(nextPosition.y);
    }

    if (!nextRow) {
      throw new Error('Unable to find next Row');
    }

    if (nextRow.get(nextPosition.x) === 'SOLID') {
      // Next position is solid!
      break;
    }

    location.x = nextPosition.x;
    location.y = nextPosition.y;
  }
};

const turnClockwise = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
  }
};

const turnCounterClockwise = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.UP;
  }
};

const turn = (location: Location, turn: Turn) => {
  location.direction = turn === 'R' ? turnClockwise(location.direction) : turnCounterClockwise(location.direction);
};

const followInstruction = (
  tiles: Tiles,
  location: Location,
  instruction: Instruction,
  transformer: OutOfBoundsTransformer
) => {
  if (Number.isInteger(instruction)) {
    move(tiles, location, instruction as number, transformer);
  } else {
    turn(location, instruction as Turn);
  }
};

export class Day22 extends Day {
  public constructor() {
    super('Day22');
  }

  private parseInput(input: string): { tiles: Tiles; instructions: Instruction[] } {
    const sections = input.split('\n\n');

    const tiles: Tiles = new Map();
    sections[0].split('\n').forEach((line, y) => {
      line.split('').forEach((char, x) => {
        if (!tiles.has(y + 1)) tiles.set(y + 1, new Map());
        switch (char) {
          case ' ':
            break;
          case '.':
            tiles.get(y + 1)?.set(x + 1, 'AIR');
            break;
          case '#':
            tiles.get(y + 1)?.set(x + 1, 'SOLID');
            break;
        }
      });
    });

    const distanceMatches = [...sections[1].matchAll(/\d+/g)];
    const turnMatches = [...sections[1].matchAll(/(L|R)/g)];
    const instructions: Instruction[] = [];
    for (let i = 0; i < turnMatches.length; i++) {
      const distance = distanceMatches[i][0];
      instructions.push(parseInt(distance));
      const turn = turnMatches[i][0];
      instructions.push(turn as Turn);
    }
    const finalDistance = distanceMatches.at(-1)?.[0];
    if (finalDistance) instructions.push(parseInt(finalDistance));

    return { tiles, instructions };
  }

  public solvePartOne(input: string): Output {
    const { tiles, instructions } = this.parseInput(input);

    const partOneTransformer: OutOfBoundsTransformer = (position: Location) => {
      switch (position.direction) {
        case Direction.RIGHT: {
          const row = tiles.get(position.y);
          if (!row) throw new Error('Unable to find Row!');
          position.x = Math.min(...row.keys());
          break;
        }
        case Direction.DOWN: {
          const yValues = [...tiles.keys()].filter((key) => {
            const row = tiles.get(key);
            if (!row) throw new Error('Unable to find Row!');
            return row.has(position.x);
          });
          position.y = Math.min(...yValues);
          break;
        }
        case Direction.LEFT: {
          const row = tiles.get(position.y);
          if (!row) throw new Error('Unable to find Row!');
          position.x = Math.max(...row.keys());
          break;
        }

        case Direction.UP: {
          const yValues = [...tiles.keys()].filter((key) => {
            const row = tiles.get(key);
            if (!row) throw new Error('Unable to find Row!');
            return row.has(position.x);
          });
          position.y = Math.max(...yValues);
          break;
        }
      }
    };

    const startRow = tiles.get(1);
    if (!startRow) throw new Error('Unable to find Row!');
    const x = Math.min(...startRow.keys());

    const position: Location = { x, y: 1, direction: Direction.RIGHT };
    for (const instruction of instructions) {
      followInstruction(tiles, position, instruction, partOneTransformer);
    }
    return 1000 * position.y + 4 * position.x + position.direction;
  }

  public solvePartTwo(input: string): Output {
    const { tiles, instructions } = this.parseInput(input);

    const partTwoTransformer: OutOfBoundsTransformer = (position: Location) => {
      switch (position.direction) {
        case Direction.RIGHT: {
          const row = tiles.get(position.y);
          if (!row) throw new Error('Unable to find Row!');
          position.x = Math.min(...row.keys());
          break;
        }
        case Direction.DOWN: {
          const yValues = [...tiles.keys()].filter((key) => {
            const row = tiles.get(key);
            if (!row) throw new Error('Unable to find Row!');
            return row.has(position.x);
          });
          position.y = Math.min(...yValues);
          break;
        }
        case Direction.LEFT: {
          const row = tiles.get(position.y);
          if (!row) throw new Error('Unable to find Row!');
          position.x = Math.max(...row.keys());
          break;
        }

        case Direction.UP: {
          const yValues = [...tiles.keys()].filter((key) => {
            const row = tiles.get(key);
            if (!row) throw new Error('Unable to find Row!');
            return row.has(position.x);
          });
          position.y = Math.max(...yValues);
          break;
        }
      }
    };

    const startRow = tiles.get(1);
    if (!startRow) throw new Error('Unable to find Row!');
    const x = Math.min(...startRow.keys());

    const position: Location = { x, y: 1, direction: Direction.RIGHT };
    for (const instruction of instructions) {
      followInstruction(tiles, position, instruction, partTwoTransformer);
    }
    return 1000 * position.y + 4 * position.x + position.direction;
  }
}
