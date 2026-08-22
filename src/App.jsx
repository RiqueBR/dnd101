import { useTheme } from './hooks/useTheme.js';
import { DesktopApp } from './components/desktop/DesktopApp.jsx';
import { MobileApp } from './components/mobile/MobileApp.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <DesktopApp theme={theme} toggleTheme={toggleTheme} />
      <MobileApp theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
