import * as types from "../constants/action-types";
import callApi from "../services/api-client";

export function logIn(data) {
  return dispatch => {
    dispatch({ type: types.LOG_IN_REQUEST });

    return callApi("POST", "login", data)
      .then((response) => {
        return dispatch({
          type: types.LOG_IN_SUCCESS,
          user: response.user
        });
      })
      .catch(error => dispatch({ type: types.LOG_IN_FAILURE, error }));
  };
}
export function logOut() {
  return dispatch => {
    dispatch({ type: types.LOG_OUT_REQUEST });

    return callApi("GET", "logout")
      .then(({ data = {} }) => {
        return dispatch({
          type: types.LOG_OUT_SUCCESS
        });
      })
      .catch(error => dispatch({ type: types.LOG_OUT_FAILURE, error }));
  };
}
