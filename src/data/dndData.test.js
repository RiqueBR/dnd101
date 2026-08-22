import { describe, expect, it } from 'vitest';
import { DND_DATA } from './dndData.js';

describe('DND_DATA.races', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(DND_DATA.races)).toBe(true);
    expect(DND_DATA.races.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = DND_DATA.races.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every race has the required shape', () => {
    for (const race of DND_DATA.races) {
      expect(race).toHaveProperty('id');
      expect(race).toHaveProperty('name');
      expect(race).toHaveProperty('tagline');
      expect(race).toHaveProperty('description');
      expect(typeof race.statBonuses).toBe('object');
      expect(Array.isArray(race.traits)).toBe(true);
      expect(race.traits.length).toBeGreaterThan(0);
      expect(Array.isArray(race.bestClasses)).toBe(true);
      expect(typeof race.speed).toBe('number');
    }
  });

  it('every trait has a name and description', () => {
    for (const race of DND_DATA.races) {
      for (const trait of race.traits) {
        expect(typeof trait.name).toBe('string');
        expect(trait.name.length).toBeGreaterThan(0);
        expect(typeof trait.desc).toBe('string');
        expect(trait.desc.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('DND_DATA.classes', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(DND_DATA.classes)).toBe(true);
    expect(DND_DATA.classes.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = DND_DATA.classes.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every class has the required shape', () => {
    const validHitDice = ['d6', 'd8', 'd10', 'd12'];
    for (const cls of DND_DATA.classes) {
      expect(cls).toHaveProperty('id');
      expect(cls).toHaveProperty('name');
      expect(validHitDice).toContain(cls.hitDie);
      expect(Array.isArray(cls.primaryAbility)).toBe(true);
      expect(cls.primaryAbility.length).toBeGreaterThan(0);
      expect(Array.isArray(cls.savingThrows)).toBe(true);
      expect(cls.savingThrows).toHaveLength(2);
      expect(Array.isArray(cls.keyFeatures)).toBe(true);
      expect(cls.keyFeatures.length).toBeGreaterThan(0);
    }
  });

  it('keyFeatures are ordered by non-decreasing level', () => {
    for (const cls of DND_DATA.classes) {
      const levels = cls.keyFeatures.map((f) => f.level);
      const sorted = [...levels].sort((a, b) => a - b);
      expect(levels).toEqual(sorted);
    }
  });
});

describe('DND_DATA.abilityScores', () => {
  const EXPECTED_ABBRS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

  it('has exactly the six core abilities', () => {
    const abbrs = DND_DATA.abilityScores.map((a) => a.abbr);
    expect(abbrs.sort()).toEqual([...EXPECTED_ABBRS].sort());
  });

  it('every ability has uses and a saving throw description', () => {
    for (const ability of DND_DATA.abilityScores) {
      expect(Array.isArray(ability.uses)).toBe(true);
      expect(ability.uses.length).toBeGreaterThan(0);
      expect(typeof ability.savingThrow).toBe('string');
      expect(ability.savingThrow.length).toBeGreaterThan(0);
    }
  });
});

describe('DND_DATA.spells', () => {
  it('every spell references a class that exists in DND_DATA.classes', () => {
    const classNames = new Set(DND_DATA.classes.map((c) => c.name));
    for (const spell of DND_DATA.spells) {
      for (const className of spell.classes) {
        expect(classNames.has(className)).toBe(true);
      }
    }
  });

  it('every spell has a non-negative integer level', () => {
    for (const spell of DND_DATA.spells) {
      expect(Number.isInteger(spell.level)).toBe(true);
      expect(spell.level).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('DND_DATA.pairings', () => {
  it('has a top-level entry for every race', () => {
    const raceIds = DND_DATA.races.map((r) => r.id).sort();
    const pairingRaceKeys = Object.keys(DND_DATA.pairings).sort();
    expect(pairingRaceKeys).toEqual(raceIds);
  });

  it('every pairing class key references a class that exists in DND_DATA.classes', () => {
    const classIds = new Set(DND_DATA.classes.map((c) => c.id));
    for (const raceId of Object.keys(DND_DATA.pairings)) {
      for (const classId of Object.keys(DND_DATA.pairings[raceId])) {
        expect(classIds.has(classId), `${raceId}/${classId}`).toBe(true);
      }
    }
  });

  it('every pairing has a synergy score from 1 to 5 and non-empty highlights', () => {
    for (const raceId of Object.keys(DND_DATA.pairings)) {
      for (const [classId, pairing] of Object.entries(DND_DATA.pairings[raceId])) {
        expect(pairing.synergy, `${raceId}/${classId} synergy`).toBeGreaterThanOrEqual(1);
        expect(pairing.synergy, `${raceId}/${classId} synergy`).toBeLessThanOrEqual(5);
        expect(typeof pairing.summary, `${raceId}/${classId} summary`).toBe('string');
        expect(pairing.summary.length, `${raceId}/${classId} summary`).toBeGreaterThan(0);
        expect(Array.isArray(pairing.highlights), `${raceId}/${classId} highlights`).toBe(true);
        expect(pairing.highlights.length, `${raceId}/${classId} highlights`).toBeGreaterThan(0);
      }
    }
  });
});
