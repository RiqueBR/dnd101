import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { AppShell } from './AppShell.jsx';

function installMatchMediaMock(matches) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: '(max-width: 768px)',
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

describe('AppShell', () => {
  const originalMatchMedia = window.matchMedia;
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    const store = new Map();
    window.localStorage = {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
    };
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage = originalLocalStorage;
  });

  it('renders all 7 sections directly in the nav on wide viewports', () => {
    installMatchMediaMock(false);
    render(<AppShell theme="grimoire" toggleTheme={() => {}} />);

    const nav = screen.getByRole('navigation');
    for (const label of ['Races', 'Classes', 'Race + Class', 'Ability Scores', 'Actions', 'Anatomy of a Round', 'Spells']) {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    }
    expect(within(nav).queryByText('Rules')).not.toBeInTheDocument();
  });

  it('folds Ability Scores/Actions/Anatomy of a Round under a Rules tab on narrow viewports, with a sub-tab bar to switch between them', () => {
    installMatchMediaMock(true);
    render(<AppShell theme="grimoire" toggleTheme={() => {}} />);

    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText('Rules')).toBeInTheDocument();
    expect(within(nav).queryByText('Ability Scores')).not.toBeInTheDocument();

    fireEvent.click(within(nav).getByText('Rules'));
    expect(screen.getByRole('heading', { name: 'Ability Scores' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('heading', { name: 'Actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anatomy of a Round' })).toBeInTheDocument();
  });

  it('persists the active section across remounts', () => {
    installMatchMediaMock(false);
    const { unmount } = render(<AppShell theme="grimoire" toggleTheme={() => {}} />);

    fireEvent.click(within(screen.getByRole('navigation')).getByText('Spells'));
    expect(screen.getByRole('heading', { name: 'Spells' })).toBeInTheDocument();
    unmount();

    render(<AppShell theme="grimoire" toggleTheme={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Spells' })).toBeInTheDocument();
  });
});
