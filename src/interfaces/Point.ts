export class Point {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  public constructor(input: string) {
    const numbers = input.split(',').map((value) => parseInt(value));
    this.x = numbers[0];
    this.y = numbers[1];
    this.z = numbers[2];
  }

  public toString(): string {
    return `${this.x},${this.y},${this.z}`;
  }
}
