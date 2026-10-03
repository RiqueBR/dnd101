// DMG (2014) encounter-building math: XP budgets, the monster-count
// multiplier, and a bounded random search for a same-difficulty encounter.
import { ENCOUNTER_DATA } from '../data/encounterData.js';

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Deadly'];

export const crToNumber = (cr) => (cr.includes('/') ? 1 / Number(cr.split('/')[1]) : Number(cr));

// Multiplier steps for 1, 2, 3-6, 7-10, 11-14, 15+ monsters, shifted one step
// per the DMG's "fewer than 3 players" / "6 or more players" adjustments.
export const monsterMultiplier = (monsterCount, partySize) => {
  const steps = [1, 1.5, 2, 2.5, 3, 4];
  if (monsterCount <= 0) return 1;
  let i = monsterCount === 1 ? 0
    : monsterCount === 2 ? 1
    : monsterCount <= 6 ? 2
    : monsterCount <= 10 ? 3
    : monsterCount <= 14 ? 4
    : 5;
  if (partySize > 0 && partySize < 3) i = Math.min(i + 1, 5);
  else if (partySize >= 6) i = Math.max(i - 1, 0);
  if (partySize >= 6 && monsterCount === 1) return 0.5;
  return steps[i];
};

// party: [{ count, level }]. encounter: [{ id, qty }].
export const computeEncounter = (party, encounter) => {
  const { thresholds, crXP, monsters } = ENCOUNTER_DATA;
  const partyThresholds = [0, 0, 0, 0];
  let partySize = 0;
  party.forEach((group) => {
    partySize += group.count;
    thresholds[group.level].forEach((xp, i) => { partyThresholds[i] += xp * group.count; });
  });

  let baseXP = 0;
  let monsterCount = 0;
  encounter.forEach((entry) => {
    const m = monsters.find((x) => x.id === entry.id);
    if (!m) return;
    baseXP += crXP[m.cr] * entry.qty;
    monsterCount += entry.qty;
  });

  const multiplier = monsterMultiplier(monsterCount, partySize);
  const adjustedXP = Math.round(baseXP * multiplier);

  let difficulty = 'Easy';
  partyThresholds.forEach((xp, i) => { if (adjustedXP >= xp) difficulty = DIFFICULTIES[i]; });

  return { thresholds: partyThresholds, partySize, baseXP, monsterCount, multiplier, adjustedXP, difficulty };
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Searches for a monster combination whose adjusted XP lands in the target
// difficulty's band for this party, filtered by terrain and by CR relative
// to average party level. Returns the closest miss if no exact hit is found
// within the attempt budget.
export const generateEncounter = (party, difficulty, env) => {
  const { monsters } = ENCOUNTER_DATA;
  const totalCount = party.reduce((sum, g) => sum + g.count, 0);
  const avgLevel = Math.round(party.reduce((sum, g) => sum + g.level * g.count, 0) / Math.max(1, totalCount));
  const pool = monsters.filter((m) => (env === 'Any' || m.env.includes(env)) && crToNumber(m.cr) <= avgLevel + 3);
  if (!pool.length) return [];

  const diffIndex = DIFFICULTIES.indexOf(difficulty);
  const probe = computeEncounter(party, []);
  const lo = probe.thresholds[diffIndex];
  const hi = diffIndex < 3 ? probe.thresholds[diffIndex + 1] : probe.thresholds[3] * 1.5;

  let best = null;
  let bestDistance = Infinity;
  for (let tries = 0; tries < 400; tries += 1) {
    const shape = Math.random();
    let candidate;
    if (shape < 0.25) {
      candidate = [{ id: pick(pool).id, qty: 1 }];
    } else if (shape < 0.6) {
      candidate = [{ id: pick(pool).id, qty: 2 + Math.floor(Math.random() * 5) }];
    } else {
      const a = pick(pool);
      const b = pick(pool.filter((m) => m.id !== a.id && crToNumber(m.cr) < crToNumber(a.cr))) || null;
      candidate = b
        ? [{ id: a.id, qty: 1 }, { id: b.id, qty: 2 + Math.floor(Math.random() * 4) }]
        : [{ id: a.id, qty: 1 }];
    }
    const result = computeEncounter(party, candidate).adjustedXP;
    if (result >= lo && result < hi) return candidate;
    const distance = result < lo ? lo - result : result - hi;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return best || [];
};
