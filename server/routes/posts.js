import express from 'express';

import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

//MIDDLEWARE
import auth from '../middleware/auth.js';       //is added to each action which requires login and also adds "content" to the following methods -> req of likePost has access to res of auth


const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;