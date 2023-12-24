import { Day, Output } from '../Day';

type Operation = (left: number, right: number) => number;
const add: Operation = (left, right) => left + right;
const subtract: Operation = (left, right) => left - right;
const multiply: Operation = (left, right) => left * right;
const divide: Operation = (left, right) => left / right;

type Type = 'YELL' | 'MATH';

abstract class Monkey {
  public abstract readonly type: Type;
  public abstract readonly name: string;
  public abstract getValue(): number;
}

class YellMonkey implements Monkey {
  public readonly type = 'YELL';
  public readonly name: string;
  private readonly value: number;

  public constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}

class MathMonkey implements Monkey {
  public readonly type = 'MATH';
  public readonly name: string;
  public readonly operation: Operation;
  public readonly left: Monkey;
  public readonly right: Monkey;

  public constructor(name: string, operation: Operation, left: Monkey, right: Monkey) {
    this.name = name;
    this.operation = operation;
    this.left = left;
    this.right = right;
  }

  public getValue() {
    return this.operation(this.left.getValue(), this.right.getValue());
  }
}

const createMonkey = (name: string, rawMonkeys: Map<string, string>, monkeys: Map<string, Monkey>): Monkey => {
  {
    name;
    const monkey = monkeys.get(name);
    if (monkey) return monkey;
  }

  const input = rawMonkeys.get(name);
  if (!input) throw new Error('Unable to find Monkey!');

  const addInput = input.split(' + ');
  if (addInput && addInput.length > 1) {
    const left = createMonkey(addInput[0], rawMonkeys, monkeys);
    const right = createMonkey(addInput[1], rawMonkeys, monkeys);
    const monkey = new MathMonkey(name, add, left, right);
    monkeys.set(name, monkey);
    return monkey;
  }

  const subtractInput = input.split(' - ');
  if (subtractInput && subtractInput.length > 1) {
    const left = createMonkey(subtractInput[0], rawMonkeys, monkeys);
    const right = createMonkey(subtractInput[1], rawMonkeys, monkeys);
    const monkey = new MathMonkey(name, subtract, left, right);
    monkeys.set(name, monkey);
    return monkey;
  }

  const multiplyInput = input.split(' * ');
  if (multiplyInput && multiplyInput.length > 1) {
    const left = createMonkey(multiplyInput[0], rawMonkeys, monkeys);
    const right = createMonkey(multiplyInput[1], rawMonkeys, monkeys);
    const monkey = new MathMonkey(name, multiply, left, right);
    monkeys.set(name, monkey);
    return monkey;
  }

  const divideInput = input.split(' / ');
  if (divideInput && divideInput.length > 1) {
    const left = createMonkey(divideInput[0], rawMonkeys, monkeys);
    const right = createMonkey(divideInput[1], rawMonkeys, monkeys);
    const monkey = new MathMonkey(name, divide, left, right);
    monkeys.set(name, monkey);
    return monkey;
  }

  const monkey = new YellMonkey(name, parseInt(input));
  monkeys.set(name, monkey);
  return monkey;
};

const findPathToHuman = (monkey: Monkey): Monkey[] | undefined => {
  if (monkey.name === 'humn') {
    return [monkey];
  }
  if (monkey.type === 'YELL') {
    return undefined;
  }
  const mathMonkey = monkey as MathMonkey;
  const leftPath = findPathToHuman(mathMonkey.left);
  if (leftPath) {
    return [monkey, ...leftPath];
  }

  const rightPath = findPathToHuman(mathMonkey.right);
  if (rightPath) {
    return [monkey, ...rightPath];
  }

  return undefined;
};

export class Day21 extends Day {
  public constructor() {
    super('Day21');
  }

  private parseInput(input: string): Map<string, Monkey> {
    const rawMonkeys = new Map<string, string>();
    input.split('\n').forEach((line) => {
      const section = line.split(': ');
      rawMonkeys.set(section[0], section[1]);
    });
    const monkeys = new Map<string, Monkey>();
    rawMonkeys.forEach((_value, key) => {
      createMonkey(key, rawMonkeys, monkeys);
    });

    return monkeys;
  }

  public solvePartOne(input: string): Output {
    const monkeys = this.parseInput(input);

    const rootMonkey = monkeys.get('root');
    if (!rootMonkey) throw new Error('Unable to find Root Monkey!');

    return rootMonkey.getValue();
  }

  public solvePartTwo(input: string): Output {
    const monkeys = this.parseInput(input);

    const rootMonkey = monkeys.get('root') as MathMonkey;
    if (!rootMonkey) throw new Error('Unable to find Root Monkey!');

    const pathToHuman = findPathToHuman(rootMonkey);
    if (!pathToHuman) throw new Error('Unable to find Human!');

    let expectedValue = rootMonkey.left === pathToHuman[1] ? rootMonkey.right.getValue() : rootMonkey.left.getValue();

    for (let i = 1; i < pathToHuman.length - 1; i++) {
      const monkey = pathToHuman[i] as MathMonkey;

      const calculateRight = monkey.left === pathToHuman[i + 1];
      const monkeyNotOnPath = calculateRight ? monkey.right : monkey.left;

      if (monkey.operation === add) {
        expectedValue = subtract(expectedValue, monkeyNotOnPath.getValue());
      } else if (monkey.operation === subtract) {
        expectedValue = calculateRight
          ? add(expectedValue, monkeyNotOnPath.getValue())
          : subtract(monkeyNotOnPath.getValue(), expectedValue);
      } else if (monkey.operation === divide) {
        expectedValue = calculateRight
          ? multiply(expectedValue, monkeyNotOnPath.getValue())
          : divide(monkeyNotOnPath.getValue(), expectedValue);
      } else if (monkey.operation === multiply) {
        expectedValue = divide(expectedValue, monkeyNotOnPath.getValue());
      }
    }

    return expectedValue;
  }
}
