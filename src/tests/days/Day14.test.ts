import { Day14 } from '../../days/Day14';

describe('Day 14', () => {
  const day = new Day14();

  test('Name', () => {
    expect(day.name).toBe('Day14');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(24);
    expect(day.solvePartOne(day.input)).toBe(979);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(93);
    expect(day.solvePartTwo(day.input)).toBe(29044);
  });
});
