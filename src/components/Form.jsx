import { useState } from "react";
import styles from "./form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form({ date, setDate, formOnClose, input, setInput }) {
  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.form}>
      <form className={styles.container}>
        <button className={styles.exitButton} onClick={formOnClose}>
          X
        </button>
        <label className={styles.taskLabel}>
          Enter your task:
          <input
            value={input}
            onChange={handleChange}
            className={styles.inputTask}
            type="text"
            placeholder="Wash the dishes"
          />
        </label>
        <label className={styles.taskLabel}>
          Due date:
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={Date()}
            // value={dueDate}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
