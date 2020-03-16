import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCharacters } from "../actions/characters";
import {
  readCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign
} from "../actions/campaigns";
import CampaignForm from "../components/CampaignForm";
import CampaignHeader from "../components/CampaignHeader";
import { getFilters, getFilteredCharacters } from "../reducers/characters";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import Character from "./Character";
import CharactersList from "../components/CharactersList";
import styles from "./Campaign.module.css";

export default function Campaign() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { campaignId } = useParams();
  const [filters, setFilters] = useState({});
  const state = useSelector(state => state);
  const campaign = state.campaigns[campaignId] || {};
  const characters = getFilteredCharacters(state, filters);
  const availableFilters = getFilters(state);
  const user = state.user;
  const isAdmin = user && user.id;
  const isCampaignAuthor = user && user.id === campaign.author;

  useEffect(() => {
    if (campaignId) {
      dispatch(readCampaigns());
      dispatch(readCharacters(campaignId));
    }
  }, [dispatch, campaignId]);

  const actions = {
    createCampaign: values => {
      dispatch(createCampaign(values));
      history.push(`/`);
    },
    updateCampaign: values => {
      dispatch(updateCampaign(campaignId, values));
      history.push(`/campaign/${campaignId}`);
    },
    deleteCampaign: () => {
      dispatch(deleteCampaign(campaignId));
      history.push(`/`);
    }
  };

  return (
    <div className={styles.Campaign + " " + styles[campaign.theme]}>
      <CampaignHeader
        {...{
          availableFilters,
          filters,
          setFilters,
          campaign,
          isCampaignAuthor
        }}
      />
      <div className={styles.contentWrapper}>
        <Switch>
          <Route exact path="/campaign/new">
            <CampaignForm
              actions={actions}
              campaign={campaign}
              user={user}
              isAdmin={isAdmin}
            />
          </Route>
          <Route exact path="/campaign/:campaignId/edit">
            <CampaignForm
              actions={actions}
              campaign={campaign}
              user={user}
              isCampaignAuthor={isCampaignAuthor}
            />
          </Route>
          <Route exact path="/campaign/:campaignId/character/new">
            <CharactersList characters={characters} />
            <Character />
          </Route>
          <Route path="/campaign/:campaignId/character/:charId">
            <CharactersList characters={characters} />
            <Character />
          </Route>
          <Route path="/campaign/:campaignId">
            <CharactersList characters={characters} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
