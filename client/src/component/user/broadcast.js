import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch} from 'react-router-dom'
import smsg from '../images/smsg.png'
import './style/broadcast.css'
import {getChats} from '../../actions/chatAction'
import { connect } from 'react-redux';
import {socket} from '../../container/routing'

 class Broadcast extends Component{


  constructor(Props){
    super(Props);
    this.state={
        message:'',
        data:undefined,
        chats:undefined,
        user:undefined,
        name:'',
        image:undefined,
        file:undefined,
    }
    
}


  componentDidMount(){
socket.emit("view-chats");
if (this.props.auth.isAuthenticated) {
  console.log("Login Didmount Props", this.props)
this.setState({
  auth: true,
  user: this.props.auth.user
})
}
    
    this.props.getChats();
    if(this.props.chat){
      this.setState({
        chats:this.props.chat
      })
    }
    
     // console.log('Chat data=-=-=-=-=-=',data[0].message)
     
     

 }
 
 onChange(e){
  e.preventDefault();
  this.setState({
    [e.target.name]:e.target.value
})
}
componentWillReceiveProps(nextProps){
  if(nextProps){
    if(nextProps.chats){
      console.log(nextProps.chats)
      
        this.setState({
          chats:nextProps.chats
        })
    }
  }
  // socket.on("get_chats",(data)=>{
  //     console.log('Chat data=-=-=-=-=-=',data[0].message)
  //     if(data){
  //         this.setState({
  //             chats:data
  //         })
  //     }
  // })
}

onSend(e){
  e.preventDefault();

  var data={
      name:this.state.user.name,
      id:this.state.user.id,
      message:this.state.message,
      image:this.state.image
  }
  socket.emit("Chat",data)
  const rawChat= this.state.chats
    rawChat.push(data)
  this.setState({message:'',chats:rawChat})

}
imageOnChange=(e)=>{
  let {image} = this.state;

  // this.setState({image: e.target.value});
  e.preventDefault();
console.log(e.target.files)
  let reader = new FileReader();
  let file = e.target.files[0];
  // images.push(reader.result)
  reader.onloadend = () => {
      // images.push(reader.result)
      // log(image)
    this.setState({
      file: file,
      image: reader.result
    });
  }

  reader.readAsDataURL(file)
}


  imagePicker(){
    this.refs.fileUploader.click();
    this.setState({
        imagePicker: true
    })
}
render(){
  if(!this.state.user){
   return <h1>loadind...</h1>
  }
  else{
    const {id,name} = this.state.user
    const {chats} = this.state
    
   return (
     
         <  >
            <div className='row' id='broadcastTop'>
                 {/* <div id='messages' >
                   <div className='row' >
                     <div className='col-12'>
 
                     </div>
                     <div className='col-12'>
 
                     </div>
                   </div> */}
                 {/* </div>                    */}
              <div id='mainBroadcast' >
                
                <div className='row' id='messageScreen'>
                  <div className='col-6' >
                    {/* Reciever Section */}
                     <div id='reciever' >
                     {this.state.chats?
                                 this.state.chats.map((item,index)=>{
                                     return(
                                      <div>
                                        {item.id==id? <div id='sender' className='col-12' >
                                          <p  id='sendtext' >{item.message}</p>
                                          </div>
                                       :<div id='receiver'>
                                         <p  id='rectext'> {item.message} </p>
                                        </div>
                                       }
                                      </div>
 
                     )
                   }) 
                  :<h1>Loading...</h1> }<div id=''></div>
                     </div>
                  </div>
                  <div id='' >
                    <h1></h1>
                  </div>                 
                </div>
 
                 <div id='innerBottom' >
                   
                   <div className='row' >                   
                     <div className='col-10' id='inputDiv' >
 
                     <input  value={this.state.message} name='message' onChange={this.onChange.bind(this)}  type='text' id='textField' placeholder='Start Message' />
 
                     <img src={smsg} width='20' height='20' id='gallery' onClick={this.imagePicker.bind(this)} />
 
                     <input type='file' style={{display:'none'}} ref="fileUploader"  />
 
                     </div>
                     <div className='col-2' style={{textAlign:'left'}}  >
                       <img style={{marginTop:'10px',textAlign:'left',marginLeft:'20px',cursor:'pointer'}} src={smsg} width='40' height='40' onClick={this.onSend.bind(this)} />
                     </div>
                   </div>
                 </div>
              </div>
            </div>
         </>
     )
  }
 }
}

const mapStateToProps = (state) => {
  console.log('Current State===>>>',state)
  return{
   chats:state.chatReducer.chat,
   auth:state.auth
  }
}

export default connect(
  mapStateToProps,{getChats}
)(Broadcast)