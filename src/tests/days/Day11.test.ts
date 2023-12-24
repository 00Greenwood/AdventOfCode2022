import { Day11 } from '../../days/Day11';

describe('Day 11', () => {
  const day = new Day11();

  test('Name', () => {
    expect(day.name).toBe('Day11');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(10605);
    expect(day.solvePartOne(day.input)).toBe(98280);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(2713310158);
    expect(day.solvePartTwo(day.input)).toBe(17673687232);
  });
});
