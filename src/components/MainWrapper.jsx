import { useState } from "react";
import LeftWrapper from "./LeftWrapper";
import RightWrapper from "./RightWrapper";
import styles from "./mainWrapper.module.css";

export default function MainWrapper() {
  const [title, setTitle] = useState("All Tasks");
  const [filter, setFilter] = useState("all");

  function handleClick(e) {
    const targetValue = e.target.value;
    switch (targetValue) {
      case "all":
        setTitle("ALL TASKS");
        break;
      case "today":
        setTitle("TODAY");
        break;
      case "week":
        setTitle("NEXT 7 DAYS");
        break;
      case "upcoming":
        setTitle("UPCOMING");
        break;
      case "completed":
        setTitle("COMPLETED");
        break;
    }
    setFilter(targetValue);
  }

  return (
    <div className={styles.mainWrapper}>
      <LeftWrapper handleClick={handleClick} />
      <RightWrapper title={title} filter={filter} setFilter={setFilter} />
    </div>
  );
}
