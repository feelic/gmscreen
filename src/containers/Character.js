import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCharacter, updateCharacter, deleteCharacter } from "../actions/characters";
import CharacterForm from "../components/CharacterForm";
import { Link, useParams, useHistory } from "react-router-dom";
import styles from "./Character.module.css";

export default function Character() {
  const dispatch = useDispatch();
  const { charId } = useParams();
  const history = useHistory();

  const character = useSelector(state => {
    return state.characters[charId] || {};
  });

  const actions = {
    createCharacter: values => {
      dispatch(createCharacter(values))
      history.push('/')
    },
    updateCharacter: values => dispatch(updateCharacter(charId, values)),
    deleteCharacter: () => {
      dispatch(deleteCharacter(charId))
      history.push('/')
    }
  };

  return (
    <div className={styles.CharacterPanel}>
      <CharacterForm actions={actions} character={character} />
      <Link to={"/"}>close</Link>
    </div>
  );
}
