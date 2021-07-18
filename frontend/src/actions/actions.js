import { FETCH_ALL, CREATE_POST,DELETE_POST,UPDATE_POST, LIKES,POST_ID,SEARCH_BY_QUERY,START_LOADING, END_LOADING,COMMENT } from "./types";
import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }

//   return req;
// });

export const getPost =()=> async(dispatch)=>{
    try {

        const {data} = await axios.get(`http://localhost:5000/posts`)
     
        dispatch({ type:FETCH_ALL, payload:data})
        
        
    } catch (error) {
        console.log("error", error)
        
    }
}


export const getPaginatedPost =(page, limit)=> async(dispatch)=>{
 
    try {
        dispatch({type:START_LOADING})
        const {data: {data,lastIndex, startIndex,actuel_page,next,previous} } = await axios.get(`http://localhost:5000/posts/pagination?page=${page}&limit=${limit}`)

        dispatch({ type:FETCH_ALL, payload:{data,lastIndex,startIndex,next,previous,actuel_page}});
        dispatch({ type: END_LOADING });
        return data
        
        
    } catch (error) {
        console.log("error", error)
        
    }
}


export const getPostById =(page_id)=> async(dispatch)=>{
 
    try {
        const{ data }= await axios.get(`http://localhost:5000/posts/${page_id}`)
        dispatch({ type:POST_ID, payload:data})
    } catch (error) {
        console.log("error", error)
        
    }
}


export const getPostBySearch =(searchQuery)=> async(dispatch)=>{
    try {
        const {data}= await axios.get(`http://localhost:5000/posts/search?searchQuery=${searchQuery.searchQuery||null}&tags=${searchQuery.tags}`)
        dispatch({type:SEARCH_BY_QUERY,payload:data}) 
    } catch (error) {
        console.log("error", error)
        
    }
}



export const createPost =(newpost)=> async(dispatch)=>{
  
    const user= JSON.parse(localStorage.getItem('profile'));
    let token;
    
    if (user.result.googleId){

        token=user.token.id_token  
    }


    else{
        token=user.token
    }

    const  sendToken={
        'Content-Type': 'application/json',
        'authorization': `Bearer JWT ${token}`,
        'Accept': 'application/json'
    }



    try {

        const {data} = await axios.post(`http://localhost:5000/posts`,{sendToken, newpost})
      
        dispatch({ type:CREATE_POST, payload:data})
       
        
    } catch (error) {
     
        console.log("error", error)
        
    }
}


export const deletePost =(post_id)=> async(dispatch)=>{


    const user= JSON.parse(localStorage.getItem('profile'));
    let token;
    
    if (user.result.googleId){
        token=user.token.id_token  
    }
    else{
        token=user.token
    }


    const  sendToken={
        'Content-Type': 'application/json',
        'authorization': `Bearer JWT ${token}`,
        'Accept': 'application/json'
    }


    try {

        const data = await axios.delete(`http://localhost:5000/posts/${post_id}`, {
            headers: {
              Authorization: token
            },
            data: {
              sendToken: sendToken
            }
          })
        
        dispatch({ type:DELETE_POST, payload:post_id})
        
    } catch (error) {
        console.log("error", error)
        
    }
}


export const likesPost=(post_id)=> async(dispatch)=>{
    const user= JSON.parse(localStorage.getItem('profile'));
    let token;
    
    if (user.result.googleId){
       
        token=user.token.id_token
        
        
    }
    else{
        token=user.token
    }


       const  sendToken={
            'Content-Type': 'application/json',
            'authorization': `Bearer JWT ${token}`,
            'Accept': 'application/json'
        }

    try {
        const {data}= await axios.patch(`http://localhost:5000/posts/likes/${post_id}`,{sendToken}) 
        dispatch({type:LIKES,payload:data})
        
    } catch (error) {
        console.log("error", error)
        
    }
}

export const commentPost=(commentData, post_id)=>async(dispatch)=>{
    const user= JSON.parse(localStorage.getItem('profile'));
    let token;
    
    if (user.result.googleId){
        token=user.token.id_token
        
        
    }
    else{
        token=user.token
    }


       const  sendToken={
            'Content-Type': 'application/json',
            'authorization': `Bearer JWT ${token}`,
            'Accept': 'application/json'
        }
    try {
        const {data}= await axios.patch(`http://localhost:5000/posts/comments/${post_id}`,{sendToken, commentData})
        dispatch({type:COMMENT, payload:data})
        return data.comments
    } catch (error) {

        console.log("error", error)
        
    }
}