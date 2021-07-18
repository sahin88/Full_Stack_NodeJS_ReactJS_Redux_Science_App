import React, { useState } from 'react'
import '../css/form.css'
import {GoogleLogin} from 'react-google-login';
 import { FaGoogle } from 'react-icons/fa'
 import {useDispatch} from 'react-redux'
import { AUTH } from '../actions/types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {login } from '../actions/auth';

export default function Login() {
const [formData, setFormData]=useState({email:'',password:''})
const history=useHistory();
 const dispatch = useDispatch()

    const googleFailure=(error)=>{

    }

    const googleSuccess=async (res)=>{
        const result=res?.profileObj;
        const token=res?.tokenObj;
        dispatch({type:AUTH, payload:{result,token}});
        history.push('/login')
      
    }

const handleLogin=async(event)=>{
    
  
    dispatch(login(formData))
    event.preventDefault();

}
    return (<div className="form-division">
        <form className="division-section-form" onSubmit={handleLogin} method="POST">
            <div className="division-section-form-inner">
                <div className="form-group">
                    <label for="title">Email</label>
                    <input type="email" id ='email' name='email' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="Email"/>
                </div>
                <div className="form-group"> 
                    <label for="content">Password</label>
                    <input type="text" id ='title' name='password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} placeholder="Password"/>
                </div>

                <div className="form-group"> 
                    <input type="submit" value="Send"/>
                </div>
                <div className="form-group"> 
                    <GoogleLogin clientId='70106089079-lf8jb17lc2bgt93l4t6o3qqfvdd7ns44.apps.googleusercontent.com' render={(renderProps)=>(<button className='google-button'
                    type="button" 
                    style={{backgroundColor:"#DB4437"}}
                    disabled={renderProps.disabled}
                     
                    onClick={renderProps.onClick}
                     ><FaGoogle  style={{position:'relative',top:'3px', right:'10px'}}/> Google Auth</button>)
                     
                     }
                     onSuccess={googleSuccess}
                     onFailure={googleFailure}
                     ></GoogleLogin>
                </div>
            </div>


        </form>
    </div>)
}
