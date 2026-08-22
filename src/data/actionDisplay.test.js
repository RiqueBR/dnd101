import { describe, expect, it } from 'vitest';
import { ACTION_TYPE_COLORS } from './actionDisplay.js';

describe('ACTION_TYPE_COLORS', () => {
  it('gives every action type a hex color', () => {
    for (const color of Object.values(ACTION_TYPE_COLORS)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('covers the core action economy types', () => {
    expect(ACTION_TYPE_COLORS).toHaveProperty('Action');
    expect(ACTION_TYPE_COLORS).toHaveProperty('Bonus Action');
    expect(ACTION_TYPE_COLORS).toHaveProperty('Reaction');
    expect(ACTION_TYPE_COLORS).toHaveProperty('Free');
  });
});
