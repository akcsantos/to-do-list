import { useState } from "react";
import styles from "./rightWrapper.module.css";
import Form from "./Form";
import Card from "./Card";

export default function RightWrapper({ title, filter }) {
  const [formState, setFormState] = useState(false);
  const [headerStyle, setHeaderStyle] = useState(styles.headerSticky);
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [box, setBox] = useState(false);
  const [tasks, setTasks] = useState({
    today: [],
    week: [],
    upcoming: [],
  });

  //Categorizes task either for today, for the next 7 days or for the upcoming days
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

  //Adds the task to the list upon submission of the form
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

  //Displays or filters the tasks according to the selected tab of the user
  function getTasks() {
    const dateSort = (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    };

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

  //Arranges the tasks upon checking(completion) of the task
  function toggleCheck(section, index) {
    setTasks({
      ...tasks,
      [section]: tasks[section].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    });
    setBox(!box);
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
            <Card
              key={`${task.category}-${task.index}`}
              task={task}
              index={index}
              checked={checked}
              toggleCheck={toggleCheck}
              box={box}
              removeTask={removeTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}
