import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DifficultyBadge, Label, RaceCard, StatBadge } from './Cards.jsx';
import { DND_DATA } from '../../data/dndData.js';

describe('Label', () => {
  it('renders its children', () => {
    render(<Label>Ability Scores</Label>);
    expect(screen.getByText('Ability Scores')).toBeInTheDocument();
  });
});

describe('StatBadge', () => {
  it('renders the stat name and a signed value', () => {
    render(<StatBadge stat="STR" value={2} />);
    expect(screen.getByText('STR')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});

describe('DifficultyBadge', () => {
  it('renders the difficulty label text', () => {
    render(<DifficultyBadge level="Advanced" />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });
});

describe('RaceCard', () => {
  const human = DND_DATA.races.find((r) => r.id === 'human');

  it('renders the race name, tagline, and stat bonuses', () => {
    render(<RaceCard race={human} onClick={() => {}} isSelected={false} />);
    expect(screen.getByText(human.name)).toBeInTheDocument();
    expect(screen.getByText(human.tagline)).toBeInTheDocument();
    for (const stat of Object.keys(human.statBonuses)) {
      expect(screen.getByText(stat)).toBeInTheDocument();
    }
  });

  it('calls onClick with the race when clicked', () => {
    const onClick = vi.fn();
    render(<RaceCard race={human} onClick={onClick} isSelected={false} />);
    fireEvent.click(screen.getByText(human.name));
    expect(onClick).toHaveBeenCalledWith(human);
  });
});
