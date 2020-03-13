import * as types from '../constants/action-types';

export default function characters(state = [], action) {
  switch (action.type) {
    case types.READ_CHARACTERS_SUCCESS:
      return action.characters;
    default:
      return state;
  }
}
