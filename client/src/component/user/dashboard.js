import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import './style/dashboard.css'
import user from '../images/admin.png'
import db from '../images/db.png'
import u1 from '../images/u1.png'
import u2 from '../images/u2.png'
import u3 from '../images/u3.png'
import u4 from '../images/u4.png'
import u5 from '../images/u5.png'
import u6 from '../images/u6.png'
import u7 from '../images/u7.png'
import u8 from '../images/u8.png'
import u9 from '../images/u9.png'
import u10 from '../images/u10.png'
import bc from '../images/bc.png'
import UserDashboard from './userDashboard'
import Broadcast from './broadcast'
import Setting from './setting'

 class Dashboard extends Component{

  state={
    loading:true,
    email:'',
    show:false
  }

passwordToggle(e){
    e.preventDefault()
    this.setState({
        show:!this.state.show
    })
    console.log('hoa clck')
}

render(){
   
  return (
    
        <  >
           <BrowserRouter>
           <div className='row' id='topNavDash' >
              <div className='col-6' id='navLeft' >
                 <h2>Growth Mates</h2> 
              </div>
              <div className='col-6' id='navRight' style={{zIndex:'9'}} >
                  <h5  type="button" data-toggle="collapse" data-target="#collapseExample"
                   aria-expanded="false" aria-controls="collapseExample" > <img src={u1} width='50' height='50' /> </h5>

                  <div class="collapse" id="collapseExample">
                    <div class="" id='userInfo' >
                      <img src={u2} width='80' height='80' style={{marginTop:'20px'}} />
                      <h5 style={{textAlign:'center',color:'black',marginLeft:'20px'}}>Muhammad Arslan</h5>
                      <p>user2@gmail.com</p>
                      <div  id='manageSetting' >
                          <Link to='/user/setting' style={{textDecoration:'none',color:'black'}} >  <h6
                          data-toggle="collapse" data-target="#collapseExample"
                          aria-expanded="false" aria-controls="collapseExample"> Manage Your Account </h6> </Link>
                      </div>

                    <button 
                    // data-toggle="collapse" data-target="#collapseExample"
                    // aria-expanded="false" aria-controls="collapseExample"
                    style={{marginTop:'10vh',position:'relative',bottom:'0px'}} 
                    onClick={() => { this.props.history.push('/') } }
                    className='btn btn-info btn-block' > Sign out </button>

                    </div>
                  </div>
              </div>
           </div>

           <div className='row' >
              <div className='col-lg-4' id='dashTopLeft' >
              <div id='scroller' >
                <ul id='dashUl' >
                <Link style={{textDecoration:'none', color:'black'}} to='/user/dashboard' > <li>   <img src={db} width='40' height='40' style={{margin: '10px'}} /> Dashboard  </li> </Link>
                  <Link style={{textDecoration:'none', color:'black'}} to='/user/broadcast' > <li>  <img src={bc} width='40' height='40' style={{margin: '10px'}} /> Broadcast    <span id='innerLi' > 1 </span> </li> </Link> 
                  <Link style={{textDecoration:'none', color:'black'}} to='/user/broadcast' >  <li> <img src={user} width='40' height='40' style={{margin: '10px'}} /> user 1</li> </Link>
                  <li> <img src={u1} width='40' height='40' style={{margin: '10px'}} />user 2</li>
                  <li><img src={u2} width='40' height='40' style={{margin: '10px'}} /> user 3</li>
                  <li><img src={u3} width='40' height='40' style={{margin: '10px'}} /> user 4</li>
                  <li><img src={u4} width='40' height='40' style={{margin: '10px'}} /> user 5</li>
                  <li><img src={u5} width='40' height='40' style={{margin: '10px'}} /> user 6</li>
                  <li><img src={u6} width='40' height='40' style={{margin: '10px'}} />user 7</li>
                  <li><img src={u7} width='40' height='40' style={{margin: '10px'}} />user 8</li>
                  <li><img src={u8} width='40' height='40' style={{margin: '10px'}} />user 9</li>
                  <li><img src={u9} width='40' height='40' style={{margin: '10px'}} />user 10</li>
                </ul>
              </div>
              </div>
              <div className='col-lg-8' >
                  <Switch>
                    <Route path='/user/dashboard' exact component={UserDashboard} />
                    <Route exact path='/user/broadcast' component={Broadcast} />
                    <Route exact path='/user/setting' component={Setting} />
                  </Switch>
              </div>
           </div>
                </BrowserRouter>
        </>
    )
 }
}

// const mapStateToProps = (state) =>{
//   // var array= Array.from(state.products.cartProducts)
//   console.log("Reducer check cart prod.............", state.cartReducer.totalPrice)
//   return{ 
//       pathChecker: state.products.pathChecker,
     
//   }
// }

export default Dashboard