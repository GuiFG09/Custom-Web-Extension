import styles from './Footer.module.css';

export function Footer({ onReset, onSave }) {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.divider} />

      <div className={styles.buttonContainer}>
        <button className={styles.defaultButton} onClick={onReset}>
          Padrão
        </button>
        <button className={styles.saveButton} onClick={onSave}>
          Salvar
        </button>
      </div>
    </footer>
  );
}