import {
    GET_CHATS,GET_USERS,PVT_CHAT
  } from "../actions/types";
// import axios from "axios";
//   const isEmpty = require("is-empty");
  const initialState = {
    loading: false,
    chat:undefined,
    users:undefined,
    pvtChats:undefined,
  };


//   console.log('newCart==========',newCart)

  export default function(state = initialState, action) {
    
    
    switch (action.type) {
      case GET_CHATS:

        return {
          ...state,
          loading: true,
          chat: action.payload,
        //   isAuthenticated: !isEmpty(action.payload),
        };//PVT_CHAT
      case PVT_CHAT:
        return {
          ...state,
          loading: true,
          pvtChats: action.payload,
        //   isAuthenticated: !isEmpty(action.payload),
        };
      case GET_USERS:
        return {
          ...state,
          loading: true,
          users: action.payload,
        //   isAuthenticated: !isEmpty(action.payload),
        };

      default:
        return state;
    }
  }