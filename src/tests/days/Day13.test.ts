import { Day13 } from '../../days/Day13';

describe('Day 13', () => {
  const day = new Day13();

  test('Name', () => {
    expect(day.name).toBe('Day13');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(13);
    expect(day.solvePartOne(day.input)).toBe(5252);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(140);
    expect(day.solvePartTwo(day.input)).toBe(20592);
  });
});
