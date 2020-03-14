import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCharacter,
  updateCharacter,
  deleteCharacter
} from "../actions/characters";
import CharacterForm from "../components/CharacterForm";
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
      dispatch(createCharacter(values));
      history.push("/");
    },
    updateCharacter: values => {
      dispatch(updateCharacter(charId, values));
      history.push("/");
    },
    deleteCharacter: () => {
      dispatch(deleteCharacter(charId));
      history.push("/");
    }
  };

  return (
    <div className={styles.CharacterPanel}>
      <CharacterForm actions={actions} character={character} />
      <Link className={styles.closeCharacterPanel} to={"/"}>
        <FontAwesomeIcon icon={faTimes} />
      </Link>
    </div>
  );
}
