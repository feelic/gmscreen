import React from "react";
import CharacterThumbnail from "../components/CharacterThumbnail";
import styles from "./CharactersList.module.css";

export default function CharactersList(props) {
  const {characters} = props;

  return (
    <div className={styles.characterList}>
      {characters.map(character => {
        return (
          <CharacterThumbnail key={character._id} character={character} />
        );
      })}
    </div>
  );
}
