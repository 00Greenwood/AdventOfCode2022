import { Day21 } from '../../days/Day21';

describe('Day 21', () => {
  const day = new Day21();

  test('Name', () => {
    expect(day.name).toBe('Day21');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(152);
    expect(day.solvePartOne(day.input)).toBe(331120084396440);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(301);
    expect(day.solvePartTwo(day.input)).toBe(3378273370680);
  });
});
