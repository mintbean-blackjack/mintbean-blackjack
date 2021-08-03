import axios from 'axios';

const TOKEN = 'token';

//action types
const SET_USER = 'SET_USER';

//action creators
export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

//thunk creators
export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log('data/user in fetchUser thunk>>>>>', data);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addWin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}/addWin`);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addLoss = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}/addLoss`);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addDraw = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}/addDraw`);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMoney = (id, payout) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}/updateMoney`, payout);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const resetStats = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${id}/resetStats`);
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function userReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return user;
  }
}
