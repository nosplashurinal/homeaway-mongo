import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import * as types from "actions/types";
import _ from "lodash";
import { BOOKING_SUCCESS } from "../actions/types";

const loginInit = {
  account: { email: "", password: "" },
  authFlag: false,
  errorMessage: undefined,
  userInfo: undefined
};
const login = (state = loginInit, action) => {
  switch (action.type) {
    case types.HANDLE_LOGIN_CHANGE:
      const account = { ...state.account };
      const e = action.data;
      account[e.currentTarget.name] = e.currentTarget.value;
      return { ...state, account };
    case types.LOGIN_SUCCESS:
      return { ...state, authFlag: true, userInfo: action.data };
    case types.LOGIN_FAILURE:
      return { ...state, errorMessage: action.data };
    default:
      return state;
  }
};

const logout = (state = { isLogoutSuccess: undefined }, action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return { isLogoutSuccess: true };
    case types.LOGOUT_FAILURE:
      return { isLogoutSuccess: false };
    default:
      return state;
  }
};

const messageObj = [
  {
    id: "1",
    sender: "1",
    recipient: "2",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    timestamp: {
      date: "11/1/17",
      time: "00:00"
    }
  },
  {
    id: "2",
    ownerId: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore. Ut enim ad minim veniam.",
    timestamp: {
      date: "11/1/17",
      time: "00:00"
    }
  }
];

const createMessage = (message, messages) => {
  const d = new Date();
  return {
    id: messages.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
    ownerId: "1",
    message,
    timestamp: {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString()
    }
  };
};

export const messages = (state = { messages: [] }, action) => {
  switch (action.type) {
    case types.SUBMIT_MESSAGE:
      const msgObject = createMessage(action.message, state.messages);
      return {
        ...state,
        messages: _.concat(state.messages, msgObject)
      };
    case types.FETCH_MESSAGES:
      const messages = messageObj.map(item => {
        return {
          id: item.id,
          ownerId: item.ownerId,
          message: item.message,
          timestamp: item.timestamp
        };
      });
      return {
        ...state,
        messages
      };
    default:
      return state;
  }
};

export const register = (state = { isRegistered: false }, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return { ...state, isRegistered: true, message: action.data.message };
    case types.REGISTER_FAILURE:
      return { ...state, isRegistered: false, message: action.data };
    default:
      return state;
  }
};

const homeInit = {
  search: {
    startDate: null,
    endDate: null,
    guests: {
      adults: 1,
      children: 0,
      pets: false
    },
    location: undefined
  }
};

export const home = (state = homeInit, action) => {
  switch (action.type) {
    case types.SAVE_SEARCH:
      return { ...state, search: { ...action.data } };
    default:
      return state;
  }
};

export const listing = (
  state = { isLoading: true, properties: [] },
  action
) => {
  switch (action.type) {
    case types.SAVE_SEARCH_RESULTS:
      return { ...state, properties: action.properties, isLoading: false };
    default:
      return state;
  }
};

const ownerdashboardInit = {
  addPropertyStatus: undefined,
  properties: []
};

export const ownerdashboard = (state = ownerdashboardInit, action) => {
  switch (action.type) {
    case types.ADD_PROPERTY_STATUS:
      return { ...state, addPropertyStatus: action.status };
    case types.SAVE_PROPERTIES:
      return { ...state, properties: action.data.properties };
    default:
      return state;
  }
};

export const property = (state = {}, action) => {
  switch (action.type) {
    case types.SAVE_PROPERTY_DETAILS:
      return { ...state, details: action.data.details.Property };
    case types.BOOKING_SUCCESS:
      return { ...state, bookingInfo: action.data.result };
    case types.BOOKING_FAILURE:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages,
  login,
  logout,
  register,
  home,
  listing,
  ownerdashboard,
  property,
  toastr: toastrReducer
});

export default rootReducer;
