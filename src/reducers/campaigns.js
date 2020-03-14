import * as types from "../constants/action-types";

export default function campaigns(state = [], action) {
  switch (action.type) {
    case types.CREATE_CAMPAIGN_SUCCESS:
      return { ...state, [action.campaignId]: action.campaign };
    case types.READ_CAMPAIGNS_SUCCESS:
      return action.campaigns;
    case types.UPDATE_CAMPAIGN_SUCCESS:
      return { ...state, [action.campaignId]: action.campaign };
    case types.DELETE_CAMPAIGN_SUCCESS:
      const newState = { ...state };

      delete newState[action.campaignId];

      return newState;
    default:
      return state;
  }
}
