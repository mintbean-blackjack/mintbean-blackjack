import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    //store signed in user as currentPlayer
    const { id, username, wins, losses, draws, totalMoney } = res.data;
    window.localStorage.setItem(
      "currentPlayer",
      JSON.stringify({
        id: id,
        username: username,
        wins: wins,
        losses: losses,
        draws: draws,
        totalMoney: totalMoney,
      })
    );
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, password, method) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`/auth/${method}`, {
      username,
      password,
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);

  //removes logged in player info from local storage so upon logout, guest player should start from scratch
  window.localStorage.removeItem("currentPlayer");
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
