import { useEffect, useState } from 'react';
import { Header } from './components/Layout/Header';
import { Tabs } from './components/Navigation/Tabs';
import { Fonts } from './components/Navigation/Fonts';
import { Footer } from './components/Layout/Footer';
import { THEMES_OPTIONS } from './constants/themesData';
import { FONTS_OPTIONS } from './constants/fontsData';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './utils/storage';
import styles from './App.module.css';

const BASE_THEME = {
  bg: '#1A181C',
  primary: '#5f4b91',
  secondary: '#E8DEF8',
};

const BASE_FONT = '"Roboto", sans-serif';

function App() {
  const [currentMenu, setCurrentMenu] = useState('temas');
  const [activeTheme, setActiveTheme] = useState(DEFAULT_SETTINGS.themeId);
  const [activeFont, setActiveFont] = useState(DEFAULT_SETTINGS.fontId);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadSettings().then((settings) => {
      if (!isMounted) {
        return;
      }

      setActiveTheme(settings.themeId);
      setActiveFont(settings.fontId);
      setIsLoaded(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    saveSettings({
      themeId: activeTheme,
      fontId: activeFont,
      enabled: activeTheme !== null || activeFont !== null,
    });
  }, [activeTheme, activeFont, isLoaded]);

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
  };

  const handleFontChange = (fontId) => {
    setActiveFont(fontId);
  };

  const handleReset = () => {
    setActiveTheme(null);
    setActiveFont(null);
  };

  const handleSave = () => {
    saveSettings({
      themeId: activeTheme,
      fontId: activeFont,
      enabled: activeTheme !== null || activeFont !== null,
    });
  };

  const currentTheme = THEMES_OPTIONS.find(t => t.id === activeTheme) || null;
  const currentFont = FONTS_OPTIONS.find(f => f.id === activeFont) || null;

  return (
    <div
      className={styles.appContainer}
      style={{
        '--theme-bg': currentTheme?.bg || BASE_THEME.bg,
        '--theme-primary': currentTheme?.primary || BASE_THEME.primary,
        '--theme-secondary': currentTheme?.secondary || BASE_THEME.secondary,
        '--theme-font': currentFont?.family || BASE_FONT,
      }}
    >
      <Header activeMenu={currentMenu} setOnMenuChange={setCurrentMenu} />

      <div className={styles.contentArea}>
        {currentMenu === 'temas' && (
          <Tabs activeTab={activeTheme} setActiveTab={handleThemeChange} />
        )}

        {currentMenu === 'fontes' && (
          <Fonts activeFont={activeFont} setActiveFont={handleFontChange} />
        )}

        {currentMenu === 'estilos' && (
          <div className={styles.placeholderContainer}></div>
        )}
      </div>

      <Footer onReset={handleReset} onSave={handleSave} />
    </div>
  );
}

export default App;