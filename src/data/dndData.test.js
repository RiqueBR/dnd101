import { describe, expect, it } from 'vitest';
import { DND_DATA } from './dndData.js';

function idsOf(entries) {
  return entries.map(entry => entry.id);
}

describe('DND_DATA.races', () => {
  it('every race has a unique id, name, and at least one trait', () => {
    const ids = idsOf(DND_DATA.races);

    expect(new Set(ids).size).toBe(ids.length);

    for (const race of DND_DATA.races) {
      expect(race.id).toBeTruthy();
      expect(race.name).toBeTruthy();
      expect(Array.isArray(race.traits)).toBe(true);
      expect(race.traits.length).toBeGreaterThan(0);
    }
  });
});

describe('DND_DATA.classes', () => {
  it('every class has a unique id and at least one key feature', () => {
    const ids = idsOf(DND_DATA.classes);

    expect(new Set(ids).size).toBe(ids.length);

    for (const cls of DND_DATA.classes) {
      expect(cls.id).toBeTruthy();
      expect(cls.name).toBeTruthy();
      expect(Array.isArray(cls.keyFeatures)).toBe(true);
      expect(cls.keyFeatures.length).toBeGreaterThan(0);
    }
  });

  it('every hit die is a valid dice notation', () => {
    for (const cls of DND_DATA.classes) {
      expect(cls.hitDie).toMatch(/^d\d+$/);
    }
  });
});
