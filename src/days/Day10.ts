import { Day, Output } from '../Day';

interface Instruction {
  code: string;
  value: number;
}

export class Day10 extends Day {
  public constructor() {
    super('Day10');
  }

  private parseInput(input: string): Instruction[] {
    return input.split('\n').map((line) => {
      const sections = line.split(' ');
      return {
        code: sections[0],
        value: sections.length > 1 ? parseInt(sections[1]) : 0,
      };
    });
  }

  public solvePartOne(input: string): Output {
    const instructions = this.parseInput(input);
    const cycles = [1];
    instructions.forEach(({ code, value }) => {
      switch (code) {
        case 'noop':
          cycles.push(cycles[cycles.length - 1]);
          break;
        case 'addx':
          cycles.push(cycles[cycles.length - 1]);
          cycles.push(cycles[cycles.length - 1] + value);
          break;
      }
    });
    let strength = 0;
    for (let i = 0; i < 6; i++) {
      const index = i * 40 + 20;
      strength += cycles[index - 1] * index;
    }
    return strength;
  }

  private drawPixel(crtPosition: number, spritePosition: number) {
    if (crtPosition >= spritePosition - 1 && crtPosition <= spritePosition + 1) {
      return '#';
    }
    return '.';
  }

  private updateCrtPosition(crtPosition: number): number {
    return (crtPosition + 1) % 40;
  }

  public solvePartTwo(input: string): Output {
    const instructions = this.parseInput(input);
    let spritePosition = 1;
    let crtPosition = 0;
    let screen = '';

    screen += this.drawPixel(crtPosition, spritePosition);

    instructions.forEach(({ code, value }) => {
      switch (code) {
        case 'noop':
          crtPosition = this.updateCrtPosition(crtPosition);
          screen += this.drawPixel(crtPosition, spritePosition);
          break;
        case 'addx':
          crtPosition = this.updateCrtPosition(crtPosition);
          screen += this.drawPixel(crtPosition, spritePosition);
          spritePosition += value;
          crtPosition = this.updateCrtPosition(crtPosition);
          screen += this.drawPixel(crtPosition, spritePosition);
          break;
      }
    });
    return screen;
  }
}
