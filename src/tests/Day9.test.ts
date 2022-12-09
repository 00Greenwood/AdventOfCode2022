import { Day9 } from "../days/Day9";

describe("Day 9", () => {
  const day = new Day9();

  test("Name", async () => {
    expect(day.name).toBe("Day9");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(88);
    expect(await day.solvePartOne(day.input)).toBe(5878);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(36);
    expect(await day.solvePartTwo(day.input)).toBe(2405);
  });
});
