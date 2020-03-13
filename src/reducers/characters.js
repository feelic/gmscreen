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
