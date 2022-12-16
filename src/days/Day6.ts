import { Day, Output } from '../Day';

export class Day6 extends Day {
  public constructor() {
    super('Day6');
  }

  private containsDuplicates(section: string): boolean {
    for (let j = 0; j < section.length; j++) {
      for (let k = j; k < section.length; k++) {
        if (j !== k && section[j] === section[k]) {
          return true;
        }
      }
    }
    return false;
  }

  public async solvePartOne(input: string): Output {
    for (let i = 4; i < input.length; i++) {
      const section = input.slice(i - 4, i);
      if (!this.containsDuplicates(section)) {
        return i;
      }
    }
    return -1;
  }

  public async solvePartTwo(input: string): Output {
    for (let i = 14; i < input.length; i++) {
      const section = input.slice(i - 14, i);
      if (!this.containsDuplicates(section)) {
        return i;
      }
    }
    return -1;
  }
}
