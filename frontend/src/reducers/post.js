import { FETCH_ALL, CREATE_POST, LIKES,DELETE_POST,POST_ID,SEARCH_BY_QUERY,START_LOADING ,END_LOADING,COMMENT} from "../actions/types";



export default  function(state = {posts: [],isLoading:true },action){
    const{type, payload}=action
    console.log("type",type, "payload",payload)
    console.log("state", state)
   
 
    
    switch (type) {

        case START_LOADING:
            return { ...state, isLoading: true };
          case END_LOADING:
            return { ...state, isLoading: false };
        
        case FETCH_ALL:
            
          
            return  {...state, 
                posts:payload.data,
                lastIndex:payload.lastIndex,
                startIndex:payload.startIndex,
                next:payload.next,
                previous:payload.previous,
                actuel_page:payload.actuel_page
                      }
        
        case CREATE_POST:
    
     
            return {...state,posts:[...state.posts,payload]};
        case POST_ID:
            return {...state, post:payload};
        case LIKES:

        try { 
            
     
            return  {...state, posts:state.posts.map((post)=>(post._id==payload._id)?payload:post)}

        } catch (error) {
            return state
            
        }

        case COMMENT:

            try { 
              
         
                return  {...state, posts:state.posts.map((post)=>(post._id==payload._id)?payload:post),post:payload}
    
            } catch (error) {
                return state
                
            }
            
    
            
        case DELETE_POST:
            
            
            return {...state,posts:state.posts.filter((post)=>(post._id!==payload))}


        case SEARCH_BY_QUERY:
            return {...state,posts:payload}
           
        

        
           

        
    
        default:
            return state;
    }
}