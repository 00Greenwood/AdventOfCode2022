import { Day2 } from "../days/Day2";

describe("Day 2", () => {
  const day = new Day2();

  test("Name", async () => {
    expect(day.name).toBe("Day2");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(15);
    expect(await day.solvePartOne(day.input)).toBe(11386);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(12);
    expect(await day.solvePartTwo(day.input)).toBe(13600);
  });
});
