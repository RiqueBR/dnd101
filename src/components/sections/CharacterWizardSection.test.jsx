import { afterEach, describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CharacterWizardSection } from './CharacterWizardSection.jsx';
import { DND_DATA } from '../../data/dndData.js';

// jsdom has no ResizeObserver; installs a controllable stand-in so tests can
// simulate the wizard's detail view container growing/shrinking past the
// `@container (max-width: 640px)` breakpoint that flips it between an inline
// side panel and a full-screen modal.
function installResizeObserverMock() {
  const observers = [];
  class MockResizeObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = MockResizeObserver;
  return {
    triggerWidth: (width) => {
      act(() => {
        observers.forEach((o) => o.callback([{ contentRect: { width } }]));
      });
    },
  };
}

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

  it('moves focus into the detail view on open and returns it to the triggering card on close', () => {
    const { container } = render(<CharacterWizardSection />);

    const raceButton = screen.getByText(race.name).closest('button');
    raceButton.focus();
    fireEvent.click(raceButton);

    const detailBox = container.querySelector('[tabindex="-1"]');
    expect(detailBox).toHaveTextContent(race.description);
    expect(detailBox).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(raceButton).toHaveFocus();
  });

  describe('detail view container-width behavior', () => {
    afterEach(() => {
      delete window.ResizeObserver;
    });

    it('treats the detail view as a non-modal side panel when its container is wide, leaving the rest of the app interactive', () => {
      const ro = installResizeObserverMock();
      render(
        <div>
          <div id="app-sidebar">sidebar</div>
          <CharacterWizardSection />
        </div>,
      );

      fireEvent.click(screen.getByText(race.name));
      ro.triggerWidth(900);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(document.getElementById('app-sidebar').inert).toBeFalsy();
    });

    it('treats the detail view as a modal dialog when its container is narrow, making the rest of the app inert', () => {
      const ro = installResizeObserverMock();
      render(
        <div>
          <div id="app-sidebar">sidebar</div>
          <CharacterWizardSection />
        </div>,
      );

      fireEvent.click(screen.getByText(race.name));
      ro.triggerWidth(400);

      const dialog = screen.getByRole('dialog', { name: `${race.name} details` });
      expect(dialog).toHaveTextContent(race.description);
      expect(document.getElementById('app-sidebar').inert).toBe(true);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(document.getElementById('app-sidebar').inert).toBe(false);
    });
  });
});
