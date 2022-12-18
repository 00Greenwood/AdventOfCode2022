import { Day, Output } from '../Day';

interface Valve {
  name: string;
  flowRate: number;
  connectedTo: Map<string, number>;
}

type Valves = Map<string, Valve>;
type OpenValves = Map<Valve, number>;

export class Day16 extends Day {
  public constructor() {
    super('Day16');
  }

  private findShortestPath(valves: Valves, path: Valve[], start: Valve, end: Valve, minimum: number): number {
    path.push(start);

    {
      const distance = start.connectedTo.get(end.name);
      if (distance) return distance;
    }

    for (const entry of start.connectedTo) {
      const valve = valves.get(entry[0]);
      if (!valve || path.includes(valve) || entry[1] >= minimum) continue;
      const distance = this.findShortestPath(valves, [...path], valve, end, minimum - entry[1]) + entry[1];
      if (distance < minimum) minimum = distance;
    }
    return minimum;
  }

  private parseInput(input: string): Valves {
    const valves: Valves = new Map<string, Valve>();

    input.split('\n').map((line) => {
      const matches = [...line.matchAll(/\d+|[A-Z]{2}/g)];
      const valve = { name: matches[0][0], flowRate: parseInt(matches[1][0]), connectedTo: new Map<string, number>() };
      for (let i = 2; i < matches.length; i++) {
        valve.connectedTo.set(matches[i][0], 1);
      }
      valves.set(valve.name, valve);
    });

    valves.forEach((start) => {
      valves.forEach((end, name) => {
        if (start === end) return; // Same valve!
        if (start.connectedTo.has(name)) return; // Already connected!

        const distance = this.findShortestPath(valves, [], start, end, Infinity);
        start.connectedTo.set(end.name, distance);
        end.connectedTo.set(start.name, distance);
      });
    });

    const toDelete: string[] = [];
    valves.forEach((valve) => {
      if (valve.flowRate === 0) {
        toDelete.push(valve.name);
      }
    });
    valves.forEach((valve) => {
      toDelete.forEach((key) => {
        valve.connectedTo.delete(key);
      });
    });

    return valves;
  }

  private getValue(valves: Valves, name: string): Valve {
    const valve = valves.get(name);
    if (!valve) throw new Error(`Unable to find '${name}'!`);
    return valve;
  }

  private findAndOpenValve(
    valves: Valves,
    openValves: OpenValves,
    currentTime: number,
    start: Valve,
    excluded?: string[]
  ): number {
    const releasedPressures: number[] = [];
    for (const entry of start.connectedTo) {
      // Skip excluded valves!
      if (excluded && excluded.includes(entry[0])) continue;
      const valve = this.getValue(valves, entry[0]);
      // Skip open valves!
      if (openValves.has(valve)) continue;
      const timeLeft = currentTime - (entry[1] + 1);
      // Run out of time!
      if (timeLeft <= 0) continue;
      openValves.set(valve, timeLeft);
      releasedPressures.push(this.findAndOpenValve(valves, openValves, timeLeft, valve, excluded));
      openValves.delete(valve);
    }
    return (releasedPressures.length > 0 ? Math.max(...releasedPressures) : 0) + start.flowRate * currentTime;
  }

  private powerSet(names: string[], size: number) {
    const sets: string[][] = [];
    const { length } = names;
    const numberOfCombinations = 2 ** length;
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
      const subSet: string[] = [];
      for (let setElementIndex = 0; setElementIndex < length; setElementIndex += 1) {
        if (combinationIndex & (1 << setElementIndex)) {
          subSet.push(names[setElementIndex]);
        }
      }
      if (subSet.length <= size) sets.push(subSet);
    }
    return sets;
  }

  public async solvePartOne(input: string): Output {
    const valves = this.parseInput(input);
    const start = this.getValue(valves, 'AA');
    const pressure = this.findAndOpenValve(valves, new Map<Valve, number>(), 30, start);
    return pressure;
  }

  public async solvePartTwo(input: string): Output {
    const valves = this.parseInput(input);
    const start = this.getValue(valves, 'AA');

    const names = [...start.connectedTo.keys()];
    const sets = this.powerSet(names, Math.floor(names.length / 2));

    let maxPressure = 0;
    for (const set of sets) {
      const oppositeSet = names.filter((name) => !set.includes(name));
      const first = this.findAndOpenValve(valves, new Map<Valve, number>(), 26, start, oppositeSet);
      const second = this.findAndOpenValve(valves, new Map<Valve, number>(), 26, start, set);
      if (first + second <= maxPressure) continue;
      maxPressure = first + second;
    }
    return maxPressure;
  }
}
