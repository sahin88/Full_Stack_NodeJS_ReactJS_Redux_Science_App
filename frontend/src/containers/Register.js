import React, { useState } from 'react'
import { useDispatch}  from 'react-redux';
import {register} from '../actions/auth';
import { SIGNUP } from '../actions/types'
function Register() {

const  [formData, setFormData]=useState({firstname:'', lastname:'', email:'',password:'', re_password:''})
const dispatch = useDispatch()

const submitHandler=(event)=>{

    event.preventDefault();
    console.log("formData",formData)
    dispatch(register(formData))


    console.log(formData)

}
    
    return (
        <div  className='form-division'>
                        <form className="division-section-form"  onSubmit={submitHandler} method="POST">
                <div className="division-section-form-inner">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id ='email' name='email' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="Email"/>
                </div>
                <div className="form-group"> 
                    <label for="firstname">Firstname</label>
                    <input type="text" id ='firstname' name='firstname' value={formData.firstname} onChange={(e)=>setFormData({...formData,firstname:e.target.value})}  placeholder="First Name"/>

                </div>
                <div className="form-group"> 
                    <label for="lastname">Lastname</label>
                    <input type="text" id ='lastname' name='lastname' value={formData.lastname} onChange={(e)=>setFormData({...formData,lastname:e.target.value})}  placeholder="Last Name"/>
                </div>
                <div className="form-group"> 
                    <label for="password">Password</label>
                    <input type="text" id ='password' name='password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}  placeholder="Password"/>

                </div>
             
                <div class="form-group"> 
                    <label for="re_password">Re-Password</label>
                    <input type="text" id ='re_password' name='re_password' value={formData.re_password} onChange={(e)=>setFormData({...formData,re_password:e.target.value})}  placeholder="Re-Password"/>

                </div>

                <div className="form-group"> 
                    <input type="submit" value="Send"/>
                </div>
                <input type="hidden" name="error" id='error_id' className="error_variable" value="<%= message %>"/>
            </div>
            </form>
            
        </div>
    )
}

export default Register
