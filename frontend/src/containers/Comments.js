import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../css/comment.css'
import Loader from "react-loader-spinner";
import { commentPost } from '../actions/actions'; 
function Comments() {
    const [comment, setComment]=useState('')
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const {post, posts}= useSelector((state) => (state.posts)); 

   

     const message=()=>{
         return (<div className='post-detail-bottom-right-signin-message'>
             <p> You must sign in to be able to comment</p>
         </div>)
     }
    const dispatch = useDispatch()
   


    const handleSubmit =(event)=>{
        const finalComment=`${user.result.name?user.result.name:`${user.result.firstname} ${user.result.lastname}`}:${comment}`

       dispatch(commentPost(finalComment, post._id))
        event.preventDefault();

    }
    console.log("posts from comments", post)

    return (
        <div className='post-detail-bottom '>
            {post?<div className='post-detail-bottom-left'>
                      
              {post.comments?post.comments.map((item, index)=>{return(<Fragment> <div className='post-detail-top-left-p'><strong>{item.split(':')[0]  } : </strong><p>{item.split(':')[1]}</p> </div></Fragment> )}):null}

                       
                          </div>
                        :<Loader type='Oval'/>}

          
            <div className='post-detail-bottom-right'> 
            {user?
                <form className='comment-form' onSubmit={(e) => handleSubmit(e)} >
                    <div className="form-group-comment"> 
                            <label for="message">COMMENT</label>
                            <textarea id="message" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}  rows={15} cols={20}></textarea>
                    </div>
                    <div className='form-group-comment'>
                    <input type='submit' value='Send'></input>
                    </div>
                </form>:message()}
                </div>
            
            </div>
 
    )
}

export default Comments
