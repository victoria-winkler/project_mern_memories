import express from 'express';

import {signIn, signUp } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signIn)  //POST -> sends information to the back end - and the backend can do stuff based on it
router.post('/signup', signUp)

export default router;