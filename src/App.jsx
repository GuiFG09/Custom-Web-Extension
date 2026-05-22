import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Tabs } from './components/Navigation/Tabs';
import { Fonts } from './components/Navigation/Fonts'; // Novo import
import { Footer } from './components/Layout/Footer';
import { THEMES_OPTIONS } from './constants/themesData';
import { FONTS_OPTIONS } from './constants/fontsData';
import styles from './App.module.css';

function App() {
  const [currentMenu, setCurrentMenu] = useState('temas');
  const [activeTheme, setActiveTheme] = useState(1);
  const [activeFont, setActiveFont] = useState(1);

  const currentTheme = THEMES_OPTIONS.find(t => t.id === activeTheme) || THEMES_OPTIONS[0];
  const currentFont = FONTS_OPTIONS.find(f => f.id === activeFont) || FONTS_OPTIONS[0];

  return (
    <div 
      className={styles.appContainer}
      style={{
        '--theme-bg': currentTheme.bg,
        '--theme-primary': currentTheme.primary,
        '--theme-secondary': currentTheme.secondary,
        '--theme-font': currentFont.family,
      }}
    >
      <Header activeMenu={currentMenu} setOnMenuChange={setCurrentMenu} />
      
      {currentMenu === 'temas' && (
        <Tabs activeTab={activeTheme} setActiveTab={setActiveTheme} />
      )}
      
      {currentMenu === 'fontes' && (
        <Fonts activeFont={activeFont} setActiveFont={setActiveFont} />
      )}

      {currentMenu === 'estilos' && (
        <div className={styles.placeholderContainer}></div>
      )}

      <Footer />
    </div>
  );
}

export default App;