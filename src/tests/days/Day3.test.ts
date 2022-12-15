import { Day3 } from '../../days/Day3';

describe('Day 3', () => {
  const day = new Day3();

  test('Name', () => {
    expect(day.name).toBe('Day3');
  });

  test('Part 1', async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(157);
    expect(await day.solvePartOne(day.input)).toBe(8176);
  });

  test('Part 2', async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(70);
    expect(await day.solvePartTwo(day.input)).toBe(2689);
  });
});
