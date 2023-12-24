import { Day17 } from '../../days/Day17';

describe('Day 17', () => {
  const day = new Day17();

  test('Name', () => {
    expect(day.name).toBe('Day17');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(3068);
    expect(day.solvePartOne(day.input)).toBe(3191);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(1514285714288);
    expect(day.solvePartTwo(day.input)).toBe(1572093023267);
  });
});
