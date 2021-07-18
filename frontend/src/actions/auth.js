import { LOGIN,SIGNUP,AUTH } from "./types";

import axios from "axios";

 const url= 'http://localhost:5000/auth'


 export const login= (loginData)=>async(dispatch)=>{
const loginPage='loginPage'
    try {
        const{ data}= await  axios.post(`${url}/${loginPage}`, loginData);
        dispatch({type:AUTH, payload:data})
        return data;
    } catch (error) {
        console.log("error from login", error.message)
    }
}


 export const register= (registerData)=>async(dispatch)=>{
    const registerPage='registerPage';
    try {
        const registerResponse= await  axios.post(`${url}/${registerPage}`, registerData);
        dispatch({type:SIGNUP, payload:registerResponse})
    } catch (error) {
        console.log("error from register", error)
    }




}