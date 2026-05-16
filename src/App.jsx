import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Tabs } from './components/Navigation/tabs';
import { Footer } from './components/Layout/Footer'; 
import { THEMES_OPTIONS } from './constants/themesData'; 
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const currentTheme = THEMES_OPTIONS.find(theme => theme.id === activeTab) || THEMES_OPTIONS[0];

  return (
      <div className={styles.appContainer}
      style={{
        '--theme-bg': currentTheme.bg,
        '--theme-primary': currentTheme.primary,
        '--theme-secondary': currentTheme.secondary,
      }}
      >
        <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />        
      <Footer />
      </div>
  );
}

export default App;