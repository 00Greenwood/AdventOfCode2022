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
  constructor() {
    super('Day11');
  }

  parseInput(input: string): Monkey[] {
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

  public async solvePartOne(input: string): Output {
    const monkeys = this.parseInput(input);
    const inspections = monkeys.map(() => 0);

    for (let i = 0; i < 20; i++) {
      monkeys.forEach((monkey, index) => {
        const moves: Move[] = monkey.items.map((item) => {
          const value = Math.floor(monkey.operation(item) / 3);
          inspections[index]++;
          return { value, nextMonkey: monkey.test(value) };
        });
        moves.forEach(({ value, nextMonkey }) => monkeys[nextMonkey].items.push(value));
        monkey.items = [];
      });
    }

    const sorted = inspections.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
  }

  public async solvePartTwo(input: string): Output {
    const monkeys = this.parseInput(input);
    const inspections = monkeys.map(() => 0);

    const lcm = monkeys.reduce((total, monkey) => total * monkey.testNumber, 1);

    for (let i = 0; i < 10000; i++) {
      monkeys.forEach((monkey, index) => {
        const moves: Move[] = monkey.items.map((item) => {
          const value = monkey.operation(item) % lcm;
          inspections[index]++;
          return { value, nextMonkey: monkey.test(value) };
        });
        moves.forEach(({ value, nextMonkey }) => monkeys[nextMonkey].items.push(value));
        monkey.items = [];
      });
    }

    const sorted = inspections.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
  }
}
