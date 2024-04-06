import React from "react";
import styles from "./navBar.module.css";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.brandName}>Task Manager</div>
    </div>
  );
}
export default NavBar;
