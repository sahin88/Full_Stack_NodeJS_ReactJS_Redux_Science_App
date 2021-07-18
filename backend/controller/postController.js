import PostMessage from "../model/postMessage.js"
import mongoose from 'mongoose';

export const getPost = async (req, res) => {

    try {

        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}
export const getPostById = async (req, res) => {

    try {

        const { id }=req.params

        if (!mongoose.Types.ObjectId.isValid( id )) return res.status(404).send(`No post with id: ${id}`);

        const postMessage= await PostMessage.findById(id);

         
        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}

export const getPostBySearch =async(req,res)=>{

    const {searchQuery, tags}=req.query

    try {
        const title= new RegExp(searchQuery,'i')
        const postMessage= await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]})
        res.status(200).json(postMessage)
        
    } catch (error) {
        res.status(404).json({message:eror.message})
        
    }
}

export const getPaginatedPost = async(req, res)=>{
    try {
        res.status(200).json({data:res.data,actuel_page:res.actuel_page,lastIndex:res.lastIndex,startIndex:res.startIndex,next:res.next,previousres:res.previous})
    } catch (error) {
        res.status(404).json({message:eror.message})
        
    }
    

}

async  function getPaginationValues(actual_page,total_page, limit){
    let startIndex=1
    let lastIndex=null
 
    if(actual_page-limit<=0){
        startIndex=1
    }
    else{
        startIndex=actual_page-limit

    }
    if ((actual_page+limit)>total_page){
        lastIndex=total_page
    }
    else{
        lastIndex=actual_page+limit
    }
    return{'startIndex':startIndex,'lastIndex':lastIndex}

}


export const getPaginatedResult=async(req,res,next)=>{
    const actuel_page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const startIndex=(actuel_page-1)*limit
    const lastIndex=actuel_page*limit
    const totalIndex= await PostMessage.countDocuments({})
    let total_page= Math.ceil(totalIndex/limit)
    let response=await getPaginationValues(actuel_page,total_page,limit)
  
    if (actuel_page>1){
        res.previous=actuel_page-1
    }
    if (actuel_page< total_page){
        res.next=actuel_page+1
    }
    res.data= await PostMessage.find().sort({createdAt:-1}).limit(limit).skip(startIndex).exec()
    res.actuel_page=actuel_page
    res.lastIndex=response.lastIndex
    res.startIndex=response.startIndex
    next()
}


export const createPost = async (req, res) => {

    const { newpost} = req.body;
    console.log("posttt", newpost)
   

    const responsePost = new PostMessage({...newpost,creator:String(req.userId)});
    try {
       let elcevap= await responsePost.save()
        res.status(200).json(newpost);
    } catch (error) {
        console.log(error )
        res.status(409).json({ message: error.message })

    }

}

export const deletePost = async (req, res) => {

    const { id }=req.params

    if (!mongoose.Types.ObjectId.isValid( id )) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
   
}

export const likesPost= async(req, res)=>{
    if(!req.userId){
        return res.status(404).json({message:"user is not authenticated"})
    }
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data has been found with id :${id}`)
    try {
        const post = await PostMessage.findById(id) 
        const index= post.likesCount.findIndex((id)=>id===String(req.userId))
        if(index===-1){
            post.likesCount.push(req.userId)
        }
        else{
            post.likesCount=post.likesCount.filter((id)=>id!=String(req.userId))
        }

        const response = await PostMessage.findByIdAndUpdate(id,post,{new:true})
        return res.json(response)
        
    } catch (error) {
        console.log(error)
        
        return res.staus(404).json({message:error.message})
        
    }
   

}

export const commentPost= async(req, res)=>{
    const {id}=req.params
   const {commentData}=req.body 

    try {
    const post = await PostMessage.findById(id)   
    post.comments.push(commentData)
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    return res.status(200).json(updatedPost)   
    } catch (error) {
        console.log("error",error)
        
    }
    
}