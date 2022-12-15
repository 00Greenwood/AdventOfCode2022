import { Day12 } from '../../days/Day12';

describe('Day 12', () => {
  const day = new Day12();

  test('Name', () => {
    expect(day.name).toBe('Day12');
  });

  test('Part 1', async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(31);
    expect(await day.solvePartOne(day.input)).toBe(408);
  });

  test('Part 2', async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(29);
    expect(await day.solvePartTwo(day.input)).toBe(399);
  });
});
