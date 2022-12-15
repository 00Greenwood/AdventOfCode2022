import { Day15 } from '../../days/Day15';

describe('Day 15', () => {
  const day = new Day15();

  test('Name', () => {
    expect(day.name).toBe('Day15');
  });

  test('Part 1', async () => {
    day.setYRange(10, 10);
    expect(await day.solvePartOne(day.testInput)).toBe(26);
    day.setYRange(2000000, 2000000);
    expect(await day.solvePartOne(day.input)).toBe(4883971);
  });

  test('Part 2', async () => {
    day.setYRange(0, 20);
    day.setXRange(0, 20);
    expect(await day.solvePartTwo(day.testInput)).toBe(56000011);
    day.setYRange(0, 4000000);
    day.setXRange(0, 4000000);
    expect(await day.solvePartTwo(day.input)).toBe(12691026767556);
  });
});
