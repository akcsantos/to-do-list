import styles from "./leftWrapper.module.css";

export default function LeftWrapper({ handleClick }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Todo-List</h2>
      <div className={styles.topContainer}>
        <h2>Home</h2>
        <div className={styles.buttonContainer}>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="all"
          >
            🗒️ ALL TASKS
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="today"
          >
            ❕ TODAY
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="weekly"
          >
            🔜 WEEK
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="monthly"
          >
            📆 MONTH
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="completed"
          >
            ✔️ COMPLETED
          </button>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <h2>Projects</h2>
      </div>
    </div>
  );
}
