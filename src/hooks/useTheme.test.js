import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useTheme } from './useTheme.js';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to grimoire when no theme is set on the document', () => {
    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;

    expect(theme).toBe('grimoire');
  });

  it('picks up the theme already applied to the document', () => {
    document.documentElement.setAttribute('data-theme', 'scroll');

    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;

    expect(theme).toBe('scroll');
  });

  it('toggles between grimoire and scroll, updating the DOM and localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      const [, toggleTheme] = result.current;
      toggleTheme();
    });

    expect(result.current[0]).toBe('scroll');
    expect(document.documentElement.getAttribute('data-theme')).toBe('scroll');
    expect(localStorage.getItem('dnd101-theme')).toBe('scroll');

    act(() => {
      const [, toggleTheme] = result.current;
      toggleTheme();
    });

    expect(result.current[0]).toBe('grimoire');
    expect(document.documentElement.getAttribute('data-theme')).toBe('grimoire');
    expect(localStorage.getItem('dnd101-theme')).toBe('grimoire');
  });
});
