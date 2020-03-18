import {SEND_MESSAGE,GET_CHATS,PVT_CHAT,GET_ERRORS,GET_USERS} from './types'
import {socket} from '../container/routing'
import store from '../store'

// import history from "../history";
import axios from 'axios'
   //ADD IMAGE
const currStore=store.getState();
   export const getUsers = () => dispatch => {
     axios.post('/api/users',{data:0}).then(res=>{
       console.log('Al users===>>>',res.data, currStore)
       dispatch({
         type:GET_USERS,
         payload:res.data
       })
     })
     .catch(err=>{
       console.log('Get User Error===>>>',err.message)
       dispatch({
         type:GET_ERRORS,
         payload:err.response
       })
     })
   }

    export const getPvtMessages = (id) => dispatch => {
      console.log('ImageData====1')
    
  
    //   history.push("/AllImages");
    socket.on("pvt_chats",(data)=>{
      console.log('Pvt Chat On====////',data,id)
      const filtered=data.filter(e => {
                   return e._id==id
                });
         if(filtered.length!=0){
           dispatch({
              type: PVT_CHAT,
              payload: filtered[0]
            })
         }       
        })
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

    export const privateMessage = (data) => dispatch => {
      console.log(data)
      axios.post('/api/privateMessage',data).then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message)
        dispatch({
          type:GET_ERRORS,
          payload:err.response
        })
      })
    }