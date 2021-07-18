import express from 'express';
import { getPost, createPost,deletePost, likesPost ,getPaginatedPost,getPaginatedResult,getPostById,getPostBySearch,commentPost} from '../controller/postController.js'
import verifyToken from "../middleware/verfiyToken.js";
const router = express.Router();

router.get('/', getPost)
router.get('/search',getPostBySearch)
router.get('/pagination',getPaginatedResult, getPaginatedPost)
router.post('/',verifyToken, createPost)
router.delete('/:id',verifyToken,deletePost )
router.get('/:id',getPostById )
router.patch('/likes/:id',verifyToken,likesPost)
router.patch('/comments/:id',commentPost)




export default router;