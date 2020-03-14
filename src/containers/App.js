import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCharacters } from "../actions/characters";
import CharacterThumbnail from "../components/CharacterThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);

  useEffect(() => {
    dispatch(readCharacters());
  }, [dispatch]);

  return (
    <div className={styles.ListPanel}>
      <div className={styles.header}>
        <h1>Characters</h1>
        <Link className={styles.createButton} to={"/character/new"}>
          <FontAwesomeIcon icon={faPlus} /> new character
        </Link>
      </div>
      <div className={styles.characterList}>
        {Object.values(characters).map(character => {
          return (
            <CharacterThumbnail key={character._id} character={character} />
          );
        })}
      </div>
    </div>
  );
}
