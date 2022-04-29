import { signUpFormhandleChange, signInFormhandleChange } from "./ActionTypes";
import axios from "axios";
import { authenticate } from "../utils/Auth";
import { API } from "../utils/config";
//actionChangeSignInForm
export const actionChangeSignInForm = function (user) {
  return {
    type: signInFormhandleChange,
    payload: {
      ...user,
    },
  };
};
export const actionChangeSignUpForm = function (user) {
  return {
    type: signUpFormhandleChange,
    payload: {
      ...user,
    },
  };
};
//erroractionSubmitSignUpForm
export const erroractionSubmitSignUpForm = function (user, error, alethide) {
  let errorMsg = "Something Went Wrong!!!";
  if (error) {
    errorMsg = error.join(". ");
  } else {
    errorMsg = "Something Went Wrong!!!";
  }
  return {
    type: signUpFormhandleChange,
    payload: {
      ...user,
      error: errorMsg,
      loading: false,
      disabled: false,

      success: false,
      alethide: alethide,
    },
  };
};
//successactionSubmitSignUpForm
export const successactionSubmitsignUpForm = function (
  user,
  message,
  alethide
) {
  return {
    type: signUpFormhandleChange,
    payload: {
      ...user,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      disabled: false,
      success: message,
      alethide: alethide,
    },
  };
};
//actionSubmitSignUpform
export const actionSubmitSignUpForm = function (user) {
  let { name, email, password, password_confirmation, alethide } = user;
  alethide === true ? (alethide = false) : (alethide = true);
  let newUser = {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  };
  return function (dispatch) {
    axios
      .post(`${API}/register`, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        dispatch(
          successactionSubmitsignUpForm(
            response.data.user,
            response.data.message,
            alethide
          )
        );
      })
      .catch(function (error) {
        let Arr = "";
        let errorObj = {};
        if (
          error.response.data.validate_err.email &&
          error.response.data.validate_err.password
        ) {
          errorObj.email = error.response.data.validate_err.email;
          errorObj.password = error.response.data.validate_err.password;
          Arr = [...errorObj.email, ...errorObj.password];
        } else if (error.response.data.validate_err.email) {
          errorObj.email = error.response.data.validate_err.email;
          Arr = [...errorObj.email];
        } else if (error.response.data.validate_err.password) {
          errorObj.password = error.response.data.validate_err.password;
          Arr = [...errorObj.password];
        }
        dispatch(erroractionSubmitSignUpForm(user, Arr, alethide));
      });
  };
};
//erroractionSubmitSignInForm
export const erroractionSubmitSignInForm = function (user, error, logalethide) {
  let errorMsg = "Something Went Wrong!!!";
  if (error.response) {
    errorMsg = error.response.data.message;
  } else {
    errorMsg = "Something Went Wrong!!!";
  }
  return {
    type: signInFormhandleChange,
    payload: {
      user,
      logerror: errorMsg,
      logdisabled: false,
      logloading: false,
      logalethide: logalethide,
    },
  };
};
//successactionSubmitSignInForm
export const successactionSubmitsignInForm = function (
  user,
  token,
  logalethide
) {
  authenticate(token, user);
  return {
    type: signInFormhandleChange,
    payload: {
      ...user,
      logemail: "",
      logpassword: "",
      logloading: false,
      logdisabled: false,
      logredirect: true,
      logsuccess: true,
      logalethide: logalethide,
    },
  };
};
//actionSubmitSignInForm
export const actionSubmitSignInForm = function (user) {
  let { logemail, logpassword, logalethide } = user;
  logalethide === true ? (logalethide = false) : (logalethide = true);
  let oldUser = {
    email: logemail,
    password: logpassword,
  };
  return function (dispatch) {
    axios
      .post(`${API}/login`, oldUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        dispatch(
          successactionSubmitsignInForm(
            response.data.user,
            response.data.token,
            logalethide
          )
        );
      })
      .catch(function (error) {
        dispatch(erroractionSubmitSignInForm(user, error, logalethide));
      });
  };
};
