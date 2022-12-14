import { Day5 } from '../../days/Day5';

describe('Day 5', () => {
  const day = new Day5();

  test('Name', () => {
    expect(day.name).toBe('Day5');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe('CMZ');
    expect(day.solvePartOne(day.input)).toBe('FJSRQCFTN');
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe('MCD');
    expect(day.solvePartTwo(day.input)).toBe('CJVLJQPHS');
  });
});
