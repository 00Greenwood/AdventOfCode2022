import { readFileSync } from 'fs';
import path = require('path');

export type Output = string | number;

export abstract class Day {
  public readonly name: string;
  public readonly input: string;
  public readonly testInput: string;

  protected constructor(name: string) {
    this.name = name;
    this.input = this.load(false /*= isTest*/);
    this.testInput = this.load(true) /*= isTest*/;
  }

  // Load either the input or the test input.
  private load(isTest: boolean): string {
    return readFileSync(path.resolve(__dirname, '../inputs', `${this.name}${isTest ? '.test' : ''}.txt`), 'utf-8');
  }

  public abstract solvePartOne(input: string): Output;
  public abstract solvePartTwo(input: string): Output;
}
