import {
    GET_CHATS,
  } from "../actions/types";
// import axios from "axios";
//   const isEmpty = require("is-empty");
  const initialState = {
    loading: false,
    chat:undefined,
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
        };

      default:
        return state;
    }
  }