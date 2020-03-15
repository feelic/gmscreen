import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCharacter,
  updateCharacter,
  deleteCharacter
} from "../actions/characters";
import { Redirect, useParams, useHistory } from "react-router-dom";
import CharacterForm from "../components/CharacterForm";
import styles from "./Character.module.css";

export default function Character() {
  const dispatch = useDispatch();
  const { charId, campaignId } = useParams();
  const history = useHistory();
  const state = useSelector(state => state);
  const character = state.characters[charId] || {};
  const campaign = state.campaigns[campaignId];
  const user = state.user;
  const isCampaignAuthor = user && user.id === campaign.author;

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

  if (! charId) {
    return <Redirect to={`/campaign/${campaignId}`} />
  }

  return (
    <div className={styles.CharacterPanel}>
    {isCampaignAuthor &&
      <CharacterForm actions={actions} character={character} campaignId={campaignId}/>
    }
    </div>
  );
}
