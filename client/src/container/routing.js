import React, {Component,Lazy,Suspense} from 'react';
// import 
//  {getProducts}
//   from "../actions/productsAction";
import PrivateRoute from "../component/private-route/PrivateRoute";  
import {BrowserRouter ,Route, Switch} from 'react-router-dom';
// import {connect} from 'react-redux'
// import jwt_decode from "jwt-decode";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
// import { Provider } from "react-redux";
import store from "../store";
import Login from './login'
import Dashboard from '../component/user/dashboard.js'
import NoMatch from './not-found.js'  
import socketIOClient from "socket.io-client"
export const socket = socketIOClient("http://localhost:5000");
// import AllImages from './AllImages'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/";
    }
  }


  // 404 page not found

//  

 class Routes extends Component{


  state={
    loading:true
  }

  componentWillReceiveProps(nextProps){

    console.log('props Routing  will rcve props sy', nextProps);

}


render(){
//  console.log('routing ka render==---->',this.props)
// this.props.getProducts('Routing')
//   // const information = window.location.pathname='/information'
//   console.log(window.location)
//   if(window.location.pathname=='/information'){
//     var info = true
//     // console.log(info, 'info')
//   }
//   else if(window.location.pathname=='/admin' ){
//     console.log('admin aya hy ry baba')
//     var adminAndCartOwner = true
//   }
  return (
    
        <div>
           <BrowserRouter>
            {/* <Navbar/> */}
            <Switch>
              <Route exact path='/' component={Login} />
              <PrivateRoute path='/user/dashboard/' component={Dashboard} />
            </Switch>
            {/* <Footer /> */}
           </BrowserRouter>    
        </div>
    )
 }
}

const mapStateToProps = (state) =>{
  // var array= Array.from(state.products.cartProducts)
  console.log("Reducer check cart prod.............", state.cartReducer.totalPrice)
  return{ 
      pathChecker: state.products.pathChecker,
     
  }
}

export default Routes