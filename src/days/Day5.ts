import { Day, Output } from "../Day";

type Stack = string[];
type Stacks = Stack[];

interface Instruction {
  quantity: number;
  from: number;
  to: number;
}

export class Day5 extends Day {
  constructor() {
    super("Day5");
  }

  private parseStacks(input: string): Stacks {
    const lines = input.split("\n").reverse();
    const firstLine = lines[0];
    const matches = [...firstLine.matchAll(/\d+/g)];
    const stacks: Stacks = matches.map(() => []);
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < stacks.length; j++) {
        const crate = line[j * 4 + 1];
        if (crate != " ") {
          stacks[j].push(crate);
        }
      }
    }
    return stacks;
  }

  private parseInstructions(input: string): Instruction[] {
    return input.split("\n").map<Instruction>((line) => {
      const values = [...line.matchAll(/\d+/g)];
      return {
        quantity: parseInt(values[0][0]),
        from: parseInt(values[1][0]),
        to: parseInt(values[2][0]),
      };
    });
  }

  public async solvePartOne(input: string): Output {
    const splitInput = input.split("\n\n");
    const stacks = this.parseStacks(splitInput[0]);
    const instructions = this.parseInstructions(splitInput[1]);
    instructions.forEach(({ quantity, from, to }) => {
      for (let i = 0; i < quantity; i++) {
        const crate = stacks[from - 1].pop();
        if (crate) {
          stacks[to - 1].push(crate);
        }
      }
    });
    return stacks.reduce(
      (result, stack) => result + stack[stack.length - 1],
      ""
    );
  }

  public async solvePartTwo(input: string): Output {
    const splitInput = input.split("\n\n");
    const stacks = this.parseStacks(splitInput[0]);
    const instructions = this.parseInstructions(splitInput[1]);
    instructions.forEach(({ quantity, from, to }) => {
      const craneStack: Stack = [];
      for (let i = 0; i < quantity; i++) {
        const crate = stacks[from - 1].pop();
        if (crate) {
          craneStack.push(crate);
        }
      }
      craneStack.reverse().forEach((crate) => {
        stacks[to - 1].push(crate);
      });
    });
    return stacks.reduce(
      (result, stack) => result + stack[stack.length - 1],
      ""
    );
  }
}
