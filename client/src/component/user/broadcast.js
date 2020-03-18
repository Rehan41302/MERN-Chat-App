import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import smsg from '../images/smsg.png'
import down from '../images/down.png'
import gallery from '../images/gallery.png'
// import loader from '../images/loader.gif'
import loader from '../images/Spin-1s-144px.gif'
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
        targeted:false,
        arrow:true,
        enterArrow:true,
        loading:true,
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
    if(this.props.chats){
      this.setState({
        chats:this.props.chats,
        targeted:true,
        loading:false,
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
          chats:nextProps.chats,
          loading:false,
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

onEnter = (e) => {
  this.setState({
    enterArrow:false
  })
  // console.log(e.keyCode)
  if(e.keyCode == 13 && e.shiftKey == false) {
    e.preventDefault();
    // this.myFormRef.submit();
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
}
onSend=(e)=>{
  e.preventDefault();
console.log('form sy',e.keyCode)
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
    this.refs.fileUploader.click()
    this.setState({
        imagePicker: true
    })
}
render(){
  let splits =undefined;
  
  console.log(this.state)
 
  if(!this.state.user){
   return <h1>loading...</h1>
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
                  <div className='col-lg-6' >
                    {/* Reciever Section */}
                     <div id='' >
                      {this.state.loading?<img src={loader} style={{padding:'280px 0 0 300px'}} alt='Loading...'/>
                       :this.state.chats?
                                 this.state.chats.map((item,index)=>{
                                  splits = !item.message? void 0 : item.message.match(/(.{1,25})/g)
                                     return(
                                       
                                      <div id='messTop' >
                                        {item.id==id?
                                         <div id='sender' className='col-12' >
                                          <p  id='sendtext' >
                                            {!splits?void 0:
                                            splits.map(i=>{
                                           return <span>{i}</span>
                                            })}
                                          </p>
                                            {index===chats.length-1  ? <span id='target' ></span> :void 0  }
                                            {/* { this.state.chats!==undefined  ? index===chats.length-1 ? <span id='target' >  sdf </span> :<p>pehla</p>  : <p>dusra</p> } */}
                                           {/* {this.state.targeted} */}
                                        
                                          </div>
                                       :<div id='receiver'  >
                                          <span  > 
                                         <p style={{fontWeight:600,marginBottom:'0px',marginTop:'20px',textAlign:'left'}} >   {item.name} </p>

                                          </span>
                                         <p style={{color:'#fff'}} id='rectext'> {item.message} </p>
                                         {index===chats.length-1 ? <span id='target' ></span> :void 0  }                                         
                                         {/* { this.state.chats!==undefined  ? index===chats.length-1 ? <span id='target' >  sdf </span> : <p>pehla</p>  : <p>dusra</p> } */}
                                         {/* {this.props.chats?this.props.chats.length-1 :void 0} */}
                                         {/* {index} */}
                                        </div>
                                       }
                                         {/* { chats.length-1 ? <span id='target' style={{position:'relative',bottom:'0px'}} >  sdf </span> : <p>pehla</p>   } */}
                                      </div>
 
                     )
                   }) 
                  :void 0}
                  
                  {this.state.arrow !== false && (this.state.enterArrow!==false)?
                    <HashLink  smooth to='/user/broadcast#target' onClick={() => {this.setState({ arrow:false })} } >                    
                  <div  id='downArrow'  >
                      <img src={down} width='60' height='60' />  
                  </div>
                    </HashLink>
                    : void 0}
                     </div>
                  </div>   
                </div>
                 <div id='innerBottom' >
                   <div className='row' >                   
                     <div  className= 'col-lg-10 col-xs-8 col-xs-8'  id='inputDiv' >
                        <form>
                        <input style={!this.state.message? {width:'60vw'} : void 0 } onKeyDown={this.onEnter} value={this.state.message} name='message' onChange={this.onChange.bind(this)}  type='text' id='textField' placeholder='Start Message' />                     
                         <img style={!this.state.message? {right:'-50px'} : void 0 } src={gallery} width='30' height='40' id='gallery' onClick={this.imagePicker.bind(this)} />                    
                         <input type='file' style={{display:'none'}} ref="fileUploader"  />

                        </form>
                      </div>
                     <div className=' col-lg-2 col-xs-3 col-sm-3' style={{textAlign:'left'}} id='send' >
                       {!this.state.message ? void 0
                       :
                       (<HashLink smooth to='/user/broadcast#target' >     
                          <img  onClick={this.onSend} style={{marginTop:'10px',textAlign:'left',marginLeft:'20px',cursor:'pointer'}} src={smsg} width='40' height='40'  />
                       </HashLink>)
                          }
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