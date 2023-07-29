import extractBearerToken from '../middlewares/auth';
import { getUsers, createUser, getUserById, updateUser, updateUserAvatar, getUser, login } from "../controllers/user";
const { celebrate, Joi } = require('celebrate');



const router = require('express').Router();

router.post('/signup',celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }), createUser);
router.post('/signin',celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
  }), login);
router.get('/:userId', getUserById);
router.get('/', getUsers);
router.get('/me', getUser);
router.use(extractBearerToken);
router.patch('/me',celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(200),
      _id: Joi.string().required()
    }),
  }), updateUser);
router.patch('/me/avatar',celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
      _id: Joi.string().required()
    }),
  }), updateUserAvatar);


export default router;