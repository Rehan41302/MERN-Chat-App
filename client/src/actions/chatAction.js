import {SEND_MESSAGE,GET_CHATS} from './types'
import {socket} from '../container/routing'

// import history from "../history";
// import axios from 'axios'
   //ADD IMAGE


    export const sendMessage = () => dispatch => {
      console.log('ImageData====1')
    
  
    //   history.push("/AllImages");
    // socket.on("get_chats",(data)=>{
        //  dispatch({
        //     type: SEND_MESSAGE,
        //     payload: data
        //   })
        // })
    }

    //GET ALL CHATS
    export const getChats = () => dispatch => {
     console.log()

     socket.on("get_chats",(data)=>{
         console.log(data)
        dispatch({
           type: GET_CHATS,
           payload: data
         })
       })
    }