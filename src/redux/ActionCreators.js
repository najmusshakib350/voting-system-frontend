import {
  getUserProfile,
  profileUpdate,
  signUpFormhandleChange,
} from "./ActionTypes";
import axios from "axios";
import { API } from "../utils/config";

//erroractionProfileUpdateForm
export const erroractionProfileUpdateForm = function (user, error) {
  let errorMsg = "Something Went Wrong!!!";
  if (error.response) {
    errorMsg = error.response.data.message;
  } else {
    errorMsg = "Something Went Wrong!!!";
  }
  return {
    type: signUpFormhandleChange,
    payload: {
      ...user,
      formData: new FormData(),
      success: false,
      error: errorMsg,
      disabled: true,
    },
  };
};
// successactionSubmitProfileUpdateForm
export const successactionSubmitProfileUpdateForm = function (
  user,
  message,
  dispatch
) {
  dispatch({
    type: getUserProfile,
    payload: {
      photo: user,
    },
  });
  return {
    type: profileUpdate,
    payload: {
      ...user,
      formData: new FormData(),
      success: message,
      error: false,
      disabled: true,
    },
  };
};
//ProfileUpdate
export const actionProfileUpdateForm = function (token, profile) {
  return function (dispatch) {
    axios
      .post(`${API}/profile_picture`, profile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(
          successactionSubmitProfileUpdateForm(
            response.data.profile,
            response.data.message,
            dispatch
          )
        );
      })
      .catch(function (error) {
        dispatch(erroractionProfileUpdateForm(profile, error));
      });
  };
};

///actiongetUserProfile
export const actiongetUserProfile = function (token) {
  return function (dispatch) {
    axios
      .get(`${API}/getUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        dispatch({
          type: getUserProfile,
          payload: {
            name: res.data.user.name,
            photo: res.data.user.profile,
            email: res.data.user.email,
          },
        });
      })
      .catch(function (error) {});
  };
};
