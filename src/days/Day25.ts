import { Day, Output } from '../Day';

const convertSNAFU = (input: string): number => {
  let decimal = 0;
  input
    .split('')
    .reverse()
    .forEach((char, index) => {
      switch (char) {
        case '1':
          decimal += Math.pow(5, index);
          break;
        case '2':
          decimal += 2 * Math.pow(5, index);
          break;
        case '=':
          decimal -= 2 * Math.pow(5, index);
          break;
        case '-':
          decimal -= 1 * Math.pow(5, index);
          break;
        default:
          break;
      }
    });

  return decimal;
};

const convertDecimal = (input: number): string => {
  let snafu = '';

  let index = 0;
  while (2 * Math.pow(5, index) < input) {
    index++;
  }

  let remainder = input;

  while (index >= 0) {
    if (2 * Math.pow(5, index - 1) > Math.abs(remainder)) {
      // Skip index!
      snafu += '0';
      index--;
      continue;
    }

    if (remainder > 0) {
      if (2 * Math.pow(5, index) - remainder > remainder - Math.pow(5, index)) {
        snafu += '1';
        remainder -= Math.pow(5, index);
      } else {
        snafu += '2';
        remainder -= 2 * Math.pow(5, index);
      }
    } else if (remainder < 0) {
      if (2 * Math.pow(5, index) + remainder > -remainder - Math.pow(5, index)) {
        snafu += '-';
        remainder += Math.pow(5, index);
      } else {
        snafu += '=';
        remainder += 2 * Math.pow(5, index);
      }
    } else {
      snafu += '0';
    }

    index--;
  }

  return snafu;
};

export class Day25 extends Day {
  public constructor() {
    super('Day25');
  }

  private parseInput(input: string): string[] {
    return input.split('\n');
  }

  public solvePartOne(input: string): Output {
    const lines = this.parseInput(input);
    const decimal = lines.reduce((total, line) => (total += convertSNAFU(line)), 0);
    return convertDecimal(decimal);
  }

  public solvePartTwo(input: string): Output {
    // START THE BLENDER!
    return input;
  }
}
