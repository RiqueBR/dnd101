import { describe, expect, it } from 'vitest';
import { SCHOOL_COLORS, SPELL_SCHOOLS, SPELL_LEVEL_LABELS, ROLL_TYPE_META } from './spellDisplay.js';

describe('SPELL_SCHOOLS', () => {
  it('starts with the "All" filter followed by every school in SCHOOL_COLORS', () => {
    expect(SPELL_SCHOOLS[0]).toBe('All');
    expect(SPELL_SCHOOLS.slice(1)).toEqual(Object.keys(SCHOOL_COLORS));
  });
});

describe('SPELL_LEVEL_LABELS', () => {
  it('has one label per spell level, 0 (cantrip) through 9', () => {
    expect(SPELL_LEVEL_LABELS).toHaveLength(10);
    expect(SPELL_LEVEL_LABELS[0]).toBe('Cantrip');
  });
});

describe('ROLL_TYPE_META', () => {
  it('gives every roll type a label and a color', () => {
    for (const meta of Object.values(ROLL_TYPE_META)) {
      expect(typeof meta.label).toBe('string');
      expect(meta.label.length).toBeGreaterThan(0);
      expect(meta.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
