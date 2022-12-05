import { Day, Output } from "../Day";

interface Area {
  lower: number;
  upper: number;
}

interface Pair {
  first: Area;
  second: Area;
}

export class Day4 extends Day {
  constructor() {
    super("Day4");
  }

  private parseInput(input: string): Pair[] {
    return input.split("\n").map((line) => {
      const numbers = line.split(/,|-/);
      return {
        first: {
          lower: parseInt(numbers[0]),
          upper: parseInt(numbers[1]),
        },
        second: {
          lower: parseInt(numbers[2]),
          upper: parseInt(numbers[3]),
        },
      };
    });
  }

  public async solvePartOne(input: string): Output {
    const pairs = this.parseInput(input);
    const overlapping = pairs.filter(
      ({ first, second }) =>
        (first.lower >= second.lower && first.upper <= second.upper) ||
        (second.lower >= first.lower && second.upper <= first.upper)
    );
    return overlapping.length;
  }

  public async solvePartTwo(input: string): Output {
    const pairs = this.parseInput(input);
    const seperate = pairs.filter(
      ({ first, second }) =>
        first.lower > second.upper || second.lower > first.upper
    );
    return pairs.length - seperate.length;
  }
}
