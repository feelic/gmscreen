import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCharacters } from "../actions/characters";
import CharacterThumbnail from "../components/CharacterThumbnail";
import FiltersBar from "../components/FiltersBar";
import { getFilters, getFilteredCharacters } from "../reducers/characters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Campaign.module.css";

export default function Campaign() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const state = useSelector(state => state);
  const characters = getFilteredCharacters(state, filters);
  const availableFilters = getFilters(state);

  useEffect(() => {
    dispatch(readCharacters());
  }, [dispatch]);

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
