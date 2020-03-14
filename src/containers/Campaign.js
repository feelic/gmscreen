import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCharacters } from "../actions/characters";
import {
  readCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign
} from "../actions/campaigns";
import CharacterThumbnail from "../components/CharacterThumbnail";
import CampaignForm from "../components/CampaignForm";
import FiltersBar from "../components/FiltersBar";
import { getFilters, getFilteredCharacters } from "../reducers/characters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useHistory } from "react-router-dom";
import { getConfig } from "../services/read-config";
import styles from "./Campaign.module.css";

export default function Campaign() {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const dispatch = useDispatch();
  const history = useHistory();
  const { campaignId } = useParams();
  const [filters, setFilters] = useState({});
  const state = useSelector(state => state);
  const campaign = state.campaigns[campaignId] || {};
  const characters = getFilteredCharacters(state, filters);
  const availableFilters = getFilters(state);

  useEffect(() => {
    if(campaignId) {
      dispatch(readCampaigns());
      dispatch(readCharacters(campaignId));
    }
  }, [dispatch, campaignId]);

  const actions = {
    createCampaign: values => {
      dispatch(createCampaign(values));
      history.push(`/campaign/${campaignId}`);
    },
    updateCampaign: values => {
      dispatch(updateCampaign(campaignId, values));
      history.push(`/campaign/${campaignId}`);
    },
    deleteCampaign: () => {
      dispatch(deleteCampaign(campaignId));
      history.push(`/campaign/${campaignId}`);
    }
  };

  if (!campaignId) {
    return <CampaignForm actions={actions} campaign={campaign} />
  }
  return (
    <div className={styles.ListPanel}>
      <div className={styles.header}>
        <h1>Characters</h1>
        <FiltersBar
          availableFilters={availableFilters}
          filters={filters}
          onChange={newFilter => {
            setFilters(newFilter);
          }}
        />
        <Link className={styles.createButton} to={"/character/new"}>
          <FontAwesomeIcon icon={faPlus} /> new character
        </Link>
      </div>
      <div className={styles.characterList}>
        {characters.map(character => {
          return (
            <CharacterThumbnail key={character._id} character={character} />
          );
        })}
      </div>
    </div>
  );
}
