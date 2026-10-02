import { describe, expect, it } from 'vitest';
import { NAV_SECTIONS, flattenSections } from './navigation.js';

describe('NAV_SECTIONS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(NAV_SECTIONS)).toBe(true);
    expect(NAV_SECTIONS.length).toBeGreaterThan(0);
  });

  it('every top-level item and nested child has an id, label and icon', () => {
    for (const item of NAV_SECTIONS) {
      expect(typeof item.id).toBe('string');
      expect(typeof item.label).toBe('string');
      expect(typeof item.icon).toBe('string');
      for (const child of item.children ?? []) {
        expect(typeof child.id).toBe('string');
        expect(typeof child.label).toBe('string');
        expect(typeof child.icon).toBe('string');
      }
    }
  });
});

describe('flattenSections', () => {
  it('has unique ids across every leaf, including nested children', () => {
    const ids = flattenSections().map((leaf) => leaf.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('replaces a grouped item with its children rather than including the group itself', () => {
    const ids = flattenSections().map((leaf) => leaf.id);
    expect(ids).not.toContain('rules');
    expect(ids).toEqual(expect.arrayContaining(['abilities', 'actions', 'rounds']));
  });

  it('yields all 6 leaf sections in nav order', () => {
    const ids = flattenSections().map((leaf) => leaf.id);
    expect(ids).toEqual(['builder', 'abilities', 'actions', 'rounds', 'spells', 'encounters']);
  });
});
