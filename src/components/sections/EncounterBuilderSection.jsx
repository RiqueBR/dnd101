import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ENCOUNTER_DATA } from '../../data/encounterData.js';
import { computeEncounter, crToNumber, DIFFICULTIES, generateEncounter } from '../../utils/encounterMath.js';
import { encounterDifficultyColors } from '../../styles/tokens.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid, Stack } from '../ui/Grid.jsx';
import { CardHeaderRow, Surface } from '../ui/Card.jsx';
import { Label } from '../ui/Badge.jsx';
import { PickerButton, PickerGroup } from '../ui/PickerButton.jsx';

const PARTY_KEY = 'dnd101-encounter-party';
const ENCOUNTER_KEY = 'dnd101-encounter-list';

const loadStored = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const CR_FILTERS = [
  ['Any', () => true],
  ['0-1', (n) => n <= 1],
  ['2-5', (n) => n >= 2 && n <= 5],
  ['6-10', (n) => n >= 6 && n <= 10],
  ['11+', (n) => n >= 11],
];

const formatNumber = (n) => n.toLocaleString('en-US');

/* ---------- layout ---------- */

const Layout = styled.div`
  container-type: inline-size;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;

  @container (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  gap: 12px;

  @container (max-width: 760px) {
    position: static;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 9px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  outline: none;
  margin-bottom: 10px;
`;

const Segmented = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count}, 1fr);
  gap: 3px;
  padding: 3px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 9px;
  margin-bottom: ${(p) => p.$mb || 0};
`;

const SegmentedButton = styled.button`
  min-height: 34px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 11.5px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  background: ${(p) => (p.$active ? 'var(--surface)' : 'transparent')};
  color: ${(p) => (p.$active ? p.$color || 'var(--accent)' : 'var(--text-muted)')};
  box-shadow: ${(p) => (p.$active ? '0 1px 3px rgba(0, 0, 0, 0.2)' : 'none')};
  -webkit-tap-highlight-color: transparent;
`;

const EmptyNote = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.5;
`;

/* ---------- difficulty meter ---------- */

const MeterHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
`;

const MeterLabel = styled.div`
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 800;
  color: ${(p) => p.$color};
`;

const MeterXP = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  text-align: right;

  strong {
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--text);
    font-size: 15px;
  }
`;

const MeterBar = styled.div`
  position: relative;
  height: 10px;
  display: flex;
  border-radius: 5px;
`;

const MeterBand = styled.div`
  width: ${(p) => p.$width}%;
  background: ${(p) => (p.$muted ? 'var(--surface2)' : p.$color)};
  opacity: ${(p) => (p.$active ? 1 : 0.35)};
  border-right: 1px solid var(--bg);

  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
    border-right: none;
  }
`;

const MeterMarker = styled.div`
  position: absolute;
  left: calc(${(p) => p.$pos}% - 2px);
  top: -4px;
  bottom: -4px;
  width: 4px;
  border-radius: 2px;
  background: var(--text);
  box-shadow: 0 0 0 2px var(--surface);
`;

const MeterThresholds = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 12px;
`;

const MeterThresholdLabel = styled.div`
  text-align: center;
  font-size: 10px;
  font-family: var(--font-heading);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => p.$color};
`;

const MeterThresholdValue = styled.div`
  text-align: center;
  font-size: 12.5px;
  color: var(--text);
  font-weight: 600;
`;

const MeterNote = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 10px;
  line-height: 1.5;
`;

const DifficultyMeter = ({ result }) => {
  const max = Math.max(result.thresholds[3] * 1.35, result.adjustedXP * 1.05, 1);
  const pos = Math.min(result.adjustedXP / max, 1) * 100;
  const bands = [
    [0, result.thresholds[0], 'Trivial'],
    [result.thresholds[0], result.thresholds[1], 'Easy'],
    [result.thresholds[1], result.thresholds[2], 'Medium'],
    [result.thresholds[2], result.thresholds[3], 'Hard'],
    [result.thresholds[3], max, 'Deadly'],
  ];
  const color = encounterDifficultyColors[result.difficulty];

  return (
    <div>
      <MeterHead>
        <MeterLabel $color={result.monsterCount ? color : 'var(--text-muted)'}>
          {result.monsterCount ? result.difficulty : 'No monsters yet'}
        </MeterLabel>
        <MeterXP><strong>{formatNumber(result.adjustedXP)}</strong> adj. XP</MeterXP>
      </MeterHead>
      <MeterBar>
        {bands.map(([from, to, label]) => (
          <MeterBand
            key={label}
            $width={((to - from) / max) * 100}
            $color={encounterDifficultyColors[label]}
            $muted={label === 'Trivial'}
            $active={label === result.difficulty && result.monsterCount > 0}
          />
        ))}
        {result.monsterCount > 0 && <MeterMarker $pos={pos} />}
      </MeterBar>
      <MeterThresholds>
        {DIFFICULTIES.map((label, i) => (
          <div key={label}>
            <MeterThresholdLabel $color={encounterDifficultyColors[label]}>{label}</MeterThresholdLabel>
            <MeterThresholdValue>{formatNumber(result.thresholds[i])}</MeterThresholdValue>
          </div>
        ))}
      </MeterThresholds>
      {result.monsterCount > 0 && (
        <MeterNote>
          {formatNumber(result.baseXP)} base XP × {result.multiplier} for {result.monsterCount} monster{result.monsterCount === 1 ? '' : 's'} vs. a party of {result.partySize}.
        </MeterNote>
      )}
    </div>
  );
};

/* ---------- party editor ---------- */

const PartyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
`;

const CountGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CountButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--accent);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
`;

const CountValue = styled.div`
  min-width: 22px;
  text-align: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 14px;
  color: var(--text);
`;

const CountText = styled.span`
  font-size: 12.5px;
  color: var(--text-muted);
`;

const RemoveGroupButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 16px;
  cursor: pointer;
`;

const AddGroupButton = styled.button`
  background: none;
  border: none;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const NumberStepper = ({ value, min, max, onChange }) => (
  <CountGroup>
    <CountButton type="button" aria-label="Decrease" onClick={() => onChange(Math.max(min, value - 1))}>−</CountButton>
    <CountValue>{value}</CountValue>
    <CountButton type="button" aria-label="Increase" onClick={() => onChange(Math.min(max, value + 1))}>+</CountButton>
  </CountGroup>
);

const PartyEditor = ({ party, onChange }) => {
  const updateGroup = (i, key, value) => onChange(party.map((g, j) => (j === i ? { ...g, [key]: value } : g)));
  const addGroup = () => onChange([...party, { count: 1, level: party[party.length - 1]?.level || 1 }]);
  const removeGroup = (i) => onChange(party.filter((_, j) => j !== i));

  return (
    <Surface>
      <CardHeaderRow>
        <Label>Party</Label>
        <AddGroupButton type="button" onClick={addGroup}>+ Add group</AddGroupButton>
      </CardHeaderRow>
      <Stack $gap="10px">
        {party.map((g, i) => (
          <PartyRow key={i}>
            <CountGroup>
              <NumberStepper value={g.count} min={1} max={10} onChange={(v) => updateGroup(i, 'count', v)} />
              <CountText>{g.count === 1 ? 'player' : 'players'}</CountText>
            </CountGroup>
            <CountGroup>
              <CountText>Lv</CountText>
              <NumberStepper value={g.level} min={1} max={20} onChange={(v) => updateGroup(i, 'level', v)} />
              {party.length > 1 && (
                <RemoveGroupButton type="button" aria-label="Remove group" onClick={() => removeGroup(i)}>×</RemoveGroupButton>
              )}
            </CountGroup>
          </PartyRow>
        ))}
      </Stack>
    </Surface>
  );
};

/* ---------- monster browser ---------- */

const MonsterRow = styled(Surface)`
  display: flex;
  align-items: center;
  gap: 12px;
  border-color: ${(p) => (p.$qty ? 'var(--accent-border)' : 'var(--border)')};
`;

const CRBadge = styled.div`
  width: 46px;
  flex-shrink: 0;
  text-align: center;
  padding: 6px 0;
  border-radius: 7px;
  background: var(--surface2);
  border: 1px solid var(--border);
`;

const CRBadgeLabel = styled.div`
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  font-family: var(--font-heading);
`;

const CRBadgeValue = styled.div`
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.1;
`;

const MonsterInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MonsterName = styled.div`
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
`;

const MonsterType = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
`;

const MonsterStatsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--text-muted);
  flex-wrap: wrap;

  strong {
    color: var(--text);
  }
`;

const AddButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid var(--accent-border);
  background: var(--accent-subtle);
  color: var(--accent);
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const AddQtyBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: var(--accent);
  color: var(--bg);
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
`;

const MonsterCard = ({ monster, qty, onAdd }) => (
  <MonsterRow $padding="11px 12px" $qty={qty}>
    <CRBadge>
      <CRBadgeLabel>CR</CRBadgeLabel>
      <CRBadgeValue>{monster.cr}</CRBadgeValue>
    </CRBadge>
    <MonsterInfo>
      <MonsterName>{monster.name}</MonsterName>
      <MonsterType>{monster.size} {monster.type.toLowerCase()}</MonsterType>
      <MonsterStatsRow>
        <span><strong>{monster.hp}</strong> HP</span>
        <span><strong>{monster.ac}</strong> AC</span>
        <span><strong>{formatNumber(ENCOUNTER_DATA.crXP[monster.cr])}</strong> XP</span>
      </MonsterStatsRow>
    </MonsterInfo>
    <AddButton type="button" aria-label={`Add ${monster.name}`} onClick={onAdd}>
      +
      {qty > 0 && <AddQtyBadge>{qty}</AddQtyBadge>}
    </AddButton>
  </MonsterRow>
);

/* ---------- current encounter ---------- */

const EncounterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
`;

const EncounterRowInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const EncounterRowName = styled.div`
  font-family: var(--font-heading);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text);
`;

const EncounterRowMeta = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 12.5px;
  cursor: pointer;
`;

const RollDivider = styled.div`
  border-top: 1px dashed var(--border);
  padding-top: 12px;
  margin-top: 14px;
  display: grid;
  gap: 9px;
`;

const RollLabel = styled.div`
  font-size: 11px;
  font-family: var(--font-heading);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const RollRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TerrainSelect = styled.select`
  flex: 1;
  min-height: 44px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
`;

const RollButton = styled.button`
  min-height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid var(--accent-border);
  background: var(--accent-subtle);
  color: var(--accent);
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

export const EncounterBuilderSection = () => {
  const [party, setParty] = useState(() => loadStored(PARTY_KEY, [{ count: 4, level: 3 }]));
  const [encounter, setEncounter] = useState(() => loadStored(ENCOUNTER_KEY, []));
  const [rollDifficulty, setRollDifficulty] = useState('Medium');
  const [rollEnv, setRollEnv] = useState('Any');
  const [search, setSearch] = useState('');
  const [terrainFilter, setTerrainFilter] = useState('All');
  const [crFilter, setCrFilter] = useState('Any');

  useEffect(() => { localStorage.setItem(PARTY_KEY, JSON.stringify(party)); }, [party]);
  useEffect(() => { localStorage.setItem(ENCOUNTER_KEY, JSON.stringify(encounter)); }, [encounter]);

  const result = useMemo(() => computeEncounter(party, encounter), [party, encounter]);

  const addMonster = (id) => setEncounter((prev) => (
    prev.some((e) => e.id === id)
      ? prev.map((e) => (e.id === id ? { ...e, qty: e.qty + 1 } : e))
      : [...prev, { id, qty: 1 }]
  ));
  const setQty = (id, qty) => setEncounter((prev) => (
    qty <= 0 ? prev.filter((e) => e.id !== id) : prev.map((e) => (e.id === id ? { ...e, qty } : e))
  ));
  const rollRandomEncounter = () => setEncounter(generateEncounter(party, rollDifficulty, rollEnv));

  const filteredMonsters = useMemo(() => {
    const crCheck = CR_FILTERS.find(([label]) => label === crFilter)[1];
    const query = search.trim().toLowerCase();
    return ENCOUNTER_DATA.monsters.filter((m) => (
      (terrainFilter === 'All' || m.env.includes(terrainFilter))
      && crCheck(crToNumber(m.cr))
      && (!query || m.name.toLowerCase().includes(query) || m.type.toLowerCase().includes(query))
    ));
  }, [search, terrainFilter, crFilter]);

  return (
    <div>
      <SectionHeader
        title="Encounter Builder"
        subtitle="Set your party, add monsters or roll a random fight, and see how dangerous it is using the Dungeon Master's Guide XP budget."
      />
      <Layout>
        <div>
          <Label>Monsters</Label>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or type"
            aria-label="Search monsters by name or type"
          />
          <PickerGroup>
            {['All', ...ENCOUNTER_DATA.envs].map((env) => (
              <PickerButton key={env} type="button" $active={terrainFilter === env} onClick={() => setTerrainFilter(env)}>
                {env}
              </PickerButton>
            ))}
          </PickerGroup>
          <Segmented $count={CR_FILTERS.length} $mb="14px">
            {CR_FILTERS.map(([label]) => (
              <SegmentedButton key={label} type="button" $active={crFilter === label} onClick={() => setCrFilter(label)}>
                {label}
              </SegmentedButton>
            ))}
          </Segmented>
          <Grid $min="260px" $gap="8px">
            {filteredMonsters.map((m) => (
              <MonsterCard
                key={m.id}
                monster={m}
                qty={(encounter.find((e) => e.id === m.id) || {}).qty || 0}
                onAdd={() => addMonster(m.id)}
              />
            ))}
          </Grid>
          {filteredMonsters.length === 0 && <EmptyNote>No monsters match these filters.</EmptyNote>}
        </div>
        <Sidebar>
          <Surface><DifficultyMeter result={result} /></Surface>
          <PartyEditor party={party} onChange={setParty} />
          <Surface>
            <CardHeaderRow>
              <Label>Encounter</Label>
              {encounter.length > 0 && <ClearButton type="button" onClick={() => setEncounter([])}>Clear</ClearButton>}
            </CardHeaderRow>
            {encounter.length === 0 ? (
              <EmptyNote>Add monsters from the list, or roll a random encounter below.</EmptyNote>
            ) : (
              <Stack $gap="8px">
                {encounter.map((e) => {
                  const m = ENCOUNTER_DATA.monsters.find((x) => x.id === e.id);
                  if (!m) return null;
                  return (
                    <EncounterRow key={e.id}>
                      <EncounterRowInfo>
                        <EncounterRowName>{m.name}</EncounterRowName>
                        <EncounterRowMeta>CR {m.cr} · {formatNumber(ENCOUNTER_DATA.crXP[m.cr] * e.qty)} XP</EncounterRowMeta>
                      </EncounterRowInfo>
                      <NumberStepper value={e.qty} min={0} max={30} onChange={(q) => setQty(e.id, q)} />
                    </EncounterRow>
                  );
                })}
              </Stack>
            )}
            <RollDivider>
              <RollLabel>Random encounter</RollLabel>
              <Segmented $count={DIFFICULTIES.length}>
                {DIFFICULTIES.map((d) => (
                  <SegmentedButton
                    key={d}
                    type="button"
                    $active={rollDifficulty === d}
                    $color={encounterDifficultyColors[d]}
                    onClick={() => setRollDifficulty(d)}
                  >
                    {d}
                  </SegmentedButton>
                ))}
              </Segmented>
              <RollRow>
                <TerrainSelect value={rollEnv} onChange={(e) => setRollEnv(e.target.value)} aria-label="Terrain for random encounter">
                  <option value="Any">Any terrain</option>
                  {ENCOUNTER_DATA.envs.map((env) => <option key={env} value={env}>{env}</option>)}
                </TerrainSelect>
                <RollButton type="button" onClick={rollRandomEncounter}>⚄ Roll</RollButton>
              </RollRow>
            </RollDivider>
          </Surface>
        </Sidebar>
      </Layout>
    </div>
  );
};
