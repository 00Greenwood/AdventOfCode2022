import { Day, Output } from '../Day';

type List = number | List[];

interface Pair {
  first: List;
  second: List;
}

type Result = 'CORRECT' | 'CONTINUE' | 'INCORRECT';

export class Day13 extends Day {
  public constructor() {
    super('Day13');
  }

  private parseInput(input: string): Pair[] {
    return input.split('\n\n').map((pairs) => {
      const split = pairs.split('\n');
      return { first: eval(split[0]), second: eval(split[1]) };
    });
  }

  private compare(left: List, right: List): Result {
    if (!Array.isArray(left) && !Array.isArray(right)) {
      if (right < left) return 'INCORRECT';
      if (right === left) return 'CONTINUE';
      if (right > left) return 'CORRECT';
    }

    if (Array.isArray(left) && !Array.isArray(right)) {
      return this.compare(left, [right]);
    }

    if (!Array.isArray(left) && Array.isArray(right)) {
      return this.compare([left], right);
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      const min = Math.min(left.length, right.length);
      for (let index = 0; index < min; index++) {
        const comparison = this.compare(left[index], right[index]);
        if (comparison === 'INCORRECT') return 'INCORRECT';
        if (comparison === 'CORRECT') return 'CORRECT';
      }
      if (right.length < left.length) return 'INCORRECT';
      if (right.length > left.length) return 'CORRECT';
    }
    return 'CONTINUE';
  }

  public solvePartOne(input: string): Output {
    const pairs = this.parseInput(input);
    return pairs.reduce(
      (total, { first, second }, index) => (this.compare(first, second) === 'CORRECT' ? total + index + 1 : total),
      0
    );
  }

  public solvePartTwo(input: string): Output {
    const pairs = this.parseInput(input);
    let list = new Array<List>();
    pairs.forEach(({ first, second }) => {
      list.push(first);
      list.push(second);
    });
    const start: List = [[2]];
    list.push(start);
    const end: List = [[6]];
    list.push(end);
    list = list.sort((a, b) => (this.compare(a, b) === 'CORRECT' ? -1 : 1));
    const startIndex = list.findIndex((value) => value === start) + 1;
    const endIndex = list.findIndex((value) => value === end) + 1;
    return startIndex * endIndex;
  }
}
