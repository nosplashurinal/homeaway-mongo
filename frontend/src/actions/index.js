import * as types from "./types";
import axios from "axios";

const registerSuccess = data => {
  return {
    type: types.REGISTER_SUCCESS,
    data
  };
};

const registerFailure = data => {
  return {
    type: types.REGISTER_FAILURE,
    data
  };
};

const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  };
};

const loginFailure = data => {
  return {
    type: types.LOGIN_FAILURE,
    data
  };
};

const logoutSuccess = data => {
  return {
    type: types.LOGOUT_SUCCESS,
    data
  };
};

const logoutFailure = err => {
  return {
    type: types.LOGOUT_FAILURE,
    err
  };
};

const saveSearchResults = results => {
  return {
    ...results,
    type: types.SAVE_SEARCH_RESULTS
  };
};

const savePropertyDetails = data => {
  return {
    type: types.SAVE_PROPERTY_DETAILS,
    data
  };
};

export const handleLoginChange = data => {
  return {
    type: types.HANDLE_LOGIN_CHANGE,
    data
  };
};

export const submitMessage = message => {
  return {
    type: types.SUBMIT_MESSAGE,
    message
  };
};
export const fetchMessages = id => {
  return {
    type: types.FETCH_MESSAGES,
    id
  };
};
export const saveAddPropertyStatus = status => {
  return {
    type: types.ADD_PROPERTY_STATUS,
    status
  };
};

export const handleLogin = data => {
  return dispatch => {
    axios.defaults.withCredentials = true;
    return axios.post("http://localhost:3001/Login", data).then(
      res => {
        dispatch(loginSuccess(res.data));
      },
      err => {
        dispatch(loginFailure(err.response.data));
      }
    );
  };
};

export const handleLogout = () => {
  return dispatch => {
    return axios.get("http://localhost:3001/Logout").then(
      () => {
        dispatch(logoutSuccess());
      },
      () => {
        dispatch(logoutFailure());
      }
    );
  };
};

export const registerUser = data => {
  return dispatch => {
    axios.defaults.withCredentials = true;
    return axios
      .post("http://localhost:3001/Register", data)
      .then(res => {
        dispatch(registerSuccess(res.data));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data));
      });
  };
};

export const fetchProperties = () => {
  return dispatch => {
    return axios.get(`http://localhost:3001/TravelerDash`).then(
      res => {
        dispatch(saveOwnerProperties({ properties: res.data }));
      },
      err => {
        console.log("Failed to fetch your properties!");
      }
    );
  };
};

export const fetchOwnerProperties = () => {
  return dispatch => {
    return axios.get(`http://localhost:3001/OwnerDash`).then(
      res => {
        dispatch(saveOwnerProperties({ properties: res.data }));
      },
      err => {
        console.log("Failed to fetch your properties!");
      }
    );
  };
};

export const saveSearch = data => {
  return {
    type: types.SAVE_SEARCH,
    data
  };
};

export const fetchSearchResults = params => {
  return dispatch => {
<<<<<<< Updated upstream
    return axios.get(`http://localhost:3001/OwnerDash/MyProps`).then(
=======
    return axios.get("http://localhost:3001/PropertyList", { params }).then(
>>>>>>> Stashed changes
      res => {
        dispatch(saveSearchResults({ properties: res.data }));
      },
      err => {
        console.log("Failed to fetch Search Results!");
      }
    );
  };
};

export const fetchPropertyDetails = (id, params) => {
  return dispatch => {
    return axios.get(`http://localhost:3001/Property/${id}`).then(
      res => {
        dispatch(savePropertyDetails({ details: res.data }));
      },
      err => {
        console.log("Failed to fetch Search Results!");
      }
    );
  };
};

const saveOwnerProperties = data => {
  return {
    type: types.SAVE_PROPERTIES,
    data
  };
};

export const addProperty = data => {
  console.log(data);
  return dispatch => {
    return axios
      .post("http://localhost:3001/AddProperty", data)
      .then(response => {
        console.log("Axios POST response:", response.status);
        dispatch(saveAddPropertyStatus(response.status));
      });
  };
};

const bookingSuccess = data => {
  return {
    type: types.BOOKING_SUCCESS,
    data
  };
};

const bookingFailure = () => {
  return {
    type: types.BOOKING_FAILURE
  };
};

export const book = data => {
  return dispatch => {
    return axios.post("http://localhost:3001/Booking", data).then(response => {
      if (response.status === 200) {
        dispatch(bookingSuccess(response.data));
      } else {
        dispatch(bookingFailure());
      }
    });
  };
};

const messageSent = data => {
  return {
    type: types.MESSAGE_SENT,
    data
  }
};

const messageFailed = () => {
  return {
    type: types.MESSAGE_FAILED
  }
}

export const messageOwner = data => {
  console.log("Data", data);
  return dispatch => {
    return axios.post("http://localhost:3001/AddMessage", data).then(response => {
      if (response.status === 200) {
        dispatch(messageSent(response.data));
      } else {
        dispatch(messageFailed());
      }
    })
  }
}
