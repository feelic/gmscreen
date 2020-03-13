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
    dispatch({ type: types.CREATE_CHARACTERS_REQUEST });

    return callApi("POST", "character", { character })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.CREATE_CHARACTERS_SUCCESS,
          characters: data
        });
      })
      .catch(error =>
        dispatch({ type: types.CREATE_CHARACTERS_FAILURE, error })
      );
  };
}
export function updateCharacter(id, character) {
  return dispatch => {
    dispatch({ type: types.UPDATE_CHARACTERS_REQUEST });

    return callApi("POST", "character", { id, character })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.UPDATE_CHARACTERS_SUCCESS,
          characters: data
        });
      })
      .catch(error =>
        dispatch({ type: types.UPDATE_CHARACTERS_FAILURE, error })
      );
  };
}
