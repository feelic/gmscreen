import React, { useState, useEffect } from "react";
import ImageForm from "./ImageForm";
import styles from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getConfig } from "../services/read-config";

export default function CharacterForm(props) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const { character = {}, actions } = props;
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [status, setStatus] = useState("alive");
  const charId = character._id;
  const submitAction =
    (charId && actions.updateCharacter) || actions.createCharacter;
  const submitLabel = (charId && "update") || "create";
  const formTitle = (charId && `Edit ${name}`) || "Create new character";

  useEffect(() => {
    setName(character.name || "");
    setFaction(character.faction || "");
    setDescription(character.description || "");
    setStatus(character.status || "alive");
    setImage(character.image);
  }, [character, charId]);

  return (
    <div className={styles.CharacterForm}>
      <h1 className={styles.formTitle}>{formTitle}</h1>
      <div className={styles.formBlock}>
        <label htmlFor="characterName">Name</label>
        <input
          type="text"
          id="characterName"
          value={name}
          placeholder="Complete name of the character"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="characterFaction">Faction</label>
        <input
          type="text"
          id="characterFaction"
          value={faction}
          placeholder="Faction or House of the character"
          onChange={e => setFaction(e.target.value)}
        />
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="characterDescription">Description</label>
        <textarea
          type="text"
          id="characterDescription"
          value={description}
          placeholder="Text description of the character"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="characterStatus">Status</label>
        <select
          id="characterStatus"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="missing">missing</option>
        </select>
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="characterPortait">Portrait</label>
        {image && (
          <img
            src={`${apiBaseUrl}/images/${image}`}
            alt="portrait of the character"
          />
        )}
        <ImageForm
          onUpload={imageName => {
            setImage(imageName);
          }}
        />
      </div>
      <div className={styles.actions}>
        <button
          onClick={() =>
            submitAction({ name, faction, description, status, image })
          }
        >
          <FontAwesomeIcon icon={faCheck} /> {submitLabel}
        </button>
        {charId && (
          <button onClick={actions.deleteCharacter}>
            <FontAwesomeIcon icon={faTrash} /> delete character
          </button>
        )}
      </div>
    </div>
  );
}
