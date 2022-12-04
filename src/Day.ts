import { readFile } from "fs/promises";
import path = require("path");

export abstract class Day {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  private async load(): Promise<string> {
    return readFile(
      path.resolve(__dirname, "../../input", `${this.id}.txt`),
      "utf-8"
    );
  }

  public async solve(): Promise<void> {
    const input = await this.load();
    {
      const start = Date.now();
      const output = await this.solvePartOne(input);
      const finish = Date.now();
      const difference = finish - start;
      console.log(`${this.name}-1: ${output} (${difference} ms)`);
    }
    {
      const start = Date.now();
      const output = await this.solvePartTwo(input);
      const finish = Date.now();
      const difference = finish - start;
      console.log(`${this.name}-2: ${output} (${difference} ms)`);
    }
  }

  abstract solvePartOne(input: string): Promise<string>;
  abstract solvePartTwo(input: string): Promise<string>;
}
