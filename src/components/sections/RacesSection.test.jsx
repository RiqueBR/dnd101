import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RacesSection } from './RacesSection.jsx';
import { DND_DATA } from '../../data/dndData.js';

describe('RacesSection', () => {
  const human = DND_DATA.races.find((r) => r.id === 'human');

  it('renders a card for every race with its name, tagline, and stat bonuses', () => {
    render(<RacesSection />);
    for (const race of DND_DATA.races) {
      expect(screen.getByText(race.name)).toBeInTheDocument();
    }
    expect(screen.getByText(human.tagline)).toBeInTheDocument();
    for (const stat of Object.keys(human.statBonuses)) {
      expect(screen.getAllByText(stat).length).toBeGreaterThan(0);
    }
  });

  it('opens the detail panel for a race when its card is clicked, and closes it again', () => {
    render(<RacesSection />);

    fireEvent.click(screen.getByText(human.name));
    expect(screen.getByText(human.description)).toBeInTheDocument();

    fireEvent.click(screen.getByText('✕ Close'));
    expect(screen.queryByText(human.description)).not.toBeInTheDocument();
  });

  it('replaces the open detail panel when a different race card is clicked', () => {
    render(<RacesSection />);
    const other = DND_DATA.races.find((r) => r.id !== 'human');

    fireEvent.click(screen.getByText(human.name));
    expect(screen.getByText(human.description)).toBeInTheDocument();

    fireEvent.click(screen.getByText(other.name));
    expect(screen.getByText(other.description)).toBeInTheDocument();
    expect(screen.queryByText(human.description)).not.toBeInTheDocument();
  });
});
