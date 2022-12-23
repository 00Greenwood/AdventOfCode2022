import { Day, Output } from '../Day';

//type Face = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN' | 'FRONT' | 'BACK';

type Solid = boolean;

interface Face {
  x: number;
  y: number;
  tiles: Map<number, Map<number, Solid>>;
  neighbors: Map<Direction, Face>;
}

type Faces = Map<number, Map<number, Face>>;

enum Direction {
  'RIGHT' = 0,
  'DOWN' = 1,
  'LEFT' = 2,
  'UP' = 3,
}

interface Position {
  x: number;
  y: number;
  face: Face;
  direction: Direction;
}

type Turn = 'L' | 'R';
type Instruction = number | Turn;

const move = (position: Position, distance: number) => {
  for (let i = 0; i < distance; i++) {
    const nextTile = position.tile.neighbors.get(position.direction);
    if (!nextTile) throw new Error('Unable to find next Tile!');
    if (nextTile.isSolid) break;
    position.tile = nextTile;
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

const turn = (position: Position, turn: Turn) => {
  position.direction = turn === 'R' ? turnClockwise(position.direction) : turnCounterClockwise(position.direction);
};

const followInstruction = (position: Position, instruction: Instruction) => {
  if (Number.isInteger(instruction)) {
    move(position, instruction as number);
  } else {
    turn(position, instruction as Turn);
  }
};

export class Day22 extends Day {
  public constructor() {
    super('Day22');
  }

  private parseFaces(input: string, isCube?: boolean): Faces {
    const faces: Faces = new Map();

    const size = Math.sqrt([...input.matchAll(/(\.|#)/g)].length / 6);
    const lines = input.split('\n');
    const height = lines.length / size;
    const width = Math.max(...lines.map((line) => line.length)) / size;

    for (let i = 0; i < height; i++) {
      const facesRow = new Map<number, Face>();
      for (let j = 0; j < width; j++) {
        const face: Face = {
          x: j,
          y: i,
          tiles: new Map<number, Map<number, Solid>>(),
          neighbors: new Map<Direction, Face>(),
        };
        for (let k = 0; k < size; k++) {
          const y = i * size + k;
          const row = new Map<number, Solid>();
          for (let l = 0; l < size; l++) {
            const x = j * size + l;
            const char = lines[y].charAt(x);
            if (char !== ' ' && char !== '') row.set(l, char === '#');
          }
          if (row.size > 0) face.tiles.set(k, row);
        }
        if (face.tiles.size > 0) facesRow.set(j, face);
      }
      if (facesRow.size > 0) faces.set(i, facesRow);
    }

    if (isCube) {
      // link Cube!
    }

    for (let i = 0; i < height; i++) {
      const row = faces.get(i);
      if (!row) continue;

      const farLeftIndex = Math.min(...row.keys());
      const farRightIndex = Math.max(...row.keys());

      for (let j = 0; j < width; j++) {
        const entry = row.get(j);
        if (!entry) continue;

        const possibleRowsIndex = [...faces.keys()].filter((key) => faces.get(key)?.has(j));
        const farUpIndex = Math.min(...possibleRowsIndex);
        const farDownIndex = Math.max(...possibleRowsIndex);

        if (!entry.neighbors.has(Direction.RIGHT)) {
          const right = row.get(j + 1) ?? row.get(farLeftIndex);
          if (!right) throw new Error('Unable to find Right!');
          entry.neighbors.set(Direction.RIGHT, right);
        }
        if (!entry.neighbors.has(Direction.LEFT)) {
          const left = row.get(j - 1) ?? row.get(farRightIndex);
          if (!left) throw new Error('Unable to find Left!');
          entry.neighbors.set(Direction.LEFT, left);
        }
        if (!entry.neighbors.has(Direction.DOWN)) {
          const downRow = faces.get(i + 1) ?? faces.get(farUpIndex);
          if (!downRow) throw new Error('Unable to find Down!');
          const down = downRow.get(j);
          if (!down) throw new Error('Unable to find Down!');
          entry.neighbors.set(Direction.DOWN, down);
        }
        if (!entry.neighbors.has(Direction.UP)) {
          const upRow = faces.get(i - 1) ?? faces.get(farDownIndex);
          if (!upRow) throw new Error('Unable to find Up!');
          const up = upRow.get(j);
          if (!up) throw new Error('Unable to find Up!');
          entry.neighbors.set(Direction.UP, up);
        }
      }
    }

    return faces;
  }

  private parseInput(input: string, isCube?: boolean): { startPosition: Position; instructions: Instruction[] } {
    const sections = input.split('\n\n');
    const faces = this.parseFaces(sections[0], isCube);

    const distanceMatches = [...sections[1].matchAll(/\d+/g)];
    const turnMatches = [...sections[1].matchAll(/(L|R)/g)];
    const instructions: Instruction[] = [];
    for (let i = 0; i < turnMatches.length; i++) {
      const distance = distanceMatches[i][0];
      instructions.push(parseInt(distance));
      const turn = turnMatches[i][0];
      instructions.push(turn === 'L' ? 'L' : 'R');
    }
    const finalDistance = distanceMatches.at(-1)?.[0];
    if (finalDistance) instructions.push(parseInt(finalDistance));

    return { startPosition: { x: 0, y: 0, face: null, direction: Direction.RIGHT }, instructions };
  }

  public solvePartOne(input: string): Output {
    const { startPosition, instructions } = this.parseInput(input);
    // const position: Position = { tile: startTile, direction: Direction.RIGHT };
    // for (const instruction of instructions) {
    //   followInstruction(position, instruction);
    // }
    // return 1000 * position.tile.y + 4 * position.tile.x + position.direction;
    return 0;
  }

  public solvePartTwo(input: string): Output {
    // const { board, instructions } = this.parseInput(input);
    // const row = getRow(board, 1);
    // const position: Position = { y: 1, x: Math.min(...row.keys()), direction: Direction.RIGHT };
    // for (const instruction of instructions) {
    //   followInstruction(position, instruction, board, true /*= isCube*/);
    // }
    // return 1000 * position.y + 4 * position.x + position.direction;
    return 0;
  }
}
