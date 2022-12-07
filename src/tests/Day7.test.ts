import { Day7 } from "../days/Day7";

describe("Day 7", () => {
  const day = new Day7();

  test("Name", async () => {
    expect(day.name).toBe("Day7");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(95437);
    expect(await day.solvePartOne(day.input)).toBe(1783610);
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(24933642);
    expect(await day.solvePartTwo(day.input)).toBe(4370655);
  });
});
