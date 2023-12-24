import { Day25 } from '../../days/Day25';

describe('Day 25', () => {
  const day = new Day25();

  test('Name', () => {
    expect(day.name).toBe('Day25');
  });

  test('Part 1', () => {
    expect(day.solvePartOne(day.testInput)).toBe('2=-1=0');
    expect(day.solvePartOne(day.input)).toBe('2=0-2-1-0=20-01-2-20');
  });
});
