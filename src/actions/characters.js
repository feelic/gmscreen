import * as types from "../constants/action-types";
import callApi from "../services/api-client";

export function readCharacters() {
  return dispatch => {
    dispatch({ type: types.READ_CHARACTERS_REQUEST });

    return callApi("GET", "characters")
      .then(({ data = {} }) => {
        return dispatch({
          type: types.READ_CHARACTERS_SUCCESS,
          characters: data
        });
      })
      .catch(error => dispatch({ type: types.READ_CHARACTERS_FAILURE, error }));
  };
}
export function createCharacter(character) {
  return dispatch => {
    dispatch({ type: types.CREATE_CHARACTER_REQUEST });

    return callApi("POST", "character", { ...character })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.CREATE_CHARACTER_SUCCESS,
          character: data,
          charId: data._id
        });
      })
      .catch(error =>
        dispatch({ type: types.CREATE_CHARACTER_FAILURE, error })
      );
  };
}
export function updateCharacter(charId, character) {
  return dispatch => {
    dispatch({ type: types.UPDATE_CHARACTER_REQUEST });

    return callApi("POST", `character/${charId}`, { ...character })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.UPDATE_CHARACTER_SUCCESS,
          character: data,
          charId
        });
      })
      .catch(error =>
        dispatch({ type: types.UPDATE_CHARACTER_FAILURE, error })
      );
  };
}
export function deleteCharacter(charId) {
  return dispatch => {
    dispatch({ type: types.DELETE_CHARACTER_REQUEST });

    return callApi("DELETE", `character/${charId}`)
      .then(({ data = {} }) => {
        return dispatch({
          type: types.DELETE_CHARACTER_SUCCESS,
          charId
        });
      })
      .catch(error =>
        dispatch({ type: types.DELETE_CHARACTER_FAILURE, error })
      );
  };
}
