import { Day0 } from "../days/Day0";

describe("Day 0", () => {
  const day = new Day0();

  test("Name", async () => {
    expect(day.name).toBe("Day0");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe("TEST INPUT");
    expect(await day.solvePartOne(day.input)).toBe("INPUT");
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe("TEST INPUT");
    expect(await day.solvePartTwo(day.input)).toBe("INPUT");
  });
});
