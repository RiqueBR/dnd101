import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CharacterWizardSection } from './CharacterWizardSection.jsx';
import { DND_DATA } from '../../data/dndData.js';

describe('CharacterWizardSection', () => {
  const race = DND_DATA.races[0];
  const otherRace = DND_DATA.races[1];
  const cls = DND_DATA.classes[0];

  const pairedRaceId = Object.keys(DND_DATA.pairings)[0];
  const pairedClassId = Object.keys(DND_DATA.pairings[pairedRaceId])[0];
  const pairedRace = DND_DATA.races.find((r) => r.id === pairedRaceId);
  const pairedClass = DND_DATA.classes.find((c) => c.id === pairedClassId);
  const pairedResult = DND_DATA.pairings[pairedRaceId][pairedClassId];

  const selectButton = (name) => screen.getByRole('button', { name: new RegExp(`Select ${name}`) });

  it('starts on the Race step with the Class and Review steps not yet reachable', () => {
    render(<CharacterWizardSection />);

    for (const r of DND_DATA.races) {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Class step' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Review step' })).toBeDisabled();
  });

  it('opens a race card detail for preview without confirming the pick', () => {
    render(<CharacterWizardSection />);

    fireEvent.click(screen.getByText(race.name));
    expect(screen.getByText(race.description)).toBeInTheDocument();
    expect(selectButton(race.name)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Class step' })).toBeDisabled();
  });

  it('confirms the race and advances to the Class step when Select is clicked', () => {
    render(<CharacterWizardSection />);

    fireEvent.click(screen.getByText(race.name));
    fireEvent.click(selectButton(race.name));

    expect(screen.getByText(cls.name)).toBeInTheDocument();
    expect(screen.queryByText(otherRace.name)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Class step' })).not.toBeDisabled();
  });

  it('shows the synergy result on the Review step once a race and class are both picked', () => {
    render(<CharacterWizardSection />);

    fireEvent.click(screen.getByText(pairedRace.name));
    fireEvent.click(selectButton(pairedRace.name));
    fireEvent.click(screen.getByText(pairedClass.name));
    fireEvent.click(selectButton(pairedClass.name));

    expect(screen.getByText(pairedResult.summary)).toBeInTheDocument();
  });

  it('keeps later picks when navigating back to an earlier step', () => {
    render(<CharacterWizardSection />);

    fireEvent.click(screen.getByText(pairedRace.name));
    fireEvent.click(selectButton(pairedRace.name));
    fireEvent.click(screen.getByText(pairedClass.name));
    fireEvent.click(selectButton(pairedClass.name));

    fireEvent.click(screen.getByRole('button', { name: 'Race step' }));
    expect(screen.getByText(pairedRace.name)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review step' })).not.toBeDisabled();
  });

  it('closes the open detail view when Escape is pressed', () => {
    render(<CharacterWizardSection />);

    fireEvent.click(screen.getByText(race.name));
    expect(screen.getByText(race.description)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText(race.description)).not.toBeInTheDocument();
  });
});
