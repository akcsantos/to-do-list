import LeftWrapper from "./LeftWrapper";
import styles from "./maincontainer.module.css";
import RightWrapper from "./RightWrapper";

export default function MainContainer() {
  return (
    <div className={styles.maincontainer}>
      <LeftWrapper />
      <RightWrapper />
    </div>
  );
}
