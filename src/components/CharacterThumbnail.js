import React from "react";
import styles from "./CharacterThumbnail.module.css";
import { Link } from "react-router-dom";

export default function CharacterThumbnail(props) {
  const { character = {} } = props;

  return (
    <div className={styles.CharacterThumbnail}>
      <span>{character.name}</span>
      <Link to={`/character/${character.id}`}>view details</Link>
    </div>
  );
}
