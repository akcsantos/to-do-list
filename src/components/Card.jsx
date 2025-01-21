import styles from "./card.module.css";
import { useState, useEffect } from "react";
export default function Card({
  task,
  index,
  checked,
  toggleCheck,
  box,
  removeTask,
}) {
  const [cardStyle, setCardStyle] = useState("none");
  function cardEffect() {
    if (task.completed === true) {
      setCardStyle("line-through");
    } else {
      setCardStyle("none");
    }
  }

  useEffect(() => {
    cardEffect(), box;
  });

  return (
    <li className={styles.card}>
      <span style={{ textDecoration: cardStyle }}>
        <input
          type="checkbox"
          checked={task.completed}
          className={styles.checkBox}
          onChange={() => toggleCheck(task.category, task.index)}
          value={checked}
        />
        {task.text.charAt(0).toUpperCase() + task.text.slice(1).toLowerCase()}-{" "}
        <strong>Due: {task.date || "No date set"}</strong>
      </span>
      <button
        onClick={() => removeTask(task.category, index)}
        className={styles.removeBtn}
      >
        Remove
      </button>
    </li>
  );
}
