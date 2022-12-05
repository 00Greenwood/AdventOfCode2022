import { Day, Output } from "../Day";

export class Day1 extends Day {
  constructor() {
    super("Day1");
  }

  private countCalories(input: string): number[] {
    const elves = input.split("\n\n");
    return elves.map((elf) =>
      elf.split("\n").reduce((total, calories) => total + parseInt(calories), 0)
    );
  }

  public async solvePartOne(input: string): Output {
    const totalCalories = this.countCalories(input);
    const maximum = Math.max(...totalCalories);
    return maximum;
  }

  public async solvePartTwo(input: string): Output {
    const totalCalories = this.countCalories(input);
    let topThree = 0;
    for (let i = 0; i < 3; i++) {
      const maximum = Math.max(...totalCalories);
      topThree += maximum;
      const index = totalCalories.indexOf(maximum);
      totalCalories.splice(index, 1);
    }
    return topThree;
  }
}
