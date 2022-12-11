import { Day11 } from "../days/Day11";

describe("Day 11", () => {
  const day = new Day11();

  test("Name", async () => {
    expect(day.name).toBe("Day11");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(10605);
    expect(await day.solvePartOne(day.input)).toBe(98280);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(2713310158);
    expect(await day.solvePartTwo(day.input)).toBe(17673687232);
  });
});
