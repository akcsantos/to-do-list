import styles from "./leftwrapper.module.css";

export default function LeftWrapper() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Todo-List</h1>

      <h3 className={styles.firstContainerTitle}>Tasks</h3>

      <div className={styles.firstContainer}>
        <button className={styles.allTasks}>🕐 All Tasks</button>
        <button className={styles.topButton}>🎖️ Today</button>
        <button className={styles.topButton}>🔜 Week</button>
        <button className={styles.topButton}>📅 Month</button>

        <button className={styles.completed}>✔️ Completed</button>
      </div>
      <div className={styles.secondContainer}>
        <h3 className={styles.projectsTitle}>Projects</h3>
        <button className={styles.addProject}>+</button>
      </div>

      <div className={styles.projectsContainer}></div>
    </div>
  );
}
