
import { getUsers, createUser, getUserById, updateUser, updateUserAvatar } from "../controllers/user";




const router = require('express').Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router;