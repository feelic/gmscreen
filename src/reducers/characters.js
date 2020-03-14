import * as types from "../constants/action-types";

export default function characters(state = [], action) {
  switch (action.type) {
    case types.CREATE_CHARACTER_SUCCESS:
      return { ...state, [action.charId]: action.character };
    case types.READ_CHARACTERS_SUCCESS:
      return action.characters;
    case types.UPDATE_CHARACTER_SUCCESS:
      return { ...state, [action.charId]: action.character };
    case types.DELETE_CHARACTER_SUCCESS:
      const newState = { ...state };

      delete newState[action.charId];

      return newState;
    default:
      return state;
  }
}

export function getFilters(state) {
  const availableFilters = ["faction", "status"];

  return availableFilters.reduce((filters, filter) => {
    return {
      ...filters,
      [filter]: [...new Set(Object.values(state.characters).map(char => char[filter]))]
    };
  }, {});
}

export function getFilteredCharacters(state, filters = {}) {
  let filteredCharacters = Object.values(state.characters);

  if (!Object.keys(filters).length) {
    return filteredCharacters;
  }

  Object.keys(filters).forEach(filter => {
    filteredCharacters = filteredCharacters.filter(char => {
      return filters[filter].includes(char[filter]);
    });
  });
  return filteredCharacters;
}
