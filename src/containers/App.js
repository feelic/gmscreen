import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCharacters } from "../actions/characters";
import CharacterThumbnail from "../components/CharacterThumbnail";
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
      <h1>Characters</h1>
      {characters.map(character => {
        return <CharacterThumbnail key={character._id} character={character} />;
      })}
      <Link to={"/character/new"}>new character</Link>
    </div>
  );
}
