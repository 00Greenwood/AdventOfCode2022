import { Day9 } from '../../days/Day9';

describe('Day 9', () => {
  const day = new Day9();

  test('Name', () => {
    expect(day.name).toBe('Day9');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(88);
    expect(day.solvePartOne(day.input)).toBe(5878);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(36);
    expect(day.solvePartTwo(day.input)).toBe(2405);
  });
});
