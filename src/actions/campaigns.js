import * as types from "../constants/action-types";
import callApi from "../services/api-client";

export function readCampaigns() {
  return dispatch => {
    dispatch({ type: types.READ_CAMPAIGNS_REQUEST });

    return callApi("GET", "campaigns")
      .then(({ data = {} }) => {
        return dispatch({
          type: types.READ_CAMPAIGNS_SUCCESS,
          campaigns: data
        });
      })
      .catch(error => dispatch({ type: types.READ_CAMPAIGNS_FAILURE, error }));
  };
}
export function createCampaign(campaign) {
  return dispatch => {
    dispatch({ type: types.CREATE_CAMPAIGN_REQUEST });

    return callApi("POST", "campaign", { ...campaign })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.CREATE_CAMPAIGN_SUCCESS,
          campaign: data,
          campaignId: data._id
        });
      })
      .catch(error =>
        dispatch({ type: types.CREATE_CAMPAIGN_FAILURE, error })
      );
  };
}
export function updateCampaign(campaignId, campaign) {
  return dispatch => {
    dispatch({ type: types.UPDATE_CAMPAIGN_REQUEST });

    return callApi("POST", `campaign/${campaignId}`, { ...campaign })
      .then(({ data = {} }) => {
        return dispatch({
          type: types.UPDATE_CAMPAIGN_SUCCESS,
          campaign: data,
          campaignId
        });
      })
      .catch(error =>
        dispatch({ type: types.UPDATE_CAMPAIGN_FAILURE, error })
      );
  };
}
export function deleteCampaign(campaignId) {
  return dispatch => {
    dispatch({ type: types.DELETE_CAMPAIGN_REQUEST });

    return callApi("DELETE", `campaign/${campaignId}`)
      .then(({ data = {} }) => {
        return dispatch({
          type: types.DELETE_CAMPAIGN_SUCCESS,
          campaignId
        });
      })
      .catch(error =>
        dispatch({ type: types.DELETE_CAMPAIGN_FAILURE, error })
      );
  };
}
