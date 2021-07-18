import React, {useEffect,Fragment} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import '../css/post_detail.css'
import {useParams,useHistory} from 'react-router-dom';
import {getPostById } from '../actions/actions'
import moment from 'moment';
import Loader from "react-loader-spinner";
import Comments from './Comments';
function PostDetail(props) {
    console.log("postdetail", props)
  
    const dispatch = useDispatch();
    const { id} =useParams()
    useEffect(() => {
        dispatch(getPostById(id))
        return () => {
           
        }
    }, [id])
    var {post}= useSelector((state) => (state.posts));
    console.log("post from post detail", post)


    return (
     
    <Fragment>
        {post?( <div className='post-detail'><div className='post-detail-top'>
                    <div className='post-detail-top-left'>
                        <div className='post-detail-top-left-p'>
                            <strong>Tags      : </strong> {post.tags&&post.tags? post.tags.map((item, index)=>{return(<p>  #{item}</p>  )}):null}
                        </div>
                        <div className='post-detail-top-left-p'>
                                <strong>Creator      : </strong> <p>{post.creator}</p>
                        </div>
                        <div className='post-detail-top-left-p'>
                                <strong>createdAt      : </strong> <p>{moment(post.createdAt).fromNow()}</p>
                        </div>
                        <div className='post-detail-top-left-p'>
                    <strong>Message     : </strong> <p>{post.message}</p> </div>

                    </div>
            
                    <div className='post-detail-top-right'>
                        <img className='post-detail-top-right-image' src={post?post.selectedFile:null}></img>
                    </div>
            
            </div>
            <Comments/>
            </div>
            
            ):(<Loader type='Oval' style={{ position:'relative',top:'400px', left:'50%', translate:'(-50%,-50%)'}}/>)}
            
               

         
            </Fragment>
           
             

    )
}

export default PostDetail
