import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DifficultyBadge, Label, StatBadge } from './Badge.jsx';

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
