import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { DND_DATA } from '../../data/dndData.js';

/* ── shared bits (M- prefixed to avoid collisions) ── */
const MStat = ({ stat, value }) => (
  <span style={{display:'inline-flex',gap:4,alignItems:'baseline',padding:'3px 9px',borderRadius:5,fontSize:12,fontWeight:700,background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--accent)',fontFamily:'monospace'}}>
    <span style={{color:'var(--text-muted)',fontSize:10}}>{stat}</span>+{value}
  </span>
);
const MLabel = ({ children }) => (
  <div style={{fontFamily:'var(--font-heading)',color:'var(--accent)',fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',margin:'18px 0 9px'}}>{children}</div>
);
const MChip = ({ children, color, solid }) => (
  <span style={{padding:'3px 9px',borderRadius:5,fontSize:11,fontWeight:700,background:solid?color+'22':'var(--surface2)',color:solid?color:'var(--text-muted)',border:`1px solid ${solid?color+'44':'var(--border)'}`,whiteSpace:'nowrap'}}>{children}</span>
);
const MDie = ({ sides, label }) => {
  const shapes={4:'polygon(50% 0%,100% 100%,0% 100%)',6:'inset(0)',8:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',10:'polygon(50% 0%,100% 35%,80% 100%,20% 100%,0% 35%)',12:'polygon(50% 0%,95% 25%,95% 75%,50% 100%,5% 75%,5% 25%)',20:'polygon(50% 0%,100% 30%,100% 70%,50% 100%,0% 70%,0% 30%)'};
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,width:66}}>
      <div style={{width:52,height:52,background:'linear-gradient(135deg,var(--dice-fill-top),var(--dice-fill-bot))',border:'2px solid var(--dice-color)',clipPath:shapes[sides],display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-heading)',fontWeight:800,fontSize:14,color:'var(--dice-color)'}}>d{sides}</div>
      {label && <div style={{fontSize:10,color:'var(--text-muted)',textAlign:'center',lineHeight:1.3}}>{label}</div>}
    </div>
  );
};

/* row used by race + class lists */
const MRow = ({ color, badge, title, sub, chips, onClick }) => (
  <button onClick={onClick} style={{display:'flex',alignItems:'center',gap:13,width:'100%',minHeight:72,padding:'13px 14px',background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${color}`,borderRadius:10,cursor:'pointer',textAlign:'left',WebkitTapHighlightColor:'transparent'}}>
    <div style={{width:44,height:44,borderRadius:9,background:color+'1f',border:`1px solid ${color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-heading)',fontWeight:800,fontSize:15,color,flexShrink:0}}>{badge}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontFamily:'var(--font-heading)',fontSize:16,fontWeight:700,color:'var(--text)'}}>{title}</div>
      <div style={{fontSize:12,color:'var(--text-muted)',fontStyle:'italic',marginTop:1}}>{sub}</div>
      <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:7}}>{chips}</div>
    </div>
    <span style={{color:'var(--text-muted)',fontSize:20,flexShrink:0}}>›</span>
  </button>
);

/* full-screen detail sheet */
const MDetail = ({ title, sub, color, onBack, children }) => createPortal(
  <div className="m-sheet">
    <div className="m-sheet-head">
      <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:5,minHeight:44,padding:'0 12px 0 4px',background:'none',border:'none',color:'var(--accent)',fontSize:15,fontFamily:'var(--font-heading)',cursor:'pointer'}}>‹ Back</button>
    </div>
    <div className="m-sheet-body">
      <div style={{borderBottom:`2px solid ${color}`,paddingBottom:12,marginBottom:4}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:26,fontWeight:800,color:'var(--text)',margin:0,letterSpacing:'0.02em'}}>{title}</h1>
        <div style={{fontSize:13,color:'var(--text-muted)',fontStyle:'italic',marginTop:3}}>{sub}</div>
      </div>
      {children}
    </div>
  </div>,
  document.body
);

const MCard = ({ children, color }) => (
  <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:color?`3px solid ${color}`:'1px solid var(--border)',borderRadius:9,padding:'12px 14px'}}>{children}</div>
);

/* ── Races ── */
export const MRaces = () => {
  const { races } = DND_DATA;
  const [sel, setSel] = useState(null);
  if (sel) return (
    <MDetail title={sel.name} sub={sel.tagline} color={sel.color} onBack={()=>setSel(null)}>
      <p style={{fontSize:15,lineHeight:1.65,color:'var(--text)',margin:'14px 0 0'}}>{sel.description}</p>
      <MLabel>Ability Bonuses</MLabel>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{Object.entries(sel.statBonuses).map(([s,v])=><MStat key={s} stat={s} value={v}/>)}</div>
      {sel.extraBonuses && <div style={{fontSize:12,color:'var(--text-muted)',fontStyle:'italic',marginTop:7}}>{sel.extraBonuses}</div>}
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <MCard><div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.07em'}}>Size</div><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{sel.size}</div></MCard>
        <MCard><div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.07em'}}>Speed</div><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{sel.speed} ft</div></MCard>
      </div>
      {sel.subRaces && <>
        <MLabel>Subraces</MLabel>
        <div style={{display:'grid',gap:8}}>{sel.subRaces.map(sr=>(
          <MCard key={sr.name} color={sel.color}>
            <div style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,color:'var(--text)',marginBottom:6}}>{sr.name}</div>
            <div style={{display:'flex',gap:5,marginBottom:6}}>{Object.entries(sr.bonuses).map(([s,v])=><MStat key={s} stat={s} value={v}/>)}</div>
            <div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.5}}>{sr.extra}</div>
          </MCard>))}</div>
      </>}
      <MLabel>Racial Traits</MLabel>
      <div style={{display:'grid',gap:8}}>{sel.traits.map(t=>(
        <MCard key={t.name}>
          <div style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,color:'var(--text)',marginBottom:3}}>{t.name}</div>
          <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.55}}>{t.desc}</div>
        </MCard>))}</div>
      <MLabel>Pairs Well With</MLabel>
      <div style={{display:'flex',gap:7,flexWrap:'wrap',paddingBottom:8}}>{sel.bestClasses.map(c=>(
        <span key={c} style={{padding:'7px 14px',borderRadius:7,background:'var(--accent-subtle)',border:'1px solid var(--accent-border)',color:'var(--accent)',fontSize:13,fontFamily:'var(--font-heading)'}}>{c}</span>))}</div>
    </MDetail>
  );
  return (
    <div style={{display:'grid',gap:9}}>
      {races.map(r=>(
        <MRow key={r.id} color={r.color} badge={r.icon} title={r.name} sub={r.tagline} onClick={()=>setSel(r)}
          chips={Object.entries(r.statBonuses).slice(0,3).map(([s,v])=><MStat key={s} stat={s} value={v}/>)} />
      ))}
    </div>
  );
};

/* ── Classes ── */
export const MClasses = () => {
  const { classes } = DND_DATA;
  const [sel, setSel] = useState(null);
  const diffColor = d => ({Beginner:'#4a7a2a',Intermediate:'#8b7a1a',Advanced:'#8b3a3a'}[d]);
  if (sel) return (
    <MDetail title={sel.name} sub={sel.tagline} color={sel.color} onBack={()=>setSel(null)}>
      <p style={{fontSize:15,lineHeight:1.65,color:'var(--text)',margin:'14px 0 0'}}>{sel.description}</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:14}}>
        {[['Hit Die',sel.hitDie],['Primary',sel.primaryAbility.join(', ')],['Saves',sel.savingThrows.join(', ')],['Difficulty',sel.difficulty]].map(([l,v])=>(
          <MCard key={l}><div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{v}</div></MCard>))}
      </div>
      <MLabel>Party Role</MLabel>
      <MCard color={sel.color}><div style={{fontSize:14,color:'var(--text)'}}>{sel.role}</div></MCard>
      <MLabel>Proficiencies</MLabel>
      <MCard>
        <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}><strong style={{color:'var(--text)'}}>Armor: </strong>{sel.armorProf}</div>
        <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6,marginTop:4}}><strong style={{color:'var(--text)'}}>Weapons: </strong>{sel.weaponProf}</div>
      </MCard>
      <MLabel>Key Features: Levels 1-5</MLabel>
      <div style={{display:'grid',gap:8,paddingBottom:8}}>{sel.keyFeatures.map(f=>(
        <MCard key={f.name}>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:5}}>
            <span style={{minWidth:30,height:30,borderRadius:6,background:sel.color+'1f',border:`1px solid ${sel.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:sel.color,fontFamily:'monospace'}}>{f.level}</span>
            <span style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,color:'var(--text)'}}>{f.name}</span>
          </div>
          <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.55}}>{f.desc}</div>
        </MCard>))}</div>
    </MDetail>
  );
  return (
    <div style={{display:'grid',gap:9}}>
      {classes.map(c=>(
        <MRow key={c.id} color={c.color} badge={c.icon} title={c.name} sub={c.tagline} onClick={()=>setSel(c)}
          chips={<><MChip color={c.color} solid>HD {c.hitDie}</MChip>{c.primaryAbility.map(a=><MChip key={a} color={c.color} solid>{a}</MChip>)}<MChip color={diffColor(c.difficulty)} solid>{c.difficulty}</MChip></>} />
      ))}
    </div>
  );
};

/* ── Pairing ── */
export const MPair = () => {
  const { races, classes, pairings } = DND_DATA;
  const [r, setR] = useState(null), [c, setC] = useState(null);
  const res = r && c ? (pairings[r]||{})[c] : null;
  const ro = races.find(x=>x.id===r), co = classes.find(x=>x.id===c);
  const LABELS=['','Poor fit','Below average','Decent match','Strong synergy','Excellent match'];
  const COLORS=['','#8b3a3a','#8b6a1a','#6b7a3a','#3a7a6b','#4a6fa5'];
  const sc = res?COLORS[res.synergy]:'';
  const picker = (items, val, set) => (
    <div className="m-hscroll">
      {items.map(i=>(
        <button key={i.id} onClick={()=>set(i.id)} style={{minHeight:44,padding:'9px 15px',borderRadius:8,flexShrink:0,background:val===i.id?i.color+'28':'var(--surface)',border:`1.5px solid ${val===i.id?i.color:'var(--border)'}`,color:val===i.id?i.color:'var(--text-muted)',fontFamily:'var(--font-heading)',fontSize:14,fontWeight:val===i.id?700:400,cursor:'pointer',WebkitTapHighlightColor:'transparent'}}>{i.name}</button>
      ))}
    </div>
  );
  return (
    <div>
      <MLabel>1. Pick a Race</MLabel>
      {picker(races, r, setR)}
      <MLabel>2. Pick a Class</MLabel>
      {picker(classes, c, setC)}
      <div style={{marginTop:22}}>
      {res && ro && co ? (
        <div style={{background:'var(--surface)',border:`1px solid ${sc}66`,borderTop:`3px solid ${sc}`,borderRadius:10,padding:'18px 16px'}}>
          <div style={{fontFamily:'var(--font-heading)',fontSize:19,fontWeight:700,marginBottom:11,lineHeight:1.3}}>
            <span style={{color:ro.color}}>{ro.name}</span>
            <span style={{color:'var(--text-muted)',margin:'0 7px'}}>+</span>
            <span style={{color:co.color}}>{co.name}</span>
          </div>
          <div style={{display:'flex',gap:4,alignItems:'center',marginBottom:6}}>
            {[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:7,borderRadius:4,background:i<=res.synergy?sc:'var(--surface2)',border:`1px solid ${i<=res.synergy?sc:'var(--border)'}`}}/>)}
          </div>
          <div style={{fontSize:13,fontWeight:700,color:sc,fontFamily:'var(--font-heading)',marginBottom:13}}>{LABELS[res.synergy]}</div>
          <p style={{fontSize:14.5,color:'var(--text)',lineHeight:1.65,margin:'0 0 4px'}}>{res.summary}</p>
          <MLabel>Highlights</MLabel>
          <div style={{display:'grid',gap:8}}>{res.highlights.map((h,i)=>(
            <div key={i} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
              <span style={{color:sc,fontSize:11,marginTop:4}}>▸</span>
              <span style={{fontSize:13.5,color:'var(--text-muted)',lineHeight:1.55}}>{h}</span>
            </div>))}</div>
          <MLabel>{ro.name} Bonuses</MLabel>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{Object.entries(ro.statBonuses).map(([s,v])=><MStat key={s} stat={s} value={v}/>)}</div>
        </div>
      ) : (
        <div style={{background:'var(--surface)',border:'1px dashed var(--border)',borderRadius:10,padding:'40px 20px',textAlign:'center',color:'var(--text-muted)',fontStyle:'italic',fontSize:14}}>
          {!r&&!c?'Pick a race and a class to see how well they work together':!r?'Now pick a race':'Now pick a class'}
        </div>
      )}
      </div>
    </div>
  );
};

/* ── Spells ── */
const M_SCHOOL={Evocation:'#c8743a',Abjuration:'#4a6fa5',Conjuration:'#4a7a2a',Illusion:'#6b3a8b',Enchantment:'#8b3a6b',Necromancy:'#3a6b5a',Divination:'#8b7a1a',Transmutation:'#5a7a8b'};
const M_LVL=['Cantrip','1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];
const M_ROLL={attack:'Attack Roll',save:'Save vs DC',heal:'Healing',auto:'Auto-Hit',conditional:'Conditional',buff:'Buff',utility:'Utility'};

export const MSpells = () => {
  const { spells } = DND_DATA;
  const [f, setF] = useState('All');
  const [open, setOpen] = useState(null);
  const list = useMemo(()=>f==='All'?spells:spells.filter(s=>s.school===f),[f, spells]);
  return (
    <div>
      <MCard><div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.6}}>
        <strong style={{color:'var(--text)',fontFamily:'var(--font-heading)'}}>Save DC</strong> = 8 + proficiency + spell mod. <strong style={{color:'var(--text)',fontFamily:'var(--font-heading)'}}>Attack</strong> = 1d20 + proficiency + spell mod.
      </div></MCard>
      <div className="m-hscroll" style={{marginTop:14}}>
        {['All',...Object.keys(M_SCHOOL)].map(s=>{
          const a=f===s, col=M_SCHOOL[s]||'var(--accent)';
          return <button key={s} onClick={()=>setF(s)} style={{minHeight:40,padding:'8px 14px',borderRadius:7,flexShrink:0,background:a?(M_SCHOOL[s]?col+'22':'var(--accent-subtle)'):'var(--surface)',border:`1px solid ${a?col:'var(--border)'}`,color:a?col:'var(--text-muted)',fontFamily:'var(--font-heading)',fontSize:13,cursor:'pointer',WebkitTapHighlightColor:'transparent'}}>{s}</button>;
        })}
      </div>
      <div style={{display:'grid',gap:9,marginTop:14}}>
        {list.map(sp=>{
          const col=M_SCHOOL[sp.school], o=open===sp.name;
          return (
            <div key={sp.name} onClick={()=>setOpen(o?null:sp.name)} style={{background:'var(--surface)',border:`1px solid ${o?col:'var(--border)'}`,borderLeft:`3px solid ${col}`,borderRadius:10,padding:'13px 14px',cursor:'pointer',WebkitTapHighlightColor:'transparent'}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start'}}>
                <div style={{fontFamily:'var(--font-heading)',fontSize:16,fontWeight:700,color:'var(--text)'}}>{sp.name}</div>
                <MChip color={col} solid>{M_LVL[sp.level]}</MChip>
              </div>
              <div style={{fontSize:11.5,color:'var(--text-muted)',marginTop:5}}>{sp.school} · {sp.castingTime} · {sp.range}</div>
              {sp.roll && <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:8}}>
                <MChip color={col} solid>{M_ROLL[sp.roll.type]}</MChip>
                {sp.roll.save && <MChip>{sp.roll.save} save</MChip>}
                {sp.roll.attack && <MChip>{sp.roll.attack}</MChip>}
                {sp.roll.damage && <MChip>{sp.roll.damage}</MChip>}
                {sp.roll.healing && <MChip>{sp.roll.healing}</MChip>}
              </div>}
              {o ? (
                <div style={{borderTop:'1px solid var(--border)',marginTop:11,paddingTop:10}}>
                  <div style={{fontSize:13.5,color:'var(--text)',lineHeight:1.65}}>{sp.desc}</div>
                  {sp.diceNote && <div style={{background:col+'14',border:`1px solid ${col}33`,borderRadius:7,padding:'10px 12px',marginTop:10}}>
                    <div style={{fontSize:9.5,fontWeight:700,color:col,letterSpacing:'.11em',textTransform:'uppercase',fontFamily:'var(--font-heading)',marginBottom:5}}>How to Roll</div>
                    <div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.55}}>{sp.diceNote}</div>
                  </div>}
                  {sp.roll?.upcast && <div style={{fontSize:12.5,color:'var(--accent)',marginTop:9}}><strong>Upcast: </strong><em>{sp.roll.upcast}</em></div>}
                  <div style={{fontSize:11.5,color:'var(--text-muted)',fontStyle:'italic',marginTop:9}}>{sp.classes.join(', ')}</div>
                </div>
              ) : <div style={{fontSize:11,color:col,marginTop:7,opacity:.8}}>Tap for details ▾</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Rules tab: Abilities / Actions / Round ── */
const MAbilities = () => {
  const { abilityScores } = DND_DATA;
  const [open,setOpen]=useState(null);
  return (
    <div>
      <MCard><div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.6}}>
        <strong style={{color:'var(--text)',fontFamily:'var(--font-heading)'}}>Modifier</strong> = (score − 10) ÷ 2, rounded down. Score 10 → +0. Score 16 → +3.
      </div></MCard>
      <div style={{display:'grid',gap:9,marginTop:14}}>
        {abilityScores.map(s=>{
          const o=open===s.id;
          return (
            <div key={s.id} onClick={()=>setOpen(o?null:s.id)} style={{background:'var(--surface)',border:`1px solid ${o?s.color:'var(--border)'}`,borderLeft:`3px solid ${s.color}`,borderRadius:10,padding:'13px 14px',cursor:'pointer',WebkitTapHighlightColor:'transparent'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:46,height:46,borderRadius:9,background:s.color+'1f',border:`1px solid ${s.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-heading)',fontWeight:900,fontSize:15,color:s.color,flexShrink:0}}>{s.abbr}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'var(--font-heading)',fontSize:16,fontWeight:700,color:'var(--text)'}}>{s.name}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>{o?'Tap to collapse':'Tap for details'}</div>
                </div>
                <span style={{color:'var(--text-muted)',fontSize:15}}>{o?'▴':'▾'}</span>
              </div>
              {o && <div style={{marginTop:12,borderTop:'1px solid var(--border)',paddingTop:11}}>
                <p style={{fontSize:13.5,color:'var(--text)',lineHeight:1.6,margin:0}}>{s.description}</p>
                <MLabel>What It Affects</MLabel>
                <div style={{display:'grid',gap:6}}>{s.uses.map((u,i)=>(
                  <div key={i} style={{display:'flex',gap:8}}><span style={{color:s.color,fontSize:10,marginTop:4}}>▸</span><span style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.5}}>{u}</span></div>))}</div>
                {s.skills.length>0 && <><MLabel>Skills</MLabel>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{s.skills.map(k=><MChip key={k} color={s.color} solid>{k}</MChip>)}</div></>}
                <MLabel>Saving Throw</MLabel>
                <div style={{fontSize:13,color:'var(--text-muted)',fontStyle:'italic',lineHeight:1.55}}>{s.savingThrow}</div>
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const M_TYPE={'Action':'#c8743a','Bonus Action':'#4a6fa5','Reaction':'#8b3a3a','Free':'#4a7a2a'};
const MActions = () => {
  const { actions } = DND_DATA;
  return (
    <div>
      <div style={{display:'grid',gap:8}}>
        {[['Action','Your one main activity each turn.','#c8743a'],['Bonus Action','A secondary act, only if a feature grants one.','#4a6fa5'],['Reaction','One per round. Can trigger even off-turn.','#8b3a3a']].map(([n,d,c])=>(
          <div key={n} style={{background:'var(--surface)',border:`1px solid ${c}44`,borderLeft:`3px solid ${c}`,borderRadius:9,padding:'11px 13px'}}>
            <div style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,color:c}}>{n}</div>
            <div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.5,marginTop:3}}>{d}</div>
          </div>))}
      </div>
      {actions.map(cat=>(
        <div key={cat.category}>
          <MLabel>{cat.category}</MLabel>
          <div style={{display:'grid',gap:9}}>
            {cat.items.map(a=>{
              const col=M_TYPE[a.type]||Object.entries(M_TYPE).find(([k])=>a.type.startsWith(k.split(' ')[0]))?.[1]||'#888';
              return (
                <div key={a.name} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${col}`,borderRadius:9,padding:'12px 14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start',marginBottom:6}}>
                    <div style={{fontFamily:'var(--font-heading)',fontSize:15,fontWeight:700,color:'var(--text)'}}>{a.name}</div>
                    <MChip color={col} solid>{a.type}</MChip>
                  </div>
                  <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.55}}>{a.desc}</div>
                  {a.dice && <div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:7,padding:'9px 11px',marginTop:9}}>
                    <div style={{display:'flex',gap:5,flexWrap:'wrap',alignItems:'center'}}>
                      <span style={{fontSize:9.5,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.09em'}}>Rolls</span>
                      {a.dice.map((d,i)=><span key={i} style={{padding:'3px 8px',borderRadius:5,fontSize:11.5,fontWeight:700,background:col+'22',color:col,border:`1px solid ${col}44`,fontFamily:'monospace'}}>{d}</span>)}
                    </div>
                    {a.diceNote && <div style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.5,marginTop:7}}>{a.diceNote}</div>}
                  </div>}
                  <div style={{fontSize:12,color:'var(--accent)',fontStyle:'italic',marginTop:8}}>e.g. {a.example}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const MRound = () => {
  const { rounds } = DND_DATA;
  return (
    <div>
      <MCard><p style={{fontSize:14,color:'var(--text)',lineHeight:1.65,margin:0}}>{rounds.overview}</p></MCard>
      <MLabel>Step 0: Initiative</MLabel>
      <div style={{background:'var(--surface)',border:'1px solid var(--accent-border)',borderLeft:'3px solid var(--accent)',borderRadius:10,padding:'15px 14px',display:'flex',gap:15,alignItems:'flex-start'}}>
        <MDie sides={20} />
        <div style={{flex:1}}>
          <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}>{rounds.initiative.desc}</div>
          <div style={{display:'inline-block',padding:'5px 11px',background:'var(--accent-subtle)',border:'1px solid var(--accent-border)',borderRadius:6,color:'var(--accent)',fontFamily:'monospace',fontSize:12.5,fontWeight:700,marginTop:9}}>{rounds.initiative.dice}</div>
        </div>
      </div>
      <MLabel>On Your Turn</MLabel>
      <div>
        {rounds.turnFlow.map((s,i)=>(
          <div key={s.step} style={{display:'flex',gap:13}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
              <div style={{width:34,height:34,borderRadius:'50%',background:'var(--accent-subtle)',border:'2px solid var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-heading)',fontWeight:700,color:'var(--accent)',fontSize:14}}>{s.step}</div>
              {i<rounds.turnFlow.length-1 && <div style={{width:2,flex:1,background:'var(--border)',minHeight:12}}/>}
            </div>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:9,padding:'11px 13px',flex:1,marginBottom:9}}>
              <div style={{fontFamily:'var(--font-heading)',fontSize:14.5,fontWeight:700,color:'var(--text)',marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <MLabel>Reactions</MLabel>
      <div style={{background:'var(--surface)',border:'1px solid #8b3a3a44',borderLeft:'3px solid #8b3a3a',borderRadius:9,padding:'12px 14px',fontSize:13,color:'var(--text-muted)',lineHeight:1.65}}>{rounds.reactionsNote}</div>
      <MLabel>Movement</MLabel>
      <div style={{display:'grid',gap:8}}>{rounds.movementRules.map(m=>(
        <MCard key={m.name}>
          <div style={{fontFamily:'var(--font-heading)',fontSize:13.5,fontWeight:700,color:'var(--accent)',marginBottom:3}}>{m.name}</div>
          <div style={{fontSize:12.5,color:'var(--text-muted)',lineHeight:1.5}}>{m.desc}</div>
        </MCard>))}</div>
      <MLabel>Common Questions</MLabel>
      <div style={{display:'grid',gap:8}}>{rounds.commonQuestions.map((qa,i)=>(
        <MCard key={i}>
          <div style={{display:'flex',gap:8,marginBottom:6}}>
            <span style={{fontFamily:'var(--font-heading)',fontWeight:700,color:'var(--accent)',fontSize:13}}>Q.</span>
            <span style={{fontSize:13.5,fontWeight:600,color:'var(--text)',lineHeight:1.5}}>{qa.q}</span>
          </div>
          <div style={{display:'flex',gap:8}}>
            <span style={{fontFamily:'var(--font-heading)',fontWeight:700,color:'var(--text-muted)',fontSize:13}}>A.</span>
            <span style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}>{qa.a}</span>
          </div>
        </MCard>))}</div>
      <MLabel>The Dice</MLabel>
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 10px',display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center'}}>
        <MDie sides={4} label="Daggers"/><MDie sides={6} label="Sneak Attack"/><MDie sides={8} label="Longsword"/>
        <MDie sides={10} label="Big spells"/><MDie sides={12} label="Greataxe"/><MDie sides={20} label="Everything"/>
      </div>
    </div>
  );
};

export const MRules = () => {
  const [tab,setTab]=useState('abilities');
  const tabs=[['abilities','Abilities'],['actions','Actions'],['round','The Round']];
  return (
    <div>
      <div style={{display:'flex',gap:4,background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:9,padding:4,marginBottom:16}}>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,minHeight:38,borderRadius:6,border:'none',background:tab===id?'var(--accent-subtle)':'transparent',color:tab===id?'var(--accent)':'var(--text-muted)',fontFamily:'var(--font-heading)',fontSize:13,fontWeight:tab===id?700:400,cursor:'pointer',WebkitTapHighlightColor:'transparent'}}>{label}</button>
        ))}
      </div>
      {tab==='abilities'?<MAbilities/>:tab==='actions'?<MActions/>:<MRound/>}
    </div>
  );
};
