import { Day4 } from "../days/Day4";

describe("Day 4", () => {
  const day = new Day4();

  test("Name", async () => {
    expect(day.name).toBe("Day4");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(2);
    expect(await day.solvePartOne(day.input)).toBe(483);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(4);
    expect(await day.solvePartTwo(day.input)).toBe(874);
  });
});
