import express from 'express';
import {
    getUsers,
    postUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', postUser);
router.get ('/', getUsers);

export default router;