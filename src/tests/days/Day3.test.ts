import { Day3 } from '../../days/Day3';

describe('Day 3', () => {
  const day = new Day3();

  test('Name', () => {
    expect(day.name).toBe('Day3');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(157);
    expect(day.solvePartOne(day.input)).toBe(8176);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(70);
    expect(day.solvePartTwo(day.input)).toBe(2689);
  });
});
