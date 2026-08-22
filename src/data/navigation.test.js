import { describe, expect, it } from 'vitest';
import { MOBILE_TABS, DESKTOP_NAV } from './navigation.js';

describe('MOBILE_TABS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(MOBILE_TABS)).toBe(true);
    expect(MOBILE_TABS.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = MOBILE_TABS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every tab has an id, label, icon, heading and subheading', () => {
    for (const tab of MOBILE_TABS) {
      expect(typeof tab.id).toBe('string');
      expect(typeof tab.label).toBe('string');
      expect(typeof tab.icon).toBe('string');
      expect(typeof tab.heading).toBe('string');
      expect(typeof tab.subheading).toBe('string');
    }
  });
});

describe('DESKTOP_NAV', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(DESKTOP_NAV)).toBe(true);
    expect(DESKTOP_NAV.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = DESKTOP_NAV.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every item has an id, label and icon', () => {
    for (const item of DESKTOP_NAV) {
      expect(typeof item.id).toBe('string');
      expect(typeof item.label).toBe('string');
      expect(typeof item.icon).toBe('string');
    }
  });
});
