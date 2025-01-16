import { useState } from "react";
import styles from "./form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form({
  date,
  setDate,
  formOnClose,
  input,
  setInput,
  handleSubmit,
}) {
  const today = new Date().toISOString().split("T")[0];

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.form}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <button className={styles.exitButton} onClick={formOnClose}>
          X
        </button>
        <label className={styles.taskLabel}>
          Enter your task:
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.inputTask}
            type="text"
            placeholder="Wash the dishes"
            required
          />
        </label>
        <label className={styles.taskLabel}>
          Due date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
