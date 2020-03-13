import React, { useState, useEffect } from "react";
import styles from "./CharacterForm.module.css";

export default function CharacterForm(props) {
  const { character = {}, actions } = props;
  const charId = character._id;
  const submitAction = (charId && actions.update) || actions.create;
  const submitLabel = (charId && "update") || "create";
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("alive");

  useEffect(() => {
    setName(character.name || "");
    setFaction(character.faction || "");
    setDescription(character.description || "");
    setStatus(character.status || "alive");
  }, [character, charId]);

  return (
    <div className={styles.CharacterForm}>
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
        <input
          type="text"
          id="characterStatus"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
      </div>
      <div className={styles.formBlock}>
        <button
          onClick={() => submitAction({ name, faction, description, status })}
        >
          {submitLabel}
        </button>
        {charId && (
          <button onClick={actions.deleteCharacter}>delete character</button>
        )}
      </div>
    </div>
  );
}
