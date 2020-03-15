import React from "react";
import styles from "./Panel.module.css";

export default function Panel(props) {
  return (
    <div className={styles.Panel + " " + props.className}>{props.children}</div>
  );
}
