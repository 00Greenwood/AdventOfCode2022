import { Day15 } from '../../days/Day15';

describe('Day 15', () => {
  const day = new Day15();

  test('Name', () => {
    expect(day.name).toBe('Day15');
  });

  test('Part 1', async () => {
    day.setY(10);
    expect(await day.solvePartOne(day.testInput)).toBe(26);
    day.setY(2000000);
    expect(await day.solvePartOne(day.input)).toBe(4883971);
  });

  test('Part 2', async () => {
    day.setY(20);
    day.setX(20);
    expect(await day.solvePartTwo(day.testInput)).toBe(56000011);
    day.setY(4000000);
    day.setX(4000000);
    expect(await day.solvePartTwo(day.input)).toBe(12691026767556);
  });
});
