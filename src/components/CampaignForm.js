import React, { useState, useEffect } from "react";
import ImageForm from "./ImageForm";
import styles from "./Form.module.css";
import Panel from "./Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getConfig } from "../services/read-config";

export default function CampaignForm(props) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const { campaign = {}, actions } = props;
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState();
  const campaignId = campaign._id;
  const submitAction =
    (campaignId && actions.updateCampaign) || actions.createCampaign;
  const submitLabel = (campaignId && "update") || "create";
  const formTitle = (campaignId && `Edit ${name}`) || "Create new campaign";
  const closeLink = (campaignId && `/campaign/${campaignId}`) || "/";

  useEffect(() => {
    setName(campaign.name || "");
    setTheme(campaign.theme || "");
    setImage(campaign.image);
  }, [campaign, campaignId]);

  return (
    <Panel className={styles.form}>
      <h2 className={styles.formTitle}>{formTitle}</h2>
      <Link className={styles.closeForm} to={closeLink}>
        <FontAwesomeIcon icon={faTimes} />
      </Link>
      <div className={styles.formBlock}>
        <label htmlFor="campaignName">Name</label>
        <input
          type="text"
          id="campaignName"
          value={name}
          placeholder="Name of the campaign"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="campaignTheme">Theme</label>
        <select
          id="campaignTheme"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        >
          <option value="fantasy">Fantasy</option>
          <option value="scifi">Science fiction</option>
          <option value="wod">World of Darkness</option>
        </select>
      </div>
      <div className={styles.formBlock}>
        <label htmlFor="campaignImage">Background image</label>
        {image && (
          <img
            src={`${apiBaseUrl}/images/${image}`}
            alt="Background illustration of the campaign"
          />
        )}
        <ImageForm
          onUpload={imageName => {
            setImage(imageName);
          }}
        />
      </div>
      <div className={styles.actions}>
        <button onClick={() => submitAction({ name, theme, image })}>
          <FontAwesomeIcon icon={faCheck} /> {submitLabel}
        </button>
        {campaignId && (
          <button onClick={actions.deleteCampaign}>
            <FontAwesomeIcon icon={faTrash} /> delete campaign
          </button>
        )}
      </div>
    </Panel>
  );
}
