import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCharacter, updateCharacter } from "../actions/characters";
import CharacterForm from "../components/CharacterForm";
import {
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import styles from "./Character.module.css"

export default function Character() {
  const dispatch = useDispatch();
  const { charId } = useParams();

  const character = useSelector(state => state.characters[charId]);


  const actions = {
    create: (values) => dispatch(createCharacter(values)),
    update: (values) => dispatch(updateCharacter(charId, values))
  };

  return (
    <div className={styles.CharacterPanel}>
      <CharacterForm actions={actions} character={character} />
      <Link to={'/'}>close</Link>
    </div>
  );
}
