import { Day18 } from '../../days/Day18';

describe('Day 18', () => {
  const day = new Day18();

  test('Name', () => {
    expect(day.name).toBe('Day18');
  });

  test('Part 1', async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(64);
    expect(await day.solvePartOne(day.input)).toBe(4500);
  });

  test('Part 2', async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(58);
    expect(await day.solvePartTwo(day.input)).toBe(2558);
  });
});
