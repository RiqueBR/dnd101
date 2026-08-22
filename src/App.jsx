import { useTheme } from './hooks/useTheme.js';
import { AppShell } from './components/layout/AppShell.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return <AppShell theme={theme} toggleTheme={toggleTheme} />;
}
