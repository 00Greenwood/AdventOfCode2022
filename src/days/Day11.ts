import { Day, Output } from '../Day';

interface Monkey {
  items: number[];
  operation: (old: number) => number;
  testNumber: number;
  test: (value: number) => number;
}

interface Move {
  value: number;
  nextMonkey: number;
}

export class Day11 extends Day {
  public constructor() {
    super('Day11');
  }

  private parseInput(input: string): Monkey[] {
    return input.split('\n\n').map((section) => {
      const lines = section.split('\n');
      const items = lines[1]
        .replace('  Starting items: ', '')
        .split(', ')
        .map((value) => parseInt(value));
      const operation = lines[2].replace('  Operation: new = ', '');
      const divisibleBy = parseInt(lines[3].replace('  Test: divisible by ', ''));
      const ifTrue = parseInt(lines[4].replace('    If true: throw to monkey ', ''));
      const ifFalse = parseInt(lines[5].replace('    If false: throw to monkey ', ''));

      return {
        items,
        operation: (old: number) => eval(operation.replace('old', old.toString())),
        testNumber: divisibleBy,
        test: (value: number) => (value % divisibleBy === 0 ? ifTrue : ifFalse),
      };
    });
  }

  private runMonkeySimulation(
    monkeys: Monkey[],
    rounds: number,
    worryLevelReducer: (monkey: Monkey, value: number) => number
  ): number[] {
    const inspections = monkeys.map(() => 0);
    for (let i = 0; i < rounds; i++) {
      monkeys.forEach((monkey, index) => {
        const moves: Move[] = monkey.items.map((item) => {
          const value = worryLevelReducer(monkey, item);
          inspections[index]++;
          return { value, nextMonkey: monkey.test(value) };
        });
        moves.forEach(({ value, nextMonkey }) => monkeys[nextMonkey].items.push(value));
        monkey.items = [];
      });
    }
    return inspections;
  }

  public async solvePartOne(input: string): Output {
    const monkeys = this.parseInput(input);
    const worryLevelReducer = (monkey: Monkey, value: number) => Math.floor(monkey.operation(value) / 3);

    const inspections = this.runMonkeySimulation(monkeys, 20, worryLevelReducer);
    const sorted = inspections.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
  }

  public async solvePartTwo(input: string): Output {
    const monkeys = this.parseInput(input);

    const lcm = monkeys.reduce((total, monkey) => total * monkey.testNumber, 1);
    const worryLevelReducer = (monkey: Monkey, value: number) => monkey.operation(value) % lcm;

    const inspections = this.runMonkeySimulation(monkeys, 10000, worryLevelReducer);
    const sorted = inspections.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
  }
}
