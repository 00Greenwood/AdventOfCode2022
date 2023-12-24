import { Day10 } from '../../days/Day10';

describe('Day 10', () => {
  const day = new Day10();

  test('Name', () => {
    expect(day.name).toBe('Day10');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(13140);
    expect(day.solvePartOne(day.input)).toBe(13820);
  });

  test('Part 2', () => {
    const testSoltuion = day.solvePartTwo(day.testInput);
    expect(testSoltuion).toEqual(expect.stringContaining('##..##..##..##..##..##..##..##..##..##..'));
    expect(testSoltuion).toEqual(expect.stringContaining('###...###...###...###...###...###...###.'));
    expect(testSoltuion).toEqual(expect.stringContaining('####....####....####....####....####....'));
    expect(testSoltuion).toEqual(expect.stringContaining('#####.....#####.....#####.....#####.....'));
    expect(testSoltuion).toEqual(expect.stringContaining('#######.......#######.......#######.....'));
    expect(testSoltuion).toEqual(expect.stringContaining('#######.......#######.......#######.....'));

    const soltuion = day.solvePartTwo(day.input);
    expect(soltuion).toEqual(expect.stringContaining('####.#..#..##..###..#..#..##..###..#..#.'));
    expect(soltuion).toEqual(expect.stringContaining('...#.#.#..#..#.#..#.#.#..#..#.#..#.#.#..'));
    expect(soltuion).toEqual(expect.stringContaining('..#..##...#....#..#.##...#....#..#.##...'));
    expect(soltuion).toEqual(expect.stringContaining('.#...#.#..#.##.###..#.#..#.##.###..#.#..'));
    expect(soltuion).toEqual(expect.stringContaining('#....#.#..#..#.#.#..#.#..#..#.#.#..#.#..'));
    expect(soltuion).toEqual(expect.stringContaining('####.#..#..###.#..#.#..#..###.#..#.#..#.'));
  });
});
