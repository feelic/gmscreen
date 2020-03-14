import React from "react";
import styles from "./CharacterThumbnail.module.css";
import { Link } from "react-router-dom";
import { getConfig } from "../services/read-config";

export default function CharacterThumbnail(props) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const { character = {} } = props;
  const { _id, name, image } = character;

  return (
    <Link to={`/character/${_id}`} className={styles.thumbnail}>
      <h2 className={styles.name}>{name}</h2>
      <img
        className={styles.portrait}
        src={`${apiBaseUrl}/images/${image}`}
        alt={`portrait of ${name}`}
      />
    </Link>
  );
}
