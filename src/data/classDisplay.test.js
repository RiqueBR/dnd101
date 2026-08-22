import { describe, expect, it } from 'vitest';
import { DIFFICULTY_COLORS } from './classDisplay.js';

describe('DIFFICULTY_COLORS', () => {
  it('covers Beginner, Intermediate and Advanced with a hex color each', () => {
    expect(Object.keys(DIFFICULTY_COLORS)).toEqual(['Beginner', 'Intermediate', 'Advanced']);
    for (const color of Object.values(DIFFICULTY_COLORS)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
