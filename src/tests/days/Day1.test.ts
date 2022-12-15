import { Day1 } from '../../days/Day1';

describe('Day 1', () => {
  const day = new Day1();

  test('Name', () => {
    expect(day.name).toBe('Day1');
  });

  test('Part 1', async () => {
    expect(await day.solvePartOne(day.testInput)).toBe(24000);
    expect(await day.solvePartOne(day.input)).toBe(71506);
  });

  test('Part 2', async () => {
    expect(await day.solvePartTwo(day.testInput)).toBe(45000);
    expect(await day.solvePartTwo(day.input)).toBe(209603);
  });
});
