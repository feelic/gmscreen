import React from "react";
import Panel from "./Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getConfig } from "../services/read-config";
import styles from "./CharacterDetails.module.css";

export default function CharacterDetails(props) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const { character = {}, campaignId } = props;

  return (
    <Panel className={styles.CharacterDetails}>
      <h2 className={styles.formTitle}>{character.name}</h2>
      <Link className={styles.close} to={`/campaign/${campaignId}`}>
        <FontAwesomeIcon icon={faTimes} />
      </Link>
      <img
        src={`${apiBaseUrl}/images/${character.image}`}
        alt="portrait of the character"
      />
      <div>
        {character.faction && <p>member of {character.faction}</p>}
        <p>{character.status}</p>
      </div>
      <div>{character.description}</div>
    </Panel>
  );
}
