import React from "react";
import styles from "./CharacterForm.module.css";

export default function CharacterForm(props) {
  const { character = {}, actions } = props;
  const submitAction = (character._id && actions.update) || actions.create;
  const submitLabel = (character._id && "update") || "create";

  return (
    <div className={styles.CharacterForm}>
      <input type="text" value={character.name} />
      <button onClick={() => submitAction()} value={submitLabel} />
    </div>
  );
}
