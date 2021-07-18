import React,{useState, useEffect} from 'react'
import { Fragment } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose} from 'react-icons/gr'
import { Link, useHistory,useLocation } from 'react-router-dom';
import  '../css/navbar.css'
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../actions/types';



export default function Navbar() {
    const location=useLocation();
    const[clicked, setClicked]=useState(true)
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const[token, setToken]=useState(JSON.parse(localStorage.getItem('auth-token')))
    const history=useHistory()
    const dispatch= useDispatch();
     const handleClick=(e)=>{
         setClicked(!clicked)

     }

     useEffect(() => {
         const token=user?.token;
        
         //history.push('/')
         return ()=>{

         }
       
     }, [])


     const logoutHandler=()=>{
         dispatch({type:LOGOUT})
         setUser(null)
         setToken(null)
     }

    return (
    <nav class="navigatin-bar">
    <div class="navigation-bar-logo">
        Nodejs Science App
    </div>
    <div className={clicked?"navigation-bar-routes backing":"navigation-bar-routes forward"}>
        <Link style={{color:'white',textDecoration:'None'}} to="/">Home</Link>
       
        {user || token ?<Fragment> <Link style={{color:'white',textDecoration:'None'}} to="/form">Post</Link>  <Link style={{color:'white',textDecoration:'None', padding:'10px', backgroundColor:"#DB4437"}} onClick={logoutHandler}>Logout</Link></Fragment>: <Fragment><Link style={{color:'white',textDecoration:'None'}} to="/login">Login</Link>  <Link style={{color:'white',textDecoration:'None'}} to="/register">Register</Link></Fragment>}
    </div>
    <div className="navigation-bar-hamburgerbtn">
    {clicked?(<GiHamburgerMenu onClick={(e)=>{handleClick()}} style={{width:"100%",height:"100%"}}/>):(<GrClose onClick={(e)=>{handleClick()}} style={{width:"100%",height:"100%", color:"white"}}/>)}
    </div>
    </nav>
    )
}
