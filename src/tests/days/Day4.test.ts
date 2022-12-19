import { Day4 } from '../../days/Day4';

describe('Day 4', () => {
  const day = new Day4();

  test('Name', () => {
    expect(day.name).toBe('Day4');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe(2);
    expect(day.solvePartOne(day.input)).toBe(483);
  });

  test('Part 2', () => {
    expect(day.solvePartTwo(day.testInput)).toBe(4);
    expect(day.solvePartTwo(day.input)).toBe(874);
  });
});
