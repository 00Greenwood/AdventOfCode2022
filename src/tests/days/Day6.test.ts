import { Day6 } from '../../days/Day6';

describe('Day 6', () => {
  const day = new Day6();

  test('Name', () => {
    expect(day.name).toBe('Day6');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(11);
    expect(day.solvePartOne(day.input)).toBe(1080);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(26);
    expect(day.solvePartTwo(day.input)).toBe(3645);
  });
});
