import jwt_decode from "jwt-decode";

export const authenticate = (token, user) => {
  const createString = user.id + " " + user.role;
  // Encode the String
  const encodedString = btoa(createString);

  localStorage.setItem("jwt", JSON.stringify(token));
  localStorage.setItem("info", encodedString);
};

export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    const { exp } = jwt_decode(JSON.parse(localStorage.getItem("jwt")));
    if (new Date().getTime() <= exp * 1000) {
      return true;
    } else {
      localStorage.removeItem("jwt");
      return false;
    }
  } else {
    return false;
  }
};

export const userInfo = () => {
  if (localStorage.getItem("jwt") && localStorage.getItem("info")) {
    const decode = {};
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    // Decode the String
    let decodedString = atob(localStorage.getItem("info"));
    decode.id = decodedString.split(" ")[0];
    decode.role = decodedString.split(" ")[1];
    // const decode = jwt_decode(jwt);
    return { ...decode, token: jwt };
  } else {
    return {};
  }
};

export const signOut = (fn) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("info");
  fn();
};
