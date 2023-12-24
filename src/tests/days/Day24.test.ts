import { Day24 } from '../../days/Day24';

describe('Day 24', () => {
  const day = new Day24();

  test('Name', () => {
    expect(day.name).toBe('Day24');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(18);
    expect(day.solvePartOne(day.input)).toBe(221);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(54);
    expect(day.solvePartTwo(day.input)).toBe(739);
  });
});
