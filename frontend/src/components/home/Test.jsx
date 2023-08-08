import styles from "./Test.module.css";

const Test = () => {
  return (
    <div className={styles.testContainer}>
      <h1 className={styles.testTitle}>
          <span className={styles.testTitleSpan}>R</span>
          <span className={styles.testTitleSpan}>E</span>
          <span className={styles.testTitleSpan}>O</span>
          <span className={styles.testTitleSpan}>N</span>
          <br />
          <span className={styles.testTitleSpan}>C</span>
          <span className={styles.testTitleSpan}>A</span>
          <span className={styles.testTitleSpan}>R</span>
          <span className={styles.testTitleSpan}>P</span>
          <span className={styles.testTitleSpan}>E</span>
          <span className={styles.testTitleSpan}>T</span>
          <span className={styles.testTitleSpan}>!</span>
      </h1>
    </div>
  );
}

export default Test;
