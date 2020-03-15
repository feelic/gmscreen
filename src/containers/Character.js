import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCharacter,
  updateCharacter,
  deleteCharacter
} from "../actions/characters";
import { useParams, useHistory } from "react-router-dom";
import CharacterForm from "../components/CharacterForm";
import styles from "./Character.module.css";

export default function Character() {
  const dispatch = useDispatch();
  const { charId, campaignId } = useParams();
  const history = useHistory();

  const character = useSelector(state => {
    return state.characters[charId] || {};
  });

  const actions = {
    createCharacter: values => {
      dispatch(createCharacter(values));
      history.push(`/campaign/${campaignId}`);
    },
    updateCharacter: values => {
      dispatch(updateCharacter(charId, values));
      history.push(`/campaign/${campaignId}`);
    },
    deleteCharacter: () => {
      dispatch(deleteCharacter(charId));
      history.push(`/campaign/${campaignId}`);
    }
  };

  return (
    <div className={styles.CharacterPanel}>
      <CharacterForm actions={actions} character={character} campaignId={campaignId}/>
    </div>
  );
}
