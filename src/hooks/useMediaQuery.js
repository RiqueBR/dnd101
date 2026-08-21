import { useMemo, useSyncExternalStore } from 'react';

export function useMediaQuery(query) {
  const subscribe = useMemo(() => (callback) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  }, [query]);

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot);
}
