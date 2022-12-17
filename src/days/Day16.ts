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

  private findShortestPath(valves: Valves, path: Valve[], start: Valve, end: Valve): number {
    path.push(start);

    {
      const distance = start.connectedTo.get(end.name);
      if (distance) return distance;
    }

    const distances: number[] = [];
    for (const entry of start.connectedTo) {
      const valve = valves.get(entry[0]);
      if (!valve || path.includes(valve)) continue;
      distances.push(this.findShortestPath(valves, [...path], valve, end) + entry[1]);
    }
    return Math.min(...distances);
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

        const distance = this.findShortestPath(valves, [], start, end);
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

  private findAndOpenValve(valves: Valves, openValves: OpenValves, timeLeft: number, start: Valve): number {
    const releasedPressures: number[] = [];
    for (const entry of start.connectedTo) {
      const valve = valves.get(entry[0]);
      if (!valve) throw new Error(`Unable to find valve! ${entry[0]}`);
      // Skip open valves
      if (openValves.has(valve)) continue;
      const openValvesCopy = new Map(openValves.entries());
      const timeLeftCopy = timeLeft - (entry[1] + 1);
      // Run out of time!
      if (timeLeftCopy < 0) continue;
      openValvesCopy.set(valve, timeLeftCopy);
      releasedPressures.push(this.findAndOpenValve(valves, openValvesCopy, timeLeftCopy, valve));
    }
    return (releasedPressures.length > 0 ? Math.max(...releasedPressures) : 0) + start.flowRate * timeLeft;
  }

  private powerSet(names: string[], maxSize: number) {
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
      if (subSet.length <= maxSize) sets.push(subSet);
    }
    return sets;
  }

  private copyValve({ name, flowRate, connectedTo }: Valve, exclude: string[]) {
    const valve = { name, flowRate, connectedTo: new Map(connectedTo.entries()) };
    exclude.forEach((key) => {
      valve.connectedTo.delete(key);
    });
    return valve;
  }

  private createValveSet(valves: Valves, set: string[], oppositeSet: string[]): Valves {
    const output = new Map<string, Valve>();
    set.forEach((name) => {
      const valve = valves.get(name);
      if (!valve) throw new Error('Unable to find valve!');
      const valveCopy = this.copyValve(valve, oppositeSet);
      output.set(name, valveCopy);
    });
    return output;
  }

  public async solvePartOne(input: string): Output {
    const valves = this.parseInput(input);

    const start = valves.get('AA');
    if (!start) throw new Error('Unable to find start!');
    const pressure = this.findAndOpenValve(valves, new Map<Valve, number>(), 30, start);
    return pressure;
  }

  public async solvePartTwo(input: string): Output {
    const valves = this.parseInput(input);

    const start = valves.get('AA');
    if (!start) throw new Error('Unable to find start!');

    const names = [...start.connectedTo.keys()];
    const sets = this.powerSet(names, Math.floor(names.length / 2));

    const pressures: number[] = [];

    for (const set of sets) {
      const oppositeSet = names.filter((name) => !set.includes(name));

      const setOne = this.createValveSet(valves, set, oppositeSet);
      const setOneStart = this.copyValve(start, oppositeSet);
      const first = this.findAndOpenValve(setOne, new Map<Valve, number>(), 26, setOneStart);

      const setTwo = this.createValveSet(valves, oppositeSet, set);
      const setTwoStart = this.copyValve(start, set);
      const second = this.findAndOpenValve(setTwo, new Map<Valve, number>(), 26, setTwoStart);

      pressures.push(first + second);
    }
    return Math.max(...pressures);
  }
}
