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
            value="week"
          >
            🔜 NEXT 7 DAYS
          </button>
          <button
            className={styles.leftButton}
            onClick={handleClick}
            value="upcoming"
          >
            📆 UPCOMING
          </button>
        </div>
      </div>
      {/* <div className={styles.bottomContainer}>
        <h2>Projects</h2>
      </div> */}
    </div>
  );
}
