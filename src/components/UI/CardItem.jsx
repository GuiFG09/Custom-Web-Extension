import styles from './CardItem.module.css';

export function CardItem({ isActive, onClick, text, miniBg, primaryColor, secondaryColor }) {
  return (
    <div 
      className={`${styles.themeRect} ${isActive ? styles.activeCard : ''}`}
      onClick={onClick}
    >
      <div className={styles.miniRect} style={{ backgroundColor: miniBg }}>
        
        <div className={styles.pillContainer}>
          <div className={styles.primaryColorBlock} style={{ backgroundColor: primaryColor }} />
          <div className={styles.secondaryColorBlock} style={{ backgroundColor: secondaryColor }} />
        </div>

      </div>
      
      <span className={styles.cardText}>{text}</span>
    </div>
  );
}