import { describe, expect, it } from 'vitest';
import { ENCOUNTER_DATA } from './encounterData.js';

const { envs, crXP, thresholds, monsters } = ENCOUNTER_DATA;

describe('ENCOUNTER_DATA.monsters', () => {
  it('is a non-empty array where every monster has the fields the builder relies on', () => {
    expect(monsters.length).toBeGreaterThan(0);
    for (const m of monsters) {
      expect(typeof m.id).toBe('string');
      expect(typeof m.name).toBe('string');
      expect(typeof m.cr).toBe('string');
      expect(typeof m.type).toBe('string');
      expect(typeof m.size).toBe('string');
      expect(typeof m.hp).toBe('number');
      expect(typeof m.ac).toBe('number');
      expect(Array.isArray(m.env)).toBe(true);
      expect(m.env.length).toBeGreaterThan(0);
    }
  });

  it('has unique ids', () => {
    const ids = monsters.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only references CRs present in crXP', () => {
    for (const m of monsters) {
      expect(crXP).toHaveProperty(m.cr);
    }
  });

  it('only references terrains present in envs', () => {
    for (const m of monsters) {
      for (const e of m.env) {
        expect(envs).toContain(e);
      }
    }
  });

  it('every terrain in envs is used by at least one monster', () => {
    for (const e of envs) {
      expect(monsters.some((m) => m.env.includes(e))).toBe(true);
    }
  });
});

describe('ENCOUNTER_DATA.thresholds', () => {
  it('has 21 entries indexed by character level, with index 0 unused', () => {
    expect(thresholds).toHaveLength(21);
    expect(thresholds[0]).toBeNull();
  });

  it('gives each level 1-20 an ascending [easy, medium, hard, deadly] XP tuple', () => {
    for (let level = 1; level <= 20; level += 1) {
      const t = thresholds[level];
      expect(t).toHaveLength(4);
      expect(t[0]).toBeLessThan(t[1]);
      expect(t[1]).toBeLessThan(t[2]);
      expect(t[2]).toBeLessThan(t[3]);
    }
  });
});
