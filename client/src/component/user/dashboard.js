import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import {logoutUser} from '../../actions/authActions'
import {getPvtMessages} from '../../actions/chatAction'
import './style/dashboard.css'
import user from '../images/admin.png'
import db from '../images/db.png'
import u1 from '../images/u1.png'
import u2 from '../images/u2.png'
import bc from '../images/bc.png'
import moment from 'moment'
import UserDashboard from './userDashboard'
import PvtChat from '../user/pvtChat'
import Broadcast from './broadcast'
import Setting from './setting'
import { connect } from 'react-redux';
import {socket} from '../../container/routing'
import push from 'push.js'

 class Dashboard extends Component{

  state={
    loading:true,
    email:'',
    show:false,
    leftResp:false,
    newMessage:0,
    final:0,
    toggle:true,
    currentUser:undefined
  }

passwordToggle(e){
    e.preventDefault()
    this.setState({
        show:!this.state.show
    })
    console.log('hoa clck')
}

broadcastRes(){
  this.setState({
    leftResp:true
  })
}

onLogoutClick = e => {
  e.preventDefault();
  // setTimeout(()=>{
  //   push.create("Hello world!", {
  //     body: "How's it hangin'?",
  //     icon: '/icon.png',
  //     timeout: 4000,
  //     onClick: function () {
  //         window.focus();
  //         this.close();
  //     }
  // });
  // },3000)
  this.props.logoutUser();
};

componentDidMount(){
  if(this.props.auth.user){
    console.log(this.props)
    socket.on("call_pvt_data",()=>{
      // console.log('called pvt chat===///',this.props.auth.user.id)
      socket.emit("get_pvt_chats");
      this.props.getPvtMessages(this.props.auth.user.id);  
    })
    socket.emit("get_pvt_chats");
    this.props.getPvtMessages(this.props.auth.user.id);
    this.setState({
      currentUser:this.props.auth.user
    })
  }
  if(this.props.users){
    
    this.setState({
      users:this.props.users
    })
  }
}

//WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
UNSAFE_componentWillReceiveProps(nextProps) {
let newMessage = this.state.newMessage;
if(nextProps.users){
  this.setState({
    users:nextProps.users
  })
}
if(nextProps.chats){
  console.log('dashboard ka will=>',nextProps)
    let myId = this.state.currentUser.id
    let newLength = nextProps.chats.length;  
    let lastPerson = nextProps.chats[newLength-1]
    if(newLength!==newMessage){
      let final = newLength-newMessage 
        if(newMessage==0 || lastPerson.id==myId ){
         final=0 
        }

        // newMessage= this.state.newMessage.length
        // let final = newLength-newMessage;
        this.setState({
          newMessage:newLength,
          final: final,
          toggle:false
        })
        console.log(final,'new wala')
    }

  }
}
render(){
  // console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
  let filtered=[];
  let {users} = this.state
   if(this.props.chats){
      filtered = this.props.chats.filter(e => {
        return e.id !== this.props.auth.user.id
      }) 
      console.log(filtered,this.props.auth.user.id)
   }
  return (
    
        <  >
           <BrowserRouter>
           <div className='row' id='topNavDash' >
              <div className='col-6' id='navLeft' >

                    <h2>
                   <span>Growth</span>
                    <span>  Mates
                    </span>
                  </h2> 
                  
                {/* Backchodiyan... */}
                 {/* <h2 style={{fontFamily:'sans-serif',fontWeight:'bold',marginTop:'3px'}}>
                   <span>Growth</span>
                    <span style={
                      { background: '#FF9900',
                      color: '#000000',borderRadius: '1vw',
                      padding: '0 7px 3px 0',
                    marginLeft:'5px'}
                      }>  Mates
                    </span>
                  </h2>  */}

              </div>
              <div className='col-6' id='navRight' style={{zIndex:'9'}} >
                  <h5  type="button" data-toggle="collapse" data-target="#collapseExample"
                   aria-expanded="false" aria-controls="collapseExample" > <img src={u1} width='50' height='50' /> </h5>

                  <div class="collapse" id="collapseExample">
                    <div class="" id='userInfo' >
                      <img src={u2} width='80' height='80' style={{marginTop:'20px'}} />
                      <h5 style={{textAlign:'center',color:'black',marginLeft:'20px'}}>{this.props.auth.user ? this.props.auth.user.name:void 0}</h5>
                      <p>{this.props.auth.user ? this.props.auth.user.email:void 0}</p>
                      <div  id='manageSetting' >
                          <Link to='/user/setting' style={{textDecoration:'none',color:'black'}} >  <h6
                          data-toggle="collapse" data-target="#collapseExample"
                          aria-expanded="false" aria-controls="collapseExample"> Manage Your Account </h6> </Link>
                      </div>

                    <button 
                    // data-toggle="collapse" data-target="#collapseExample"
                    // aria-expanded="false" aria-controls="collapseExample"
                    style={{marginTop:'10vh',position:'relative',bottom:'0px'}} 
                    onClick={this.onLogoutClick.bind(this)  }
                    className='btn btn-info btn-block' > Sign out </button>

                    </div>
                  </div>
              </div>
           </div>

           <div className='row' id='responsive' >
              <div className='col-lg-4 col-xs-12 col-xs-12' id={this.state.leftResp===true ? 'dashTopLeft': void 0} >
              <div id='scroller' >
                <ul id='dashUl' >
                <Link style={{textDecoration:'none', color:'black'}} to='/user/dashboard' > <li>   <img src={db} width='40' height='40' style={{margin: '10px'}} /> Dashboard  </li> </Link>
                  <Link style={{textDecoration:'none', color:'black'}} to='/user/broadcast' > <li onClick={this.broadcastRes.bind(this)} >
                    <img src={bc} width='40' height='40' style={{margin: '10px'}} /> Broadcast 
                     <span id='innerLi' > {
                      this.state.final!=0 ? this.state.final : void 0 
                      } </span> </li> </Link> 
                  {users?
                   users.map(user=>{
                    if(user._id!==this.props.auth.user.id){
                      return (
                        <Link style={{textDecoration:'none', color:'black'}} to={`/user/${user._id}`} >  <li> <img src={u1} width='40' height='40' style={{margin: '10px'}} />{user.name}</li> </Link>
                      )
                    }
                  })
                    :void 0 }
                  
                </ul>
              </div>
              </div>
              <div className='col-lg-8 col-xs-8' id='dashTopRight'>
                  <Switch>
                    <Route path='/user/dashboard' exact component={UserDashboard} />
                    <Route exact path='/user/broadcast' component={Broadcast} />
                    <Route exact path='/user/setting' component={Setting} />
                    <Route exact path='/user/:id' component={PvtChat} />
                  </Switch>
              </div>
           </div>
                </BrowserRouter>
        </>
    )
 }
}

const mapStateToProps = (state) =>{
  console.log("Reducer check Auth prod.............", state)
  return{ 
      auth: state.auth,
      chats:state.chatReducer.chat,
      users:state.chatReducer.users,
      pvtChats:state.chatReducer.pvtChats
     
  }
}

export default connect(
  mapStateToProps,{logoutUser,getPvtMessages}
)(Dashboard)