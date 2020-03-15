import { combineReducers } from "redux";
import characters from "./characters";
import campaigns from "./campaigns";
import user from "./user";

export default combineReducers({
  characters,
  campaigns,
  user
});
