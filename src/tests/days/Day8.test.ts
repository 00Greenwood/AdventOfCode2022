import { Day8 } from '../../days/Day8';

describe('Day 8', () => {
  const day = new Day8();

  test('Name', () => {
    expect(day.name).toBe('Day8');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(21);
    expect(day.solvePartOne(day.input)).toBe(1812);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(8);
    expect(day.solvePartTwo(day.input)).toBe(315495);
  });
});
