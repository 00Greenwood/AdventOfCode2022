import { Day20 } from '../../days/Day20';

describe('Day 20', () => {
  const day = new Day20();

  test('Name', () => {
    expect(day.name).toBe('Day20');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(3);
    expect(day.solvePartOne(day.input)).toBe(19559);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(1623178306);
    expect(day.solvePartTwo(day.input)).toBe(912226207972);
  });
});
