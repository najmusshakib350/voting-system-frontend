import {
  getUserProfile,
  profileUpdate,
  adminStateChange,
  signUpFormhandleChange,
  signInFormhandleChange,
} from "./ActionTypes";
const InitState = {
  signUpuser: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    error: false,
    loading: false,
    disabled: false,
    success: false,
    alethide: false,
  },
  signInuser: {
    logemail: "",
    logpassword: "",
    logerror: false,
    logloading: false,
    logdisabled: false,
    logredirect: false,
    logsuccess: false,
    logalethide: false,
  },
  adminStateChange: {
    start: false,
    stop: false,
    startSuccessMsg: "",
    stopSuccessMsg: "",
  },
  profileUpdate: {
    formData: new FormData(),
    success: false,
    error: false,
    disabled: false,
  },
  getUserProfile: {
    name: "",
    photo: "",
    email: "",
  },
};

export const Reducer = function (state = InitState, action) {
  switch (action.type) {
    case getUserProfile:
      return {
        ...state,
        getUserProfile: {
          ...state.getUserProfile,
          ...action.payload,
        },
      };
    case profileUpdate:
      return {
        ...state,
        profileUpdate: {
          ...state.profileUpdate,
          ...action.payload,
        },
      };
    case adminStateChange:
      return {
        ...state,
        adminStateChange: {
          ...state.adminStateChange,
          ...action.payload,
        },
      };
    case signUpFormhandleChange:
      return {
        ...state,
        signUpuser: {
          ...state.signUpuser,
          ...action.payload,
        },
      };
    case signInFormhandleChange:
      return {
        ...state,
        signInuser: {
          ...state.signInuser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
