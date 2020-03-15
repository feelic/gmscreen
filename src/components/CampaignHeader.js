import React, { Fragment } from "react";
import FiltersBar from "../components/FiltersBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Panel from "./Panel";
import styles from "./CampaignHeader.module.css";

export default function CampaignHeader(props) {
  const {
    availableFilters,
    filters,
    setFilters,
    campaign,
    isCampaignAuthor
  } = props;
  const { campaignId } = useParams();

  return (
    <Panel className={styles.header}>
      <h1 className={styles.campaignTitle}>{campaign.name}</h1>
      <FiltersBar
        availableFilters={availableFilters}
        filters={filters}
        onChange={newFilter => {
          setFilters(newFilter);
        }}
      />
      {isCampaignAuthor && (
        <Fragment>
          <Link
            className={styles.createButton}
            to={`/campaign/${campaignId}/character/new`}
          >
            <FontAwesomeIcon icon={faPlus} /> new character
          </Link>
          <Link
            className={styles.createButton}
            to={`/campaign/${campaignId}/edit`}
          >
            <FontAwesomeIcon icon={faEdit} /> edit campaign
          </Link>
        </Fragment>
      )}
    </Panel>
  );
}
