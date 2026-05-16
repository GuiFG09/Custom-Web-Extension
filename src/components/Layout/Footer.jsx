import styles from './Footer.module.css';

export function Footer() {


  return (
    <footer className={styles.footerContainer}>
      <div className={styles.divider} />
      
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton}>
          Salvar
        </button>
      </div>
    </footer>
  );
}