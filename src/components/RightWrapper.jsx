import { useState } from "react";
import styles from "./rightWrapper.module.css";
// import Card from "./Card";
import Form from "./Form";

export default function RightWrapper({ title, filter }) {
  const [formState, setFormState] = useState(false);
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState({
    all: [],
    today: [],
    weekly: [],
    monthly: [],
    completed: [],
  });

  function categorizeTask() {
    const today = new Date();
    const taskDate = new Date(date);
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return "today";
    } else if (diffDays <= 7) {
      return "weekly";
    } else {
      return "monthly";
    }
  }

  function addTaskButton() {
    setFormState(true);
  }

  function formOnClose() {
    setFormState(false);
    setDate("");
    setInput("");
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
    console.log(tasks);
  }

  const removeTask = (section, index) => {
    setTasks({
      ...tasks,
      [section]: tasks[section].filter((_, i) => i !== index),
    });
  };

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
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.btnHolder}>
            <button className={styles.addButton} onClick={addTaskButton}>
              + Add Task
            </button>
          </div>
        </div>
        <div className={styles.cardHolder}>
          {/* list section */}
          {/* <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</h2> */}

          {tasks[filter].map((task, index) => (
            <li key={index} className={styles.card}>
              <span>
                {task.text} - <strong>Due: {task.date || "No date set"}</strong>
              </span>
              <button onClick={() => removeTask(filter, index)}>Remove</button>
            </li>
          ))}

          {/* end of */}
        </div>
      </div>
    </>
  );
}
