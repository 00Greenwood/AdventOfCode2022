import { Day10 } from "../days/Day10";

describe("Day 10", () => {
  const day = new Day10();

  test("Name", async () => {
    expect(day.name).toBe("Day10");
  });

  test("Part 1", async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(13140);
    expect(await day.solvePartOne(day.input)).toBe(13820);
  });

  test("Part 2", async () => {
    const testSoltuion = await day.solvePartTwo(day.testInput);
    expect(testSoltuion).toEqual(expect.stringContaining("##..##..##..##..##..##..##..##..##..##.."));
    expect(testSoltuion).toEqual(expect.stringContaining("###...###...###...###...###...###...###."));
    expect(testSoltuion).toEqual(expect.stringContaining("####....####....####....####....####...."));
    expect(testSoltuion).toEqual(expect.stringContaining("#####.....#####.....#####.....#####....."));
    expect(testSoltuion).toEqual(expect.stringContaining("#######.......#######.......#######....."));
    expect(testSoltuion).toEqual(expect.stringContaining("#######.......#######.......#######....."));

    const soltuion = await day.solvePartTwo(day.input);
    console.log(soltuion);
    expect(soltuion).toEqual(expect.stringContaining("####.#..#..##..###..#..#..##..###..#..#."));
    expect(soltuion).toEqual(expect.stringContaining("...#.#.#..#..#.#..#.#.#..#..#.#..#.#.#.."));
    expect(soltuion).toEqual(expect.stringContaining("..#..##...#....#..#.##...#....#..#.##..."));
    expect(soltuion).toEqual(expect.stringContaining(".#...#.#..#.##.###..#.#..#.##.###..#.#.."));
    expect(soltuion).toEqual(expect.stringContaining("#....#.#..#..#.#.#..#.#..#..#.#.#..#.#.."));
    expect(soltuion).toEqual(expect.stringContaining("####.#..#..###.#..#.#..#..###.#..#.#..#."));
  });
});
