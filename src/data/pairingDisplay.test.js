import { describe, expect, it } from 'vitest';
import { SYNERGY_LABELS, SYNERGY_COLORS } from './pairingDisplay.js';

describe('SYNERGY_LABELS and SYNERGY_COLORS', () => {
  it('have one entry per synergy score, 0 (unused) through 5', () => {
    expect(SYNERGY_LABELS).toHaveLength(6);
    expect(SYNERGY_COLORS).toHaveLength(6);
  });

  it('give every synergy score 1-5 a non-empty label and a hex color', () => {
    for (let score = 1; score <= 5; score++) {
      expect(SYNERGY_LABELS[score].length).toBeGreaterThan(0);
      expect(SYNERGY_COLORS[score]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
