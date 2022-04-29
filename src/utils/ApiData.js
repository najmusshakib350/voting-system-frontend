import axios from "axios";
import { API } from "./config";
export async function ValidNidNumber() {
  try {
    let res = await axios("http://localhost:3000/voterinfo.json");
    window.voterInfo = res.data.voterinfo;
  } catch (err) {}
}

//sednOTP
export function SendOTP(token) {
  return axios.get(`${API}/voter_registration`, {
    headers: {
      "Content-Type": "appication/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//checkValidOTP
export function CheckValidOTP(token, otpnumber) {
  return axios.post(
    `${API}/confirm_reg`,
    { otpnumber: otpnumber },
    {
      headers: {
        "Content-Type": "appication/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
