import { useTheme } from './hooks/useTheme.js';
import { usePersistedState } from './hooks/usePersistedState.js';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { MainViewport } from './components/layout/MainViewport.jsx';
import { TopBar } from './components/layout/TopBar.jsx';
import { ScreenViewport } from './components/layout/ScreenViewport.jsx';
import { TabBar } from './components/layout/TabBar.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [section, setSection] = usePersistedState('dnd101-section', 'races');
  const [tab, setTab] = usePersistedState('dnd101m-tab', 'races');

  return (
    <>
      <Sidebar theme={theme} toggleTheme={toggleTheme} section={section} onSelectSection={setSection} />
      <MainViewport section={section} />
      <TopBar theme={theme} toggleTheme={toggleTheme} tab={tab} />
      <ScreenViewport tab={tab} />
      <TabBar tab={tab} onSelectTab={setTab} />
    </>
  );
}
