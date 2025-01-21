import LeftWrapper from "./LeftWrapper";
import styles from "./mainContainer.module.css";
import RightWrapper from "./RightWrapper";

export default function MainContainer() {
  return (
    <div className={styles.mainContainer}>
      <LeftWrapper />
      <RightWrapper />
    </div>
  );
}
