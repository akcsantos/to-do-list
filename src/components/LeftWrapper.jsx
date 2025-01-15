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
            value="ALL TASKS"
          >
            🗒️ ALL TASKS
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="TODAY"
          >
            ❕ TODAY
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="WEEK"
          >
            🔜 WEEK
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="MONTH"
          >
            📆 MONTH
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="COMPLETED"
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
