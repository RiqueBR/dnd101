import { useState } from 'react';
import { DIFFICULTY_COLORS } from '../../data/classDisplay.js';

export const Label = ({ children }) => (
  <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, marginTop: 4 }}>
    {children}
  </div>
);

export const StatBadge = ({ stat, value }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
    background: 'var(--surface2)', border: '1px solid var(--border)',
    color: 'var(--accent)', fontFamily: 'monospace', letterSpacing: '0.05em'
  }}>
    <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{stat}</span>
    <span>+{value}</span>
  </div>
);

export const DifficultyBadge = ({ level }) => {
  const c = DIFFICULTY_COLORS[level] || '#888';
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.1em',
      background: c + '28', color: c, border: `1px solid ${c}44`
    }}>{level}</span>
  );
};

export const RaceCard = ({ race, onClick, isSelected }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(race)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isSelected ? 'var(--accent)' : hov ? 'var(--border-hover)' : 'var(--border)'}`,
        borderTop: `3px solid ${isSelected ? 'var(--accent)' : race.color}`,
        borderRadius: 8, padding: '18px 20px', cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? `0 8px 24px ${race.color}1a` : 'none',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '0.04em' }}>{race.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontStyle: 'italic' }}>{race.tagline}</div>
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: 6, background: race.color + '1a',
          border: `1px solid ${race.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 11, color: race.color, flexShrink: 0
        }}>{race.icon}</div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
        {Object.entries(race.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
        {race.extraBonuses && <span style={{ fontSize: 10, color: 'var(--text-muted)', alignSelf: 'center', fontStyle: 'italic' }}>{race.extraBonuses}</span>}
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 11, color: 'var(--text-muted)' }}>
        <span>Size: {race.size}</span><span>Speed: {race.speed} ft</span>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        {race.traits.slice(0, 2).map(t => (
          <div key={t.name} style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{t.name}. </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.desc}</span>
          </div>
        ))}
        {race.traits.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 3 }}>+{race.traits.length - 2} more traits, click to expand</div>}
      </div>
    </div>
  );
};

export const ClassCard = ({ cls, onClick, isSelected }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(cls)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isSelected ? 'var(--accent)' : hov ? 'var(--border-hover)' : 'var(--border)'}`,
        borderTop: `3px solid ${isSelected ? 'var(--accent)' : cls.color}`,
        borderRadius: 8, padding: '18px 20px', cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? `0 8px 24px ${cls.color}1a` : 'none',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '0.04em' }}>{cls.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontStyle: 'italic' }}>{cls.tagline}</div>
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: 6, background: cls.color + '1a',
          border: `1px solid ${cls.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: cls.color, flexShrink: 0
        }}>{cls.icon}</div>
      </div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'monospace' }}>HD: {cls.hitDie}</span>
        {cls.primaryAbility.map(a => (
          <span key={a} style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontFamily: 'monospace' }}>{a}</span>
        ))}
        <DifficultyBadge level={cls.difficulty} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontStyle: 'italic' }}>{cls.role}</div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        {cls.keyFeatures.slice(0, 2).map(f => (
          <div key={f.name} style={{ marginBottom: 5, display: 'flex', gap: 6, alignItems: 'baseline' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'monospace', flexShrink: 0 }}>Lv.{f.level}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DetailPanel = ({ item, type, onClose }) => {
  if (!item) return null;
  const isRace = type === 'race';
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid var(--accent)`,
      borderTop: `3px solid ${item.color}`, borderRadius: 8, padding: '24px', marginBottom: 20
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text)', fontSize: 20 }}>{item.name}</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 13 }}>{item.tagline}</p>
        </div>
        <button onClick={onClose} style={{
          background: 'var(--surface2)', border: '1px solid var(--border)',
          color: 'var(--text-muted)', borderRadius: 4, padding: '4px 12px',
          cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-heading)'
        }}>✕ Close</button>
      </div>
      <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: 13, marginBottom: 16 }}>{item.description}</p>

      {isRace ? (
        <>
          <Label>Ability Score Bonuses</Label>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(item.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
          </div>
          {item.subRaces && <>
            <Label>Subraces</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 16 }}>
              {item.subRaces.map(sr => (
                <div key={sr.name} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: 5 }}>{sr.name}</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
                    {Object.entries(sr.bonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>{sr.extra}</div>
                </div>
              ))}
            </div>
          </>}
          <Label>Racial Traits</Label>
          <div style={{ display: 'grid', gap: 7, marginBottom: 16 }}>
            {item.traits.map(t => (
              <div key={t.name} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
          <Label>Best Class Pairings</Label>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {item.bestClasses.map(c => (
              <span key={c} style={{ padding: '4px 12px', borderRadius: 4, background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontSize: 12, fontFamily: 'var(--font-heading)' }}>{c}</span>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8, marginBottom: 16 }}>
            {[['Hit Die', item.hitDie], ['Primary Stat', item.primaryAbility.join(', ')], ['Saving Throws', item.savingThrows.join(', ')], ['Difficulty', item.difficulty], ['Role', item.role]].map(([label, value]) => (
              <div key={label} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '9px 12px' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
              </div>
            ))}
          </div>
          <Label>Proficiencies</Label>
          <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '11px 14px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
            <div><strong style={{ color: 'var(--text)' }}>Armor: </strong>{item.armorProf}</div>
            <div><strong style={{ color: 'var(--text)' }}>Weapons: </strong>{item.weaponProf}</div>
          </div>
          <Label>Key Features (Levels 1-5)</Label>
          <div style={{ display: 'grid', gap: 7 }}>
            {item.keyFeatures.map(f => (
              <div key={f.name} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '11px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 30, height: 30, borderRadius: 4, background: item.color + '1a', border: `1px solid ${item.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'monospace', flexShrink: 0
                }}>{f.level}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: 3 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
