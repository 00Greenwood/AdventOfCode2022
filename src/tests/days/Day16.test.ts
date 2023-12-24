import { Day16 } from '../../days/Day16';

describe('Day 16', () => {
  const day = new Day16();

  test('Name', () => {
    expect(day.name).toBe('Day16');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(1651);
    expect(day.solvePartOne(day.input)).toBe(1595);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(1707);
    expect(day.solvePartTwo(day.input)).toBe(2189);
  });
});
