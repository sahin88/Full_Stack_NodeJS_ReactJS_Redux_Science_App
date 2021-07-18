import React,{useState, useEffect ,Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getPost, deletePost,likesPost,getPostBySearch} from '../actions/actions'
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import '../css/home.css'
import moment from 'moment';
import { Redirect,useHistory } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { VscChromeClose } from "react-icons/vsc";
import {getPaginatedPost,getPostById} from '../actions/actions'
import Loader from "react-loader-spinner";
function Home(props) {  
const [newpost, setNewpost]=useState(true)
const [tags, setTags] = useState([])
const [tag, setTag] = useState('')
const [search, setSearch] = useState('');
const history=useHistory();
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(3);
const dispatch = useDispatch();
const { posts,isLoading} = useSelector((state) => state.posts);
const user= JSON.parse(localStorage.getItem('profile'))
console.log("user",user?.result)





    const handleDelete=(post_id)=>{
        dispatch(deletePost(post_id)).then((response)=>{<Redirect to='/'></Redirect>}).catch((error)=>{return(alert(error))})
  
    }
    const handleLikes=(post_id)=>{
        dispatch(likesPost(post_id))
          
    }
    const handleSeachChange = (e) => {
      setSearch(e.target.value)
    }
    const handleChange = (e) => {
      setTag(e.target.value)
    }
    const handleDeleteLabel = (item) => {
      let new_list = tags.filter((tag) => (tag !== item))
      setTags(new_list)
    }
    const handleSubmit = (event)=> {
      let  data={
        searchQuery:search,
        tags:tags
      }
       dispatch(getPostBySearch(data))
      event.preventDefault();
    }
    const keyHandleEvent = (event) => {
      if (event.key == 'Enter') {
        setTags([...tags, tag])
        setTag('')
        event.preventDefault();
      }
    }

    const handleRedirect =(id)=>{
        dispatch(getPostById(id));
        history.push(`/post/${id}`)

    }
    //user.result.familyName, user.result.givenName
  
    useEffect(() => {
        dispatch(getPaginatedPost(page, limit))
        return () => {
        }
      },[page])

      if (!isLoading &&!posts){
        return "There is no Data"
      }

    return (
    <div className='home-main-div'>
    <div className="post-div">
        {!isLoading?(posts.map((pst, index)=>{return(<div className="card"  key={index+1}><img src={pst.selectedFile} className="card-image" onClick={()=>(handleRedirect(pst._id))} />
                <div className="card-text">
                    <div className="card-text-tags">
                        {pst.tags?(pst.tags.map((tgs,index)=>{return(<p key={index+1} style={{opacity:'.8',marginBottom:"15px"}}>{`#${tgs}`}</p>)})):null}
                    </div>
                   <h3  style={{textTransform:'Uppercase', position:'absolute', top:'10px', color:'#DB4437'}}>{pst.title}+</h3>
          
                    <h4 style={{fontWeight:'lighter'}}>{pst.message.slice(0,100)}</h4>
                    <p style={{opacity:'.6',fontSize:'11px'}}> {moment(pst.createdAt).fromNow() }</p>                   
                </div>
                <div className="delet-like-section">
                  <button disabled={user?.result?false:true} disabled={user?.result._id!=pst.creator?false:true} onClick={()=> {handleDelete(pst._id)}}>DELETE <AiFillDelete style={{ color:'#ff0000'}}/></button>
                  <button disabled={user?.result?false:true} onClick={()=> {handleLikes(pst._id)}} ><AiFillLike style={{ color:'#4267b2'}} />LIKES {pst.likesCount.length}</button>
                </div>
            </div>
            )})):<Loader type="Oval" className='loader' color="#00BFFF" height={80} width={80}/>}
       
            </div>
            <div className='post-div-search'>
            <div className="search-pagination-division-label-section">
                    {tags.map((item, index) => {
                    return (<p className='chipinput-div'><h4>{item}</h4><button onClick={() => handleDeleteLabel(item)}><VscChromeClose /></button></p>)
                    })}
            </div>
            <div className="search-pagination-division" >
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className='form-group'>
                    <label>Tags Input</label>
                    <input type='text' value={tag} name='tag' onChange={(e) => (handleChange(e))} onKeyPress={(e) => (keyHandleEvent(e))}></input>
                    </div>
                    <div className='form-group'>
                    <label>Search Input</label>
                    <input type='text' value={search} name='search' onChange={(e) => (handleSeachChange(e))} ></input>
                    </div>
                    <div className='form-group'>
                    <input type='submit' value='Search'></input>
                    </div>
                </form>
                </div>
                <Pagination page={page} setPage={setPage} />

            </div>
            </div>
    )
}



  
  
  

  export default (Home);