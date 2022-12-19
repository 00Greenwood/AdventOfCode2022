import { Day, Output } from '../Day';
import { Position } from '../interfaces/Position';

type Direction = 'LEFT' | 'RIGHT';
type Type = 'AIR' | 'ROCK';
type Rock = Position[];
type Tunnel = Type[][];

export class Day17 extends Day {
  public constructor() {
    super('Day17');
  }

  private parseInput(input: string): Direction[] {
    return input.split('').map((char) => (char === '>' ? 'RIGHT' : 'LEFT'));
  }

  private createTunnel(): Tunnel {
    return [[], [], [], [], [], [], []];
  }

  private findHighestRock(tunnel: Tunnel): number {
    const highestRocks = tunnel.map((row) => row.lastIndexOf('ROCK'));
    return Math.max(...highestRocks);
  }

  private fillAirGap(tunnel: Tunnel, toFill: number) {
    const highestRock = this.findHighestRock(tunnel);
    for (let i = highestRock + 1; i <= highestRock + toFill; i++) {
      tunnel.forEach((row) => {
        if (highestRock + toFill >= row.length) row.push('AIR');
      });
    }
  }

  private spawnFirstRock(tunnel: Tunnel): Rock {
    this.fillAirGap(tunnel, 4);
    const height = this.findHighestRock(tunnel) + 4;
    return [
      { x: 2, y: height },
      { x: 3, y: height },
      { x: 4, y: height },
      { x: 5, y: height },
    ];
  }

  private spawnSecondRock(tunnel: Tunnel): Rock {
    this.fillAirGap(tunnel, 6);
    const height = this.findHighestRock(tunnel) + 4;
    return [
      { x: 2, y: height + 1 },
      { x: 3, y: height },
      { x: 3, y: height + 1 },
      { x: 3, y: height + 2 },
      { x: 4, y: height + 1 },
    ];
  }

  private spawnThirdRock(tunnel: Tunnel): Rock {
    this.fillAirGap(tunnel, 6);
    const height = this.findHighestRock(tunnel) + 4;
    return [
      { x: 2, y: height },
      { x: 3, y: height },
      { x: 4, y: height },
      { x: 4, y: height + 1 },
      { x: 4, y: height + 2 },
    ];
  }

  private spawnFourthRock(tunnel: Tunnel): Rock {
    this.fillAirGap(tunnel, 7);
    const height = this.findHighestRock(tunnel) + 4;
    return [
      { x: 2, y: height },
      { x: 2, y: height + 1 },
      { x: 2, y: height + 2 },
      { x: 2, y: height + 3 },
    ];
  }

  private spawnFifthRock(tunnel: Tunnel): Rock {
    this.fillAirGap(tunnel, 5);
    const height = this.findHighestRock(tunnel) + 4;
    return [
      { x: 2, y: height },
      { x: 2, y: height + 1 },
      { x: 3, y: height },
      { x: 3, y: height + 1 },
    ];
  }

  private spawnRock(tunnel: Tunnel, index: number): Rock {
    switch (index % 5) {
      case 0:
        return this.spawnFirstRock(tunnel);
      case 1:
        return this.spawnSecondRock(tunnel);
      case 2:
        return this.spawnThirdRock(tunnel);
      case 3:
        return this.spawnFourthRock(tunnel);
      case 4:
        return this.spawnFifthRock(tunnel);
      default:
        throw new Error('Unable to spawn rock!');
    }
  }

  private canMoveLeft(tunnel: Tunnel, rock: Rock): boolean {
    return rock.reduce((canMove, { x, y }) => canMove && x - 1 >= 0 && tunnel[x - 1][y] !== 'ROCK', true);
  }

  private canMoveRight(tunnel: Tunnel, rock: Rock): boolean {
    return rock.reduce((canMove, { x, y }) => canMove && x + 1 < tunnel.length && tunnel[x + 1][y] !== 'ROCK', true);
  }

  private canMoveDown(tunnel: Tunnel, rock: Rock): boolean {
    return rock.reduce((canMove, { x, y }) => canMove && y - 1 >= 0 && tunnel[x][y - 1] !== 'ROCK', true);
  }

  private simulateFalling(tunnel: Tunnel, directions: Direction[], directionIndex: number, rock: Rock): number {
    directionIndex = directionIndex % directions.length;
    if (directions[directionIndex] === 'LEFT' && this.canMoveLeft(tunnel, rock)) {
      rock.forEach((position) => (position.x -= 1));
    } else if (directions[directionIndex] === 'RIGHT' && this.canMoveRight(tunnel, rock)) {
      rock.forEach((position) => (position.x += 1));
    }

    if (this.canMoveDown(tunnel, rock)) {
      rock.forEach((position) => (position.y -= 1));
      return this.simulateFalling(tunnel, directions, ++directionIndex, rock);
    } else {
      rock.forEach(({ x, y }) => (tunnel[x][y] = 'ROCK'));
    }

    return ++directionIndex;
  }

  private isRepeating(numbers: number[]): number {
    const { length } = numbers;
    for (let i = 1; i <= Math.floor(length / 2); i++) {
      const pattern = numbers.slice(-i);
      const toCheck = numbers.slice(-i * 2, -i);
      if (JSON.stringify(pattern) === JSON.stringify(toCheck)) return i;
    }
    return 0;
  }

  private solve(input: string, numberOfRocks: number): number {
    const directions = this.parseInput(input);
    const tunnel = this.createTunnel();

    let directionIndex = 0;
    const directionIndexes: number[] = [];
    const heights: number[] = [];
    let patternLength = 0;
    while (patternLength === 0) {
      for (let i = 0; i < 5; i++) {
        const rock = this.spawnRock(tunnel, i);
        directionIndex = this.simulateFalling(tunnel, directions, directionIndex, rock);
        heights.push(this.findHighestRock(tunnel) + 1);
      }

      directionIndexes.push(directionIndex);
      patternLength = this.isRepeating(directionIndexes);
    }

    const scaledPatternLength = patternLength * 5;
    const patternStart = (directionIndexes.length * 5 + 4) % scaledPatternLength;
    const remainder = (numberOfRocks - patternStart) % scaledPatternLength;
    const start = patternStart + remainder;

    const numberOfRepeats = (numberOfRocks - start) / scaledPatternLength;
    const patternHeight = heights[start + scaledPatternLength - 1] - heights[start - 1];

    return numberOfRepeats * patternHeight + heights[start - 1];
  }

  public solvePartOne(input: string): Output {
    return this.solve(input, 2022);
  }

  public solvePartTwo(input: string): Output {
    return this.solve(input, 1000000000000);
  }
}
