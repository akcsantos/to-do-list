import { useState, useEffect } from "react";
import styles from "./rightWrapper.module.css";
import Form from "./Form";

export default function RightWrapper({ title, filter }) {
  const [formState, setFormState] = useState(false);
  const [headerStyle, setHeaderStyle] = useState(styles.headerSticky);
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [cardStyle, setCardStyle] = useState(styles.card);
  const [box, setBox] = useState(false);
  const [tasks, setTasks] = useState({
    today: [],
    week: [],
    upcoming: [],
  });

  function categorizeTask() {
    const today = new Date();
    const taskDate = new Date(date);
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return "today";
    } else if (diffDays <= 7) {
      return "week";
    } else {
      return "upcoming";
    }
  }

  function addTaskButton() {
    setFormState(true);
    setHeaderStyle(styles.headerModalOn);
  }

  function formOnClose() {
    setFormState(false);
    setDate("");
    setInput("");
    setHeaderStyle(styles.headerSticky);
  }

  function handleSubmit(e) {
    e.preventDefault();
    formOnClose();

    if (input.trim() && date) {
      const category = categorizeTask(date);
      const task = { text: input.trim(), date, completed: false };
      setTasks({
        ...tasks,
        [category]: [...tasks[category], task],
      });
    }
  }

  function getTasks() {
    const dateSort = (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    };

    // const allTasks = [
    //   ...tasks["today"],
    //   ...tasks["week"],
    //   ...tasks["upcoming"],
    // ];

    const allTasks = Object.entries(tasks).flatMap(([category, taskList]) =>
      taskList
        .sort(dateSort)
        .map((task, i) => ({ ...task, category, index: i }))
    );
    if (filter === "all") {
      return allTasks.sort((a, b) => a.completed - b.completed);
    }

    return tasks[filter]
      .sort(dateSort)
      .map((task, i) => ({ ...task, category: filter, index: i }))
      .sort((a, b) => a.completed - b.completed);
  }

  function removeTask(section, index) {
    setTasks({
      ...tasks,
      [section]: tasks[section].filter((_, i) => i !== index),
    });
  }

  function toggleCheck(section, index) {
    setTasks({
      ...tasks,
      [section]: tasks[section].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    });
    setBox(!box);
  }

  function cardEffect() {
    if (box === true) {
      setCardStyle(styles.cardComplete);
    } else {
      setCardStyle(styles.cardIncomplete);
    }
  }

  useEffect(() => {
    cardEffect(), box;
  });

  return (
    <>
      {formState && (
        <Form
          date={date}
          setDate={setDate}
          formOnClose={formOnClose}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      )}
      <div className={styles.wrapper}>
        <div className={headerStyle}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.btnHolder}>
            <button className={styles.addButton} onClick={addTaskButton}>
              + Add Task
            </button>
          </div>
        </div>
        <div className={styles.cardHolder}>
          {getTasks().map((task, index) => (
            <li key={`${task.category}-${task.index}`} className={styles.card}>
              <span className={cardStyle}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  className={styles.checkBox}
                  onChange={() => toggleCheck(task.category, task.index)}
                  value={checked}
                />
                {task.text.charAt(0).toUpperCase() +
                  task.text.slice(1).toLowerCase()}
                - <strong>Due: {task.date || "No date set"}</strong>
              </span>
              <button
                onClick={() => removeTask(task.category, index)}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
