import styles from './Header.module.css';

const icons = import.meta.glob('../../assets/icons/*.svg', { eager: true });

const getIconUrl = (filename) => {
  const path = `../../assets/icons/${filename}_icon.svg`;
  return icons[path]?.default || '';
};

export function Header({ activeMenu, setOnMenuChange }) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.divider} />
      <h1 className={styles.logo}>CustomWeb</h1>

      <nav className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeMenu === 'temas' ? styles.active : ''}`}
          onClick={() => setOnMenuChange('temas')}
        >
          <span 
            className={styles.iconStyle} 
            style={{ '--icon-url': `url(\"${getIconUrl('temas')}\")` }} 
          />
          Temas
        </button>

        <button 
          className={`${styles.tabButton} ${activeMenu === 'fontes' ? styles.active : ''}`}
          onClick={() => setOnMenuChange('fontes')}
        >
          <span 
            className={styles.iconStyle} 
            style={{ '--icon-url': `url(\"${getIconUrl('fontes')}\")` }} 
          />
          Fontes
        </button>

        <button 
          className={`${styles.tabButton} ${activeMenu === 'estilos' ? styles.active : ''}`}
          onClick={() => setOnMenuChange('estilos')}
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