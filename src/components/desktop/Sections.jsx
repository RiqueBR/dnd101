import { useState, useMemo } from 'react';
import { DND_DATA } from '../../data/dndData.js';
import { Label, StatBadge, RaceCard, ClassCard, DetailPanel } from './Cards.jsx';

export const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '0.05em' }}>{title}</h2>
    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.6, maxWidth: 680 }}>{subtitle}</p>
    <div style={{ height: 1, background: 'linear-gradient(to right, var(--accent), transparent)', marginTop: 12 }} />
  </div>
);

// ── Races ─────────────────────────────────────────────
export const RacesSection = () => {
  const { races } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (r) => setSelected(prev => prev?.id === r.id ? null : r);
  return (
    <div>
      <SectionHeader title="Races" subtitle="Your race defines your ancestry, giving you stat bonuses, innate traits, and a physical and cultural identity. Choose one that fits your character concept." />
      {selected && <DetailPanel item={selected} type="race" onClose={() => setSelected(null)} />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 12 }}>
        {races.map(r => <RaceCard key={r.id} race={r} onClick={toggle} isSelected={selected?.id === r.id} />)}
      </div>
    </div>
  );
};

// ── Classes ────────────────────────────────────────────
export const ClassesSection = () => {
  const { classes } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (c) => setSelected(prev => prev?.id === c.id ? null : c);
  return (
    <div>
      <SectionHeader title="Classes" subtitle="Your class is your adventuring profession—it shapes your abilities, combat style, and role in the party. Each class rewards a different style of play." />
      {selected && <DetailPanel item={selected} type="class" onClose={() => setSelected(null)} />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 12 }}>
        {classes.map(c => <ClassCard key={c.id} cls={c} onClick={toggle} isSelected={selected?.id === c.id} />)}
      </div>
    </div>
  );
};

// ── Ability Scores ────────────────────────────────────
export const AbilityScoresSection = () => {
  const { abilityScores } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Ability Scores" subtitle="Six core numbers define every creature in D&D. They determine your strengths, weaknesses, and which skills and spells you excel at." />
      <div style={{ marginBottom: 18, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>How Modifiers Work: </strong>
        Your score isn't used directly—you calculate a modifier: <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>(score − 10) ÷ 2, rounded down</span>. A score of 10 = +0. A score of 16 = +3. This modifier is what gets added to dice rolls.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {abilityScores.map(score => (
          <div key={score.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${score.color}`, borderRadius: 8, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 8, background: score.color + '1a', border: `1px solid ${score.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, fontFamily: 'var(--font-heading)', color: score.color
              }}>{score.abbr}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{score.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ability Score</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 12 }}>{score.description}</p>
            <Label>What It Affects</Label>
            <div style={{ marginBottom: 12 }}>
              {score.uses.map((u, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 4, alignItems: 'flex-start' }}>
                  <span style={{ color: score.color, fontSize: 9, marginTop: 4, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{u}</span>
                </div>
              ))}
            </div>
            {score.skills.length > 0 && <>
              <Label>Associated Skills</Label>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                {score.skills.map(s => (
                  <span key={s} style={{ padding: '3px 9px', borderRadius: 4, fontSize: 11, background: score.color + '1a', border: `1px solid ${score.color}33`, color: score.color }}>{s}</span>
                ))}
              </div>
            </>}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
              <Label>Saving Throw</Label>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, fontStyle: 'italic' }}>{score.savingThrow}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Spells ─────────────────────────────────────────────
const SCHOOL_COLORS = { Evocation:'#c8743a', Abjuration:'#4a6fa5', Conjuration:'#4a7a2a', Illusion:'#6b3a8b', Enchantment:'#8b3a6b', Necromancy:'#3a6b5a', Divination:'#8b7a1a', Transmutation:'#5a7a8b' };
const LEVEL_LABELS = ['Cantrip','1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];
const SCHOOLS = ['All','Evocation','Abjuration','Conjuration','Illusion','Enchantment','Necromancy','Divination','Transmutation'];

const ROLL_TYPE_META = {
  attack:      { label: 'Attack Roll', color: '#c8743a' },
  save:        { label: 'Save vs DC',  color: '#8b3a3a' },
  heal:        { label: 'Healing',     color: '#4a7a2a' },
  auto:        { label: 'Auto-Hit',    color: '#6b3a8b' },
  conditional: { label: 'Conditional', color: '#8b7a1a' },
  buff:        { label: 'Buff',        color: '#4a6fa5' },
  utility:     { label: 'Utility',     color: '#5a7a8b' },
};

export const SpellsSection = () => {
  const { spells } = DND_DATA;
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const filtered = useMemo(() => filter === 'All' ? spells : spells.filter(s => s.school === filter), [filter, spells]);

  return (
    <div>
      <SectionHeader title="Spells" subtitle="Magic is woven into D&D's fabric. Spells range from cantrips (free, infinite use) to 9th-level world-shaking magic. Each spell shows you what to roll." />

      {/* Dice primer */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '13px 17px', marginBottom: 18, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>Spell Save DC:</strong> 8 + your proficiency bonus + spellcasting modifier.
        <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-heading)', marginLeft: 12 }}>Attack Roll:</strong> 1d20 + proficiency + spellcasting modifier.
        <span style={{ marginLeft: 12, fontStyle: 'italic' }}>Spellcasting modifier = WIS for Cleric/Druid/Ranger, INT for Wizard/Artificer, CHA for Bard/Paladin/Sorcerer/Warlock.</span>
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 20 }}>
        {SCHOOLS.map(s => {
          const active = filter === s;
          const c = SCHOOL_COLORS[s];
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '5px 12px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${active ? (c || 'var(--accent)') : 'var(--border)'}`,
              background: active ? (c ? c + '22' : 'var(--accent-subtle)') : 'var(--surface)',
              color: active ? (c || 'var(--accent)') : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)', letterSpacing: '0.03em', transition: 'all 0.15s'
            }}>{s}</button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {filtered.map(spell => {
          const c = SCHOOL_COLORS[spell.school] || '#888';
          const open = expanded === spell.name;
          const rollMeta = spell.roll ? ROLL_TYPE_META[spell.roll.type] : null;
          return (
            <div key={spell.name} onClick={() => setExpanded(open ? null : spell.name)}
              style={{ background: 'var(--surface)', border: `1px solid ${open ? c : 'var(--border)'}`, borderLeft: `3px solid ${c}`, borderRadius: 8, padding: '13px 15px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{spell.name}</div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                  <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700, background: c + '22', color: c, border: `1px solid ${c}33` }}>{LEVEL_LABELS[spell.level]}</span>
                  <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 9, fontWeight: 600, background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{spell.school}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 10, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                <span>{spell.castingTime}</span><span style={{ color: 'var(--border)' }}>·</span>
                <span>{spell.range}</span><span style={{ color: 'var(--border)' }}>·</span>
                <span>{spell.duration}</span>
              </div>
              {/* Roll summary chips */}
              {spell.roll && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 7 }}>
                  {rollMeta && <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: rollMeta.color + '22', color: rollMeta.color, border: `1px solid ${rollMeta.color}44`, fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>{rollMeta.label}</span>}
                  {spell.roll.save && <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'monospace' }}>{spell.roll.save} save</span>}
                  {spell.roll.attack && <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'monospace' }}>{spell.roll.attack}</span>}
                  {spell.roll.damage && <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'monospace' }}>{spell.roll.damage}</span>}
                  {spell.roll.healing && <span style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'monospace' }}>{spell.roll.healing}</span>}
                </div>
              )}
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: open ? 8 : 0 }}>
                {spell.classes.join(', ')}
              </div>
              {open && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 9 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.7, marginBottom: 9 }}>{spell.desc}</div>
                  {spell.diceNote && (
                    <div style={{ background: c + '12', border: `1px solid ${c}33`, borderRadius: 5, padding: '8px 11px', marginBottom: spell.roll?.upcast ? 7 : 0 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: c, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--font-heading)' }}>How to Roll</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{spell.diceNote}</div>
                    </div>
                  )}
                  {spell.roll?.upcast && (
                    <div style={{ fontSize: 11, color: 'var(--accent)', fontStyle: 'italic', marginTop: 4 }}>
                      <strong style={{ fontStyle: 'normal' }}>Upcast: </strong>{spell.roll.upcast}
                    </div>
                  )}
                </div>
              )}
              {!open && <div style={{ fontSize: 10, color: c, marginTop: 4, opacity: 0.8 }}>Click for description ▾</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Actions ────────────────────────────────────────────
const TYPE_COLORS = { 'Action':'#c8743a', 'Bonus Action':'#4a6fa5', 'Reaction':'#8b3a3a', 'Free':'#4a7a2a', 'Action / Bonus / Reaction':'#6b3a8b' };

export const ActionsSection = () => {
  const { actions } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Actions" subtitle="Every turn in combat, you get one Action, one Bonus Action, and one Reaction. Here's the full menu of what you can do—and when." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {[['Action', 'Your main turn activity. Attack, cast a spell, dash, or more.', '#c8743a'],
          ['Bonus Action', 'Some abilities, spells, or class features let you act again.', '#4a6fa5'],
          ['Reaction', 'Triggered by specific events—even on other people\'s turns.', '#8b3a3a']
        ].map(([name, desc, color]) => (
          <div key={name} style={{ background: 'var(--surface)', border: `1px solid ${color}44`, borderTop: `2px solid ${color}`, borderRadius: 6, padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: color, marginBottom: 5 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>
      {actions.map(cat => (
        <div key={cat.category} style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, borderBottom: '1px solid var(--border)', paddingBottom: 7 }}>{cat.category}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 9 }}>
            {cat.items.map(a => {
              const typeKey = Object.keys(TYPE_COLORS).find(k => a.type.includes(k.split(' ')[0])) || 'Action';
              const color = TYPE_COLORS[a.type] || TYPE_COLORS[typeKey] || '#888';
              return (
                <div key={a.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${color}`, borderRadius: 6, padding: '11px 13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{a.name}</div>
                    <span style={{ padding: '1px 7px', borderRadius: 3, fontSize: 9, fontWeight: 700, background: color + '22', color: color, border: `1px solid ${color}33`, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8 }}>{a.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 7 }}>{a.desc}</div>
                  {a.dice && (
                    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, padding: '6px 9px', marginBottom: 7, display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 3 }}>Rolls:</span>
                      {a.dice.map((d, i) => (
                        <span key={i} style={{ padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 700, background: color + '22', color: color, border: `1px solid ${color}44`, fontFamily: 'monospace' }}>{d}</span>
                      ))}
                      {a.diceNote && <div style={{ flexBasis: '100%', marginTop: 4, fontSize: 10.5, color: 'var(--text-muted)', lineHeight: 1.45 }}>{a.diceNote}</div>}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: 'var(--accent)', fontStyle: 'italic' }}>e.g. {a.example}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Rounds / Turn Structure ─────────────────────────
const Die = ({ sides, label, color }) => {
  // simple shape per die type
  const shapes = { 4: 'polygon(50% 0%, 100% 100%, 0% 100%)', 6: 'inset(0)', 8: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 10: 'polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)', 12: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', 20: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)' };
  const c = color || 'var(--dice-color)';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 52, height: 52,
        background: `linear-gradient(135deg, ${color ? color + '55' : 'var(--dice-fill-top)'} 0%, ${color ? color + '22' : 'var(--dice-fill-bot)'} 100%)`,
        border: `2px solid ${c}`,
        clipPath: shapes[sides] || shapes[20],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14,
        color: c,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
      }}>d{sides}</div>
      {label && <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 90, lineHeight: 1.3 }}>{label}</div>}
    </div>
  );
};

export const RoundsSection = () => {
  const { rounds } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Anatomy of a Round" subtitle="Combat in D&D is structured: everyone takes a turn in order, then the round repeats. Here's exactly what happens, and what you can do on your turn." />

      {/* Overview */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '18px 22px', marginBottom: 22 }}>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{rounds.overview}</p>
      </div>

      {/* Initiative */}
      <Label>Step 0 — Rolling Initiative</Label>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)', borderLeft: '3px solid var(--accent)', borderRadius: 8, padding: '18px 22px', marginBottom: 28, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <Die sides={20} label="Initiative" />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{rounds.initiative.title}</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>{rounds.initiative.desc}</p>
          <div style={{ display: 'inline-block', padding: '4px 10px', background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', borderRadius: 4, color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, marginBottom: 7 }}>{rounds.initiative.dice}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>{rounds.initiative.tip}</div>
        </div>
      </div>

      {/* Turn flow */}
      <Label>On Your Turn — the 6 Steps</Label>
      <div style={{ position: 'relative', marginBottom: 28 }}>
        {rounds.turnFlow.map((step, i) => (
          <div key={step.step} style={{ display: 'flex', gap: 14, marginBottom: 9, position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-subtle)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent)', fontSize: 14 }}>{step.step}</div>
              {i < rounds.turnFlow.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 3, minHeight: 14 }} />}
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 16px', flex: 1, marginBottom: 4 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{step.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reactions */}
      <Label>Reactions — the Off-Turn Exception</Label>
      <div style={{ background: 'var(--surface)', border: '1px solid #8b3a3a44', borderLeft: '3px solid #8b3a3a', borderRadius: 8, padding: '14px 18px', marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{rounds.reactionsNote}</p>
      </div>

      {/* Movement rules */}
      <Label>Movement Rules</Label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginBottom: 28 }}>
        {rounds.movementRules.map(rule => (
          <div key={rule.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '11px 14px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 12.5, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{rule.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{rule.desc}</div>
          </div>
        ))}
      </div>

      {/* Common questions */}
      <Label>Common Questions</Label>
      <div style={{ display: 'grid', gap: 8 }}>
        {rounds.commonQuestions.map((qa, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 15px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>Q.</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{qa.q}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>A.</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{qa.a}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dice primer */}
      <Label>The Dice You'll Roll</Label>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <Die sides={4} label="Daggers, healing" color="#4a7a2a" />
        <Die sides={6} label="Sneak Attack, Fireball" color="#c8743a" />
        <Die sides={8} label="Longsword, Cure Wounds" color="#4a6fa5" />
        <Die sides={10} label="Halberds, big spells" color="#8b3a6b" />
        <Die sides={12} label="Greataxe damage" color="#8b3a3a" />
        <Die sides={20} label="ATTACKS & CHECKS" color="var(--accent)" />
      </div>
    </div>
  );
};

// ── Pairings ───────────────────────────────────────────
const SynergyBar = ({ score, color }) => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
    {[1,2,3,4,5].map(i => (
      <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: i <= score ? color : 'var(--surface2)', border: `1px solid ${i <= score ? color : 'var(--border)'}`, transition: 'all 0.3s' }} />
    ))}
  </div>
);

export const PairingSection = () => {
  const { races, classes, pairings } = DND_DATA;
  const [selRace, setSelRace] = useState(null);
  const [selClass, setSelClass] = useState(null);

  const result = useMemo(() => {
    if (!selRace || !selClass) return null;
    return (pairings[selRace] || {})[selClass] || null;
  }, [selRace, selClass, pairings]);

  const raceObj = races.find(r => r.id === selRace);
  const classObj = classes.find(c => c.id === selClass);
  const LABELS = ['','Poor fit','Below average','Decent match','Strong synergy','Excellent match'];
  const COLORS = ['','#8b3a3a','#8b6a1a','#6b7a3a','#3a7a6b','#4a6fa5'];
  const synColor = result ? COLORS[result.synergy] : '';
  const synLabel = result ? LABELS[result.synergy] : '';

  return (
    <div>
      <SectionHeader title="Race + Class Pairings" subtitle="Some race and class combinations have natural stat synergy. Others are unconventional but work great for roleplay. Pick both to see a detailed breakdown." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-heading)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 9 }}>Choose a Race</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {races.map(r => (
              <button key={r.id} onClick={() => setSelRace(r.id)} style={{
                background: selRace === r.id ? r.color + '28' : 'var(--surface)',
                border: `1px solid ${selRace === r.id ? r.color : 'var(--border)'}`,
                borderRadius: 6, padding: '9px 5px', cursor: 'pointer',
                color: selRace === r.id ? r.color : 'var(--text-muted)',
                fontSize: 11, fontFamily: 'var(--font-heading)', transition: 'all 0.15s', textAlign: 'center', lineHeight: 1.3
              }}>
                <div style={{ fontSize: 9, marginBottom: 2, opacity: 0.7 }}>{r.icon}</div>
                {r.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-heading)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 9 }}>Choose a Class</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {classes.map(c => (
              <button key={c.id} onClick={() => setSelClass(c.id)} style={{
                background: selClass === c.id ? c.color + '28' : 'var(--surface)',
                border: `1px solid ${selClass === c.id ? c.color : 'var(--border)'}`,
                borderRadius: 6, padding: '9px 5px', cursor: 'pointer',
                color: selClass === c.id ? c.color : 'var(--text-muted)',
                fontSize: 11, fontFamily: 'var(--font-heading)', transition: 'all 0.15s', textAlign: 'center', lineHeight: 1.3
              }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{c.icon}</div>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && raceObj && classObj ? (
        <div style={{ background: 'var(--surface)', border: `1px solid ${synColor}55`, borderTop: `3px solid ${synColor}`, borderRadius: 8, padding: '22px 24px', animation: 'fadeIn 0.25s ease' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: raceObj.color }}>{raceObj.name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>+</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: classObj.color }}>{classObj.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <SynergyBar score={result.synergy} color={synColor} />
            <span style={{ fontSize: 13, fontWeight: 700, color: synColor, fontFamily: 'var(--font-heading)' }}>{synLabel}</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>{result.summary}</p>
          <Label>Key Highlights</Label>
          <div style={{ marginBottom: 16 }}>
            {result.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, alignItems: 'flex-start' }}>
                <span style={{ color: synColor, flexShrink: 0, marginTop: 3, fontSize: 10 }}>▸</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 7 }}>{raceObj.name} brings these stat bonuses:</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Object.entries(raceObj.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '50px 24px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 14 }}>
          {!selRace && !selClass ? 'Select a race and class above to see their synergy' :
           !selRace ? 'Now select a race to complete the pairing' :
           'Now select a class to see the pairing result'}
        </div>
      )}
    </div>
  );
};
