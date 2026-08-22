import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTheme } from './useTheme.js';

const STORAGE_KEY = 'dnd101-theme';

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('defaults to grimoire when no data-theme attribute is set', () => {
    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;
    expect(theme).toBe('grimoire');
  });

  it('picks up the existing data-theme attribute as the initial value', () => {
    document.documentElement.setAttribute('data-theme', 'scroll');
    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;
    expect(theme).toBe('scroll');
  });

  it('toggles between grimoire and scroll', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      const [, toggleTheme] = result.current;
      toggleTheme();
    });
    expect(result.current[0]).toBe('scroll');

    act(() => {
      const [, toggleTheme] = result.current;
      toggleTheme();
    });
    expect(result.current[0]).toBe('grimoire');
  });

  it('persists the toggled theme to the document and localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      const [, toggleTheme] = result.current;
      toggleTheme();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('scroll');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('scroll');
  });
});
