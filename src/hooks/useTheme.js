import { useCallback, useState } from 'react';

const STORAGE_KEY = 'dnd101-theme';

function getInitialTheme() {
  return document.documentElement.getAttribute('data-theme') || 'grimoire';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'grimoire' ? 'scroll' : 'grimoire';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
