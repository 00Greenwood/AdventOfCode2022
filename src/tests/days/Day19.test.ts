import { Day19 } from '../../days/Day19';

describe('Day 19', () => {
  const day = new Day19();

  test('Name', () => {
    expect(day.name).toBe('Day19');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(33);
    expect(day.solvePartOne(day.input)).toBe(978);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(3472);
    expect(day.solvePartTwo(day.input)).toBe(15939);
  });
});
