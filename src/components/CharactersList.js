import React from "react";
import CharacterThumbnail from "../components/CharacterThumbnail";
import FiltersBar from "../components/FiltersBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import styles from "./CharactersList.module.css";

export default function CharactersList(props) {
  const {availableFilters, filters, setFilters, characters} = props;
  const { campaignId } = useParams();

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
        <Link className={styles.createButton} to={`${campaignId}/character/new`}>
          <FontAwesomeIcon icon={faPlus} /> new character
        </Link>
        <Link className={styles.createButton} to={`${campaignId}/edit`}>
          <FontAwesomeIcon icon={faEdit} /> edit campaign
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
