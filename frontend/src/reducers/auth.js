import {  AUTH,LOGOUT } from "../actions/types";



const authReducer =(state={authData:null}, action)=>{
    const {type, payload} =action
    console.log('type', type,'payload', payload)

    switch (type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.payload}) )
            return {...state, authData: action?.payload}

        case LOGOUT:
            localStorage.clear();
                
            return state
    
        default:
            return state;
    }


}

export default authReducer;
