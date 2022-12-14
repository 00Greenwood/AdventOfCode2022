import { Day14 } from "../days/Day14";

describe("Day 14", () => {
  const day = new Day14();

  test("Name", async () => {
    expect(day.name).toBe("Day14");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(24);
    expect(await day.solvePartOne(day.input)).toBe(979);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(93);
    expect(await day.solvePartTwo(day.input)).toBe(29044);
  });
});
