import { useState } from "react";
import styles from "./rightWrapper.module.css";
// import Card from "./Card";
import Form from "./Form";

export default function RightWrapper({ title }) {
  const [formState, setFormState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  function addTaskButton() {
    setFormState(true);
  }

  function formOnClose() {
    setFormState(false);
    setDate(Date());
    setInput("");
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
        <div className={styles.cardHolder}></div>
      </div>
    </>
  );
}
