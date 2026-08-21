import { useTheme } from './hooks/useTheme.js';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { DesktopApp } from './components/desktop/DesktopApp.jsx';
import { MobileApp } from './components/mobile/MobileApp.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile
    ? <MobileApp theme={theme} toggleTheme={toggleTheme} />
    : <DesktopApp theme={theme} toggleTheme={toggleTheme} />;
}
