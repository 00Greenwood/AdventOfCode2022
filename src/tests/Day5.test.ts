import { Day5 } from "../days/Day5";

describe("Day 5", () => {
  const day = new Day5();

  test("Name", async () => {
    expect(day.name).toBe("Day5");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe("CMZ");
    expect(await day.solvePartOne(day.input)).toBe("FJSRQCFTN");
  });

  test("Part 2", async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe("MCD");
    expect(await day.solvePartTwo(day.input)).toBe("CJVLJQPHS");
  });
});
