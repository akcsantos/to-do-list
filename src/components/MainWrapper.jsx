import { useState } from "react";
import LeftWrapper from "./LeftWrapper";
import RightWrapper from "./RightWrapper";
import styles from "./mainWrapper.module.css";

export default function MainWrapper() {
  const [title, setTitle] = useState("All Tasks");

  function handleClick(e) {
    const targetValue = e.target.value;
    setTitle(targetValue);
  }

  return (
    <div className={styles.mainWrapper}>
      <LeftWrapper handleClick={handleClick} />
      <RightWrapper title={title} />
    </div>
  );
}
