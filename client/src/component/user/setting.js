import React, { Component } from 'react';
import u1 from '../images/u1.png'


class Setting extends Component{
    render(){
        return(
            <>
            <div className='row' >
                <div className='col-12' >
                    <img src={u1} width='180' height='180' style={{margin:'30px'}} />
                </div>
                <div className='col-12' style={{marginLeft:'5vw'}} >
                 <form>
                    <div class="form-group" style={{width:'80%',textAlign:'left'}}>
                        <label  for="exampleInputname">Username</label>
                        <input type="name" style={{width:'100%'}} class="form-control" id="exampleInputname" aria-describedby="emailHelp" placeholder="User name"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group" style={{width:'80%',textAlign:'left'}}>
                        <label  for="exampleInputEmail1">Email address</label>
                        <input type="email" style={{width:'100%'}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group" style={{width:'100%',marginTop:'40px', textAlign:'left'}}>
                        <label for="exampleInputPassword1">Password</label>
                        <input style={{width:'80%',}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>             
                    <button style={{width:'80%',marginTop:'40px'}} type="submit" class="btn btn-info btn-block">Update  </button>
                 </form>
                </div>
            </div>   
            </>
        )
    }
}

export default Setting