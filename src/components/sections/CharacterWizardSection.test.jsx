import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterWizardSection } from './CharacterWizardSection.jsx';
import { DND_DATA } from '../../data/dndData.js';

describe('CharacterWizardSection', () => {
  it('starts on the Race step with the Class and Review steps not yet reachable', () => {
    render(<CharacterWizardSection />);

    for (const r of DND_DATA.races) {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Class step' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Review step' })).toBeDisabled();
  });
});
