import { Day23 } from '../../days/Day23';

describe('Day 23', () => {
  const day = new Day23();

  test('Name', () => {
    expect(day.name).toBe('Day23');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(110);
    expect(day.solvePartOne(day.input)).toBe(3689);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(20);
    expect(day.solvePartTwo(day.input)).toBe(965);
  });
});
