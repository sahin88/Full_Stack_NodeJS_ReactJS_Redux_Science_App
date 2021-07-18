import React, {useState, useEffect} from 'react';
import '../css/form.css'
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux'
import {createPost} from '../actions/actions'
import { Redirect, useHistory } from'react-router-dom';

function Form() {
   const dispatch = useDispatch()

   const history=useHistory();
   const [submit, setSubmit]=useState(false);
        const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
useEffect(() => {

        if(submit){
                history.push('/');
                window.location.reload()
                setSubmit(false)
        }
        
        return () => {
                
        }
}, [submit])

    const clear = () => {
  
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };
    const handleSubmit =(event)=>{

     
    dispatch(createPost(postData))
    setSubmit(true)

    }
 

    return (
        
        <div className="form-division">
                {submit?<Redirect to='/'/>:null}
          <form  id='form' className="division-section-form" onSubmit={(e)=>handleSubmit(e)}>
          <div className="division-section-form-inner">
                {/* <div class="form-group">
                        <label for="creator">Creator</label>
                        <input type="text" id ='creator' name='creator' value={postData.creator} onChange={(e)=>setPostData({...postData, creator:e.target.value})} placeholder="Creator"/>
                </div> */}
                <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" id ='title' name='title' value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}  placeholder="Title"/>
                </div>

                <div class="form-group">
                        <label for="tags">Tags</label>
                        <input type="text" id ='tags' name='tags' value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})} placeholder="Tags(coma seperated)"/>
                </div>
                <div className="form-group"> 
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <div className="form-group"> 
                            <label for="message">Message</label>
                            <textarea id="message" name="message" value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}  rows="10" cols="10"></textarea>

                </div>
                <div className="form-group"> 
                            <input type="submit" on value="Send"/>
                </div>
                <div className="form-group"> 
                            <input type="button" onClick={(e)=>{clear()}} value="Clear"/>
                </div>

        
        </div>
        </form>

     
  
            
        </div>
    )
}

export default Form;
