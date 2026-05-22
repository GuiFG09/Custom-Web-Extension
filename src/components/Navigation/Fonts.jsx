import { FONTS_OPTIONS } from '../../constants/fontsData';
import styles from './Fonts.module.css';

export function Fonts({ activeFont, setActiveFont }) {
  return (
    <div className={styles.fontsListContainer}>
      {FONTS_OPTIONS.map((font) => (
        <div
          key={font.id}
          className={`${styles.fontCard} ${activeFont === font.id ? styles.fontCardActive : ''}`}
          onClick={() => setActiveFont(font.id)}
        >
          <div className={styles.fontPreview} style={{ fontFamily: font.family }}>
            Example
          </div>
            <span 
                className={styles.fontName} 
                style={{ fontFamily: font.family }}
            >
            {font.name}
          </span>
        </div>
      ))}
    </div>
  );
}