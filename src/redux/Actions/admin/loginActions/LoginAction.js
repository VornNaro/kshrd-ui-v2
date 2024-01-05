import { User } from "../loginActions/LoginActionType";
import Axios from "axios";
import { baseUrl } from "../../../../config/API";
var CryptoJS = require("crypto-js");


//TODO: This function is created to login to admin dashboard
export const login = (username, password, cb) => {
  return async (dispatch) => {

    dispatch({
      type: User.LOGIN_START,
      data: null,
      loading: true,
    });

    await Axios.post(`${baseUrl}/authenticates`, { username, password })
      .then((res) => {
        var encryptedToken = CryptoJS.AES.encrypt(
          res.data.data.token.jwtToken,
          "kshrd"
        ).toString();
        var encryptedTokenField = CryptoJS.AES.encrypt(
          "token",
          "kshrd"
        ).toString();
        console.log(res.data.data)
        sessionStorage.setItem(encryptedTokenField, encryptedToken);
        dispatch({
          type: User.LOGIN_SUCCESS,
          data: encryptedToken,
          loading: false,
          user: res.data.data
        });
      })
      .catch((res) => {
        dispatch({
          type: User.LOGIN_FAIL,
          errorMessage: "Provided credentials are not valid",
          loading: false,
        });
      });
  };
};
