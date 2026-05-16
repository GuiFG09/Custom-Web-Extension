import { useState } from 'react';
import styles from './Header.module.css';

const icons = import.meta.glob('../../assets/icons/*.svg', { eager: true });

const getIconUrl = (filename) => {
  const path = `../../assets/icons/${filename}_icon.svg`;
  return icons[path]?.default || '';
};

export function Header() {
  const [activeTab, setActiveTab] = useState('temas');

  return (
    <header className={styles.headerContainer}>
      <div className={styles.divider} />
      <h1 className={styles.logo}>CustomWeb</h1>

      <nav className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'temas' ? styles.active : ''}`}
          onClick={() => setActiveTab('temas')}
        >
          <span 
            className={styles.iconStyle} 
            style={{ '--icon-url': `url(\"${getIconUrl('temas')}\")` }} 
          />
          Temas
        </button>

        <button 
          className={`${styles.tabButton} ${activeTab === 'fontes' ? styles.active : ''}`}
          onClick={() => setActiveTab('fontes')}
        >
          <span 
            className={styles.iconStyle} 
            style={{ '--icon-url': `url(\"${getIconUrl('fontes')}\")` }} 
          />
          Fontes
        </button>

        <button 
          className={`${styles.tabButton} ${activeTab === 'estilos' ? styles.active : ''}`}
          onClick={() => setActiveTab('estilos')}
        >
          <span 
            className={styles.iconStyle} 
            style={{ '--icon-url': `url(\"${getIconUrl('estilos')}\")` }} 
          />
          Estilos
        </button>
      </nav>

      <div className={styles.divider} />
    </header>
  );
}