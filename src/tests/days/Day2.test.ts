import { Day2 } from '../../days/Day2';

describe('Day 2', () => {
  const day = new Day2();

  test('Name', () => {
    expect(day.name).toBe('Day2');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(15);
    expect(day.solvePartOne(day.input)).toBe(11386);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(12);
    expect(day.solvePartTwo(day.input)).toBe(13600);
  });
});
