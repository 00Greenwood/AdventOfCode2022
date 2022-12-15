import { readFileSync } from 'fs';
import path = require('path');

export type Output = Promise<string | number>;

export abstract class Day {
  readonly name: string;
  readonly input: string;
  readonly testInput: string;

  constructor(name: string) {
    this.name = name;
    this.input = this.load(false /*= isTest*/);
    this.testInput = this.load(true) /*= isTest*/;
  }

  // Load either the input or the test input.
  private load(isTest: boolean): string {
    return readFileSync(path.resolve(__dirname, '../inputs', `${this.name}${isTest ? '.test' : ''}.txt`), 'utf-8');
  }

  abstract solvePartOne(input: string): Output;
  abstract solvePartTwo(input: string): Output;
}
