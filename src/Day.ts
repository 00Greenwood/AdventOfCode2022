import { mkdir, readFile, writeFile } from "fs/promises";
import path = require("path");

export abstract class Day {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public async solve(): Promise<void> {
    const input = await this.load();
    {
      const output = await this.solveOne(input);
      console.log(`${this.name}: Part 1: ${output}`);
    }
    {
      const output = await this.solveTwo(input);
      console.log(`${this.name}: Part 2: ${output}`);
    }
  }

  private async load(): Promise<string> {
    return readFile(
      path.resolve(__dirname, "../../input", `${this.id}.txt`),
      "utf-8"
    );
  }

  abstract solveOne(input: string): Promise<string>;
  abstract solveTwo(input: string): Promise<string>;
}
