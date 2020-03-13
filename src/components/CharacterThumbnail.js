import React from "react";
import styles from "./CharacterThumbnail.module.css";
import { Link } from "react-router-dom";
import { getConfig } from "../services/read-config";

export default function CharacterThumbnail(props) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const { character = {} } = props;
  const {_id, name, image} = character;

  return (
    <div className={styles.CharacterThumbnail}>
      <span>{name}</span>
      <img
        src={`${apiBaseUrl}/images/${image}`}
        alt={`portrait of ${name}`}
      />
      <Link to={`/character/${_id}`}>view details</Link>
    </div>
  );
}
