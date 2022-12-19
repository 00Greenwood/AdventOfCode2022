import { Day0 } from '../../days/Day0';

describe('Day 0', () => {
  const day = new Day0();

  test('Name', () => {
    expect(day.name).toBe('Day0');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe('TEST INPUT');
    expect(day.solvePartOne(day.input)).toBe('INPUT');
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe('TEST INPUT');
    expect(day.solvePartTwo(day.input)).toBe('INPUT');
  });
});
