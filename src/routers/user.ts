import { getUsers, setUsers, getUserById, updateUser, updateUserAvatar } from "../controllers/user";



const router = require('express').Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', setUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router;