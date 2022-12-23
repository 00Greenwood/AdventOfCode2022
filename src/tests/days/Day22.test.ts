import { Day22 } from '../../days/Day22';

describe('Day 22', () => {
  const day = new Day22();

  test('Name', () => {
    expect(day.name).toBe('Day22');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(6032);
    expect(day.solvePartOne(day.input)).toBe('INPUT');
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe('TEST INPUT');
    expect(day.solvePartTwo(day.input)).toBe('INPUT');
  });
});
