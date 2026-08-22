import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePersistedState } from './usePersistedState.js';

const KEY = 'test-persisted-key';

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to the given initial value when nothing is stored', () => {
    const { result } = renderHook(() => usePersistedState(KEY, 'fallback'));
    const [value] = result.current;
    expect(value).toBe('fallback');
  });

  it('picks up an existing stored value as the initial value', () => {
    localStorage.setItem(KEY, 'stored');
    const { result } = renderHook(() => usePersistedState(KEY, 'fallback'));
    const [value] = result.current;
    expect(value).toBe('stored');
  });

  it('updates the value when set', () => {
    const { result } = renderHook(() => usePersistedState(KEY, 'fallback'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    expect(result.current[0]).toBe('updated');
  });

  it('persists the updated value to localStorage', () => {
    const { result } = renderHook(() => usePersistedState(KEY, 'fallback'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    expect(localStorage.getItem(KEY)).toBe('updated');
  });
});
