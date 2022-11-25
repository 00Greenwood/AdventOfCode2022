import {mkdir, readFile, writeFile} from 'fs/promises';
import path = require('path');

export type File = 'ONE' | 'TWO';

export abstract class Day {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public async solve(): Promise<void> {
    {
      const input = await this.load('ONE');
      const output = await this.solveOne(input);
      await this.save('ONE', output);
    }
    {
      const input = await this.load('TWO');
      const output = await this.solveTwo(input);
      await this.save('TWO', output);
    }
  }

  private async load(file: File): Promise<string> {
    return readFile(
      path.resolve(__dirname, '../../input', this.name, file),
      'utf-8'
    );
  }

  private async save(file: File, output: string): Promise<void> {
    const folder = path.resolve(__dirname, '../../output', this.name);
    await mkdir(folder, {recursive: true});
    return writeFile(
      path.resolve(__dirname, '../../output', this.name, file),
      output,
      'utf-8'
    );
  }

  abstract solveOne(input: string): Promise<string>;
  abstract solveTwo(input: string): Promise<string>;
}
