import { combineReducers } from "redux";
import characters from "./characters";
import campaigns from "./campaigns";


export default combineReducers({
  characters,
  campaigns
});
