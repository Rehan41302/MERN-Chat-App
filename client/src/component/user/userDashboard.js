import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch} from 'react-router-dom'
import grp from '../images/grp.png'
import nmsg from '../images/nmsg.png'
import ntsk from '../images/ntsk.png'
import ptsk from '../images/ptsk.png'
import stpc from '../images/stpc.png'
import './style/userDashboard.css'


 class UserDashboard extends Component{

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
        <h2  style={{marginTop:'20px',textAlign:'left'}}>  Recent </h2>
         <div className='row' style={{marginTop:'10px'}}>
             <div className='col-lg-3' id='first'  >
                <div id='finner' >
                    <h4><img src={nmsg} width='50' height='55' style={{paddingBottom:'10px'}} /> New Message </h4>
                   <br/><br/>
                </div>  
             </div>
             <div className='col-lg-3' id='secnd' >
                 <div id='sinner' >
                    <h4><img src={ntsk} width='50' height='55' style={{paddingBottom:'5px'}} /> New Task</h4>
                </div> 
             </div>
             <div className='col-lg-3' id='third'>
                  <div id='tinner' >
                    <h5> <img src={ptsk} width='50' height='50' style={{paddingBottom:'5px'}} /> Pending Task   </h5>
                </div> 
             </div>
         </div>

         <h2  style={{marginTop:'30px',textAlign:'left'}}>  Activity </h2>
         <div className='row' style={{marginTop:'10px'}}>
             <div className='col-lg-3' id='first1' >
                <div id='finner' >
                    <h4> <img src={grp} width='50' height='50' /> Create Group </h4><br/>
                   
                </div>  
             </div>
             <div className='col-lg-3' id='secnd1' >
                 <div id='sinner' >
                    <h5 style={{marginTop:'13px'}} ><img src={stpc} width='50' height='50' /> Start Any Topic </h5>
                </div> 
             </div>
             <div className='col-lg-3' id='third1'>
                  <div id='tinner' >
                    <h4 style={{marginTop:'10px',marginLeft:'-30px'}}> <img src={grp} width='50' height='50' /> Review </h4>
                </div> 
             </div>
         </div>
        </>
    )
 }
}



export default UserDashboard