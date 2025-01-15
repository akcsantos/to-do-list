import { useState } from "react";
import LeftWrapper from "./LeftWrapper";
import RightWrapper from "./RightWrapper";
import styles from "./mainWrapper.module.css";

export default function MainWrapper() {
  const [title, setTitle] = useState("All Tasks");
  const [filter, setFilter] = useState("today");

  function handleClick(e) {
    const targetValue = e.target.value;
    setTitle(
      targetValue.charAt(0).toUpperCase() + targetValue.slice(1) + "'s Tasks"
    );
    setFilter(targetValue);
  }

  return (
    <div className={styles.mainWrapper}>
      <LeftWrapper handleClick={handleClick} />
      <RightWrapper title={title} filter={filter} setFilter={setFilter} />
    </div>
  );
}
