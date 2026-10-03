import { describe, expect, it, vi } from 'vitest';
import { ENCOUNTER_DATA } from '../data/encounterData.js';
import { computeEncounter, crToNumber, generateEncounter, monsterMultiplier } from './encounterMath.js';

describe('crToNumber', () => {
  it('parses fractional challenge ratings', () => {
    expect(crToNumber('1/8')).toBeCloseTo(0.125);
    expect(crToNumber('1/4')).toBeCloseTo(0.25);
    expect(crToNumber('1/2')).toBeCloseTo(0.5);
  });

  it('parses whole-number challenge ratings', () => {
    expect(crToNumber('0')).toBe(0);
    expect(crToNumber('5')).toBe(5);
    expect(crToNumber('21')).toBe(21);
  });
});

describe('monsterMultiplier', () => {
  it('steps up with monster count for an average-size party', () => {
    expect(monsterMultiplier(1, 4)).toBe(1);
    expect(monsterMultiplier(2, 4)).toBe(1.5);
    expect(monsterMultiplier(3, 4)).toBe(2);
    expect(monsterMultiplier(6, 4)).toBe(2);
    expect(monsterMultiplier(7, 4)).toBe(2.5);
    expect(monsterMultiplier(10, 4)).toBe(2.5);
    expect(monsterMultiplier(11, 4)).toBe(3);
    expect(monsterMultiplier(14, 4)).toBe(3);
    expect(monsterMultiplier(15, 4)).toBe(4);
  });

  it('bumps the multiplier up one step for a party smaller than 3', () => {
    expect(monsterMultiplier(1, 2)).toBe(1.5);
    expect(monsterMultiplier(3, 2)).toBe(2.5);
  });

  it('drops the multiplier down one step for a party of 6 or more, with a single monster at half', () => {
    expect(monsterMultiplier(1, 6)).toBe(0.5);
    expect(monsterMultiplier(3, 6)).toBe(1.5);
    expect(monsterMultiplier(15, 6)).toBe(3);
  });

  it('is 1 when there are no monsters', () => {
    expect(monsterMultiplier(0, 4)).toBe(1);
  });
});

describe('computeEncounter', () => {
  const party = [{ count: 4, level: 3 }];

  it('labels Easy when there are no monsters', () => {
    const r = computeEncounter(party, []);
    expect(r.difficulty).toBe('Easy');
    expect(r.adjustedXP).toBe(0);
  });

  it('labels exactly at a threshold as that difficulty band', () => {
    // level-3 party of 4: medium threshold is 150 XP/char = 600 total.
    // Two CR-1 bugbears (200 XP each) at a x1.5 multiplier (2 monsters, 4
    // players) land exactly on it: 200 * 2 * 1.5 = 600.
    const { thresholds } = ENCOUNTER_DATA;
    const mediumTotal = thresholds[3][1] * 4;
    const r = computeEncounter(party, [{ id: 'bugbear', qty: 2 }]);
    expect(r.adjustedXP).toBe(mediumTotal);
    expect(r.difficulty).toBe('Medium');
  });

  it('scales the party XP budget by party size and level', () => {
    const small = computeEncounter([{ count: 2, level: 5 }], []);
    const large = computeEncounter([{ count: 6, level: 5 }], []);
    expect(large.thresholds[0]).toBe(small.thresholds[0] * 3);
  });

  it('ignores encounter entries with no matching monster', () => {
    const r = computeEncounter(party, [{ id: 'not-a-real-monster', qty: 5 }]);
    expect(r.monsterCount).toBe(0);
    expect(r.baseXP).toBe(0);
  });
});

describe('generateEncounter', () => {
  const party = [{ count: 4, level: 3 }];

  it('only returns monsters that match the requested terrain', () => {
    const encounter = generateEncounter(party, 'Medium', 'Arctic');
    const { monsters } = ENCOUNTER_DATA;
    for (const entry of encounter) {
      const m = monsters.find((x) => x.id === entry.id);
      expect(m.env).toContain('Arctic');
    }
  });

  it('only returns monsters within 3 CR of the average party level', () => {
    const encounter = generateEncounter(party, 'Deadly', 'Any');
    const { monsters } = ENCOUNTER_DATA;
    for (const entry of encounter) {
      const m = monsters.find((x) => x.id === entry.id);
      expect(crToNumber(m.cr)).toBeLessThanOrEqual(3 + 3);
    }
  });

  it('returns an empty encounter when no monster matches the terrain', () => {
    expect(generateEncounter(party, 'Easy', 'Nowhere')).toEqual([]);
  });

  it('is capable of landing exactly inside the requested difficulty band', () => {
    const spy = vi.spyOn(Math, 'random');
    // Force the "single monster group" shape (shape < 0.25) and the same
    // pick every time, so the search is deterministic.
    spy.mockReturnValue(0.1);
    const encounter = generateEncounter(party, 'Easy', 'Any');
    spy.mockRestore();
    expect(encounter.length).toBeGreaterThan(0);
  });
});
