import { useState } from "react";
import styles from "./rightWrapper.module.css";
import Form from "./Form";

export default function RightWrapper({ title, filter }) {
  const [formState, setFormState] = useState(false);
  const [headerStyle, setHeaderStyle] = useState(styles.headerSticky);
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState({
    all: [],
    today: [],
    week: [],
    upcoming: [],
    completed: [],
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
      const task = { text: input.trim(), date };
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

    const sortedDates = tasks[filter].sort(dateSort);

    if (filter === "all") {
      const allTask = [
        ...tasks["today"],
        ...tasks["week"],
        ...tasks["upcoming"],
      ];

      return allTask
        .sort(dateSort)
        .map((task) => ({ ...task, category: filter }));
    }
    // else if (filter === 'completed') {
    //   return Object.entries(tasks).flatMap(([category, taskList]) =>
    //     taskList.filter((task) => task.completed).map((task) => ({ ...task, category }))
    //   );
    // }
    return sortedDates.map((task) => ({ ...task, category: filter }));
  }

  function removeTask(section, index) {
    setTasks({
      ...tasks,
      [section]: tasks[section].filter((_, i) => i !== index),
    });
  }

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
            <li key={index} className={styles.card}>
              <span>
                {task.text.charAt(0).toUpperCase() +
                  task.text.slice(1).toLowerCase()}
                - <strong>Due: {task.date || "No date set"}</strong>
              </span>
              <button
                onClick={() => removeTask(filter, index)}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </li>
          ))}

          {/* end of */}
        </div>
      </div>
    </>
  );
}
