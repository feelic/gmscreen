import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCampaigns } from "../actions/campaigns";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Campaigns.module.css";

export default function Campaigns() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const campaigns = Object.values(state.campaigns);

  useEffect(() => {
    dispatch(readCampaigns());
  }, [dispatch]);

  return (
    <div className={styles.CampaignsList}>
      <h1>Welcome to GMScreen</h1>
      <Link className={styles.createButton} to={"campaign/new"}>
        <FontAwesomeIcon icon={faPlus} /> Create a new campaign
      </Link>
      <ul>
        {campaigns.map(campaign => {
          return (
            <li key={campaign._id}>
              <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
