import React, {Component,Lazy,Suspense} from 'react';
import {Redirect} from 'react-router-dom'
import './style/login.css'
import {loginUser} from '../actions/authActions'
import {connect} from 'react-redux'

 class Login extends Component{


  state={
    loading:false,
    email:'',
    show:false,
    isUser:false,
    password:'',
    auth:false
  }
onChange=e => this.setState({[e.target.name]:e.target.value})



componentDidMount(){
  if (this.props.auth.isAuthenticated) {
    console.log("Login Didmount Props", this.props)
  this.setState({
    auth: true
  })
  }

}

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated) {
      console.log("Login Props", this.props,nextProps)
    this.setState({
      auth: true,
      loading:false
    })
    }

}

passwordToggle(e){
    e.preventDefault()
    this.setState({
        show:!this.state.show
    })
    console.log('hoa clck')
}

onSubmit=(e)=>{
  
  e.preventDefault()
  const userData = {
    email: this.state.email,
    password: this.state.password
  };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

this.setState({
  loading:true,
  // auth:true
})
}


render(){
  console.log(this.state,'state')
    const {email,password} = this.state
    if(this.state.auth===true){
      return(

          <Redirect to='/user/dashboard' />
          )
  }
  return (
    
        <div style={{backgroundColor:'#e5ddd5'}} >
          <div id='topBanner' >
            <div id='loginInner' >
                <form onSubmit={this.onSubmit} >
                <h4 style={{marginBottom:'20px'}} >Login</h4>
                    <div class="form-group" style={{marginBottom:'40px'}}>
                        <label style={{float:'left'}}  for="exampleInputEmail1">Email address</label>
                        <input type="email" name='email' value={email} onChange={this.onChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group" style={{marginBottom:'40px',position:'relative'}}  >
                        <label style={{float:'left'}} for="exampleInputPassword1">Password</label>
                        <input type={!this.state.show? 'password' : 'text' }  
                         name='password' value={password} onChange={this.onChange} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                         <i onClick={this.passwordToggle.bind(this)} id='eye'
                         class={!this.state.show? 'fa fa-eye-slash': 'fa fa-eye' } 
                         style={{position:'absolute',top:'5.5vh',right:'10px', fontSize:'18px',cursor:'pointer'}}></i>
                    </div>

                    {this.props.errors? 
                      <div class="form-group" style={{marginBottom:'40px',position:'relative'}}  >
                        <p style={{color:'red'}} > {this.props.errors.emailnotfound? this.props.errors.emailnotfound : this.props.errors.passwordincorrect }   </p>
                        
                    </div> :void 0}
                   
                    <button type="submit" class="btn btn-primary btn-block"  > Submit  </button>
                </form>
            </div>
          </div>  
        </div>
    )
 }
}

const mapStateToProps = (state) =>{
  // var array= Array.from(state.products.cartProducts)
  console.log("Reducer check cart prod.............", state)
  return{ 
     auth:state.auth,
     errors:state.errors
  }
}

export default connect(
 mapStateToProps ,{loginUser}
)(Login)