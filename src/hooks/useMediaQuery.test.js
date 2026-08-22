import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery.js';

function installMatchMediaMock(initialMatches) {
  const listeners = new Set();
  let matches = initialMatches;

  const mql = {
    get matches() {
      return matches;
    },
    media: '(max-width: 768px)',
    addEventListener: (event, cb) => {
      if (event === 'change') listeners.add(cb);
    },
    removeEventListener: (event, cb) => {
      if (event === 'change') listeners.delete(cb);
    },
  };

  window.matchMedia = vi.fn().mockReturnValue(mql);

  return {
    listenerCount: () => listeners.size,
    setMatches: (next) => {
      matches = next;
      listeners.forEach((cb) => cb({ matches: next }));
    },
  };
}

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns the current match state', () => {
    installMatchMediaMock(true);
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when the media query match state changes', () => {
    const mock = installMatchMediaMock(false);
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      mock.setMatches(true);
    });

    expect(result.current).toBe(true);
  });

  it('unsubscribes its listener on unmount', () => {
    const mock = installMatchMediaMock(false);
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(mock.listenerCount()).toBe(1);

    unmount();

    expect(mock.listenerCount()).toBe(0);
  });
});
