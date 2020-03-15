import * as types from "../constants/action-types";

export default function user(state = {}, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
