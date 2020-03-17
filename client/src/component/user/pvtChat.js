import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import smsg from '../images/smsg.png'
import down from '../images/down.png'
import gallery from '../images/gallery.png'
import './style/broadcast.css'
import {getChats,privateMessage} from '../../actions/chatAction'
import { connect } from 'react-redux';
import {socket} from '../../container/routing'

 class PvtChat extends Component{


  constructor(Props){
    super(Props);
    this.state={
        message:'',
        data:undefined,
        chats:undefined,
        user:undefined,
        name:'',
        chat:undefined,
        image:undefined,
        file:undefined,
        targeted:false,
        arrow:true,
        enterArrow:true,
        receiverId:undefined,
        receiverName:undefined,
    }
    console.log('Constructor=====')
}



componentDidMount(){
  console.log('didmount pvt')
    socket.emit("view-chats");
    if (this.props.auth.isAuthenticated) {
            if(this.props.AllUsers){
                let receiverId=this.props.match.params.id
                console.log('pparams id===>>>',receiverId,this.props.match.params)
                let filtered=this.props.AllUsers.filter(e=>{
                    return e._id==receiverId
                })
                console.log('filtered=====',filtered)
                if(filtered.length!==0){
                  if(this.props.pvtChats){
                    const filterChats = this.props.pvtChats.chats.filter(e=>{return e.receiverName==filtered[0].name})
                    if(filterChats.length!=0){
                      console.log('nextpvtflter',filterChats[0])
                      this.setState({
                        receiverId,
                        receiverName:filtered[0].name,
                        chats:filterChats[0]
                      })
                    }
                  }
                }
            }
  console.log("Login Didmount Props", this.props)
this.setState({
  auth: true,
  user: this.props.auth.user
})
}
// if(this.props.pvtChats){
//   const filterChats = this.props.pvtChats.chats.filter(e=>{return e.receiverName===filtered[0].name})
//   this.setState({
//     chats:this.props.pvtChats,
//     targeted:true,
//   })
//  }
    // this.props.getChats();
    // if(this.props.chats){
    //   this.setState({
    //     chats:this.props.chats,
    //     targeted:true,
    //   })
    // }

     
     

 }
 
 onChange(e){
  e.preventDefault();
  this.setState({
    [e.target.name]:e.target.value
})
}
componentWillReceiveProps(nextProps){
  console.log('will receive pvt')
  if(nextProps){
    if(nextProps.AllUsers||this.props.AllUsers){
      let receiverId=nextProps.match.params.id
      console.log('pparams id===>>>',receiverId)
      let filtered=nextProps.AllUsers.filter(e=>{
          return e._id==receiverId
      })
      console.log('Nextfiltered=====',filtered)
      if(filtered.length!==0){
        if(nextProps.pvtChats){
          const filterChats = nextProps.pvtChats.chats.filter(e=>{return e.receiverName===filtered[0].name})
          if(filterChats.length!=0){
            console.log('nextpvtflter',filterChats[0])
            this.setState({
              receiverId,
              receiverName:filtered[0].name,
              chats:filterChats[0]
            })
          }
          else{
            this.setState({
              receiverId:undefined,
              receiverName:undefined,
              chats:undefined
            })
          }
        }
      }
      
  }
  }
 
}

onEnter = (e) => {
  this.setState({
    enterArrow:false
  })
  // console.log(e.keyCode)
  if(e.keyCode == 13 && e.shiftKey == false) {
    e.preventDefault();

        const {id,name}=this.props.user
        const { receiverId, receiverName, message }=this.state
        let data={
                senderName:name,
                senderId:id,
                receiverName,
                receiverId,
                message,
        }
        this.props.privateMessage(data);
        var prev = this.state.chats
        prev.messages.push({name:this.state.user.name,message:this.state.message})
        this.setState({
          message:'',
          chats:prev
        })

  }
}
onSend=(e)=>{
  e.preventDefault();
console.log('form sy',e.keyCode)


        const {id,name}=this.props.user
        const { receiverId, receiverName, message }=this.state
        let data={
                senderName:name,
                senderId:id,
                receiverName,
                receiverId,
                message,
        }
        this.props.privateMessage(data);
        var prev = this.state.chats
        prev.messages.push({name:this.state.user.name,message:this.state.message})
        this.setState({
          message:'',
          chats:prev
        })
        




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
    console.log('render-----')
  console.log(this.state)
 
  if(!this.state.user||!this.props.AllUsers||!this.state.chats){
    console.log(this.state.user,this.props.AllUsers,this.state.chats)
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
                      {this.state.chats?
                                 this.state.chats.messages.map((item,index)=>{
                                     return(
                                      <div id='messTop' >
                                        {item.name==name?
                                         <div id='sender' className='col-12' >
                                          <p  id='sendtext' >{item.message}</p>
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
                  :<h1>Loading...</h1> }
                  
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
   auth:state.auth,
   user:state.auth.user,
   AllUsers:state.chatReducer.users,
   pvtChats:state.chatReducer.pvtChats
  }
}

export default connect(
  mapStateToProps,{getChats,privateMessage}
)(PvtChat)