import { Day, Output } from '../Day';

interface Rucksack {
  first: number[];
  second: number[];
  total: number[];
}

export class Day3 extends Day {
  public constructor() {
    super('Day3');
  }

  private convertFromUnicode(input: number): number {
    if (input >= 97 && input <= 122) {
      return input - 96;
    }
    return input - 38;
  }

  private parseInput(input: string): Rucksack[] {
    return input.split('\n').map<Rucksack>((line) => {
      const middle = line.length / 2;
      const rucksack: Rucksack = { first: [], second: [], total: [] };
      for (let index = 0; index < middle; index++) {
        const value = this.convertFromUnicode(line.charCodeAt(index));
        rucksack.first.push(value);
        rucksack.total.push(value);
      }
      for (let index = middle; index < line.length; index++) {
        const value = this.convertFromUnicode(line.charCodeAt(index));
        rucksack.second.push(value);
        rucksack.total.push(value);
      }
      return rucksack;
    });
  }

  public async solvePartOne(input: string): Output {
    const rucksacks = this.parseInput(input);
    const result = rucksacks.map(({ first, second }) => {
      return first.filter((value) => second.includes(value))[0];
    });
    return result.reduce((score, value) => score + value, 0);
  }

  public async solvePartTwo(input: string): Output {
    const rucksacks = this.parseInput(input);
    const result = new Array<number>();
    for (let index = 0; index < rucksacks.length; index += 3) {
      const first = rucksacks[index].total;
      const second = rucksacks[index + 1].total;
      const third = rucksacks[index + 2].total;
      const common = first.filter((value) => second.includes(value));
      const badge = common.filter((value) => third.includes(value));
      result.push(badge[0]);
    }
    return result.reduce((score, value) => score + value, 0);
  }
}
