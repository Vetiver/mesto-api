import { getCards, setCard, deliteCard, setLike, deliteLike } from "../controllers/card";
const { celebrate, Joi } = require('celebrate');


const router = require('express').Router();

router.get('/', getCards);
router.delite('/:cardId',celebrate({
    body: Joi.object().keys({
        _id: Joi.string().required(),
    }),
  }), deliteCard);
router.post('/',celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }), setCard);
router.put('/:cardId/likes',celebrate({
    body: Joi.object().keys({
        _id: Joi.string().required(),
    }),
  }), setLike);
router.delite('/:cardId/likes',celebrate({
    body: Joi.object().keys({
        _id: Joi.string().required(),
    }),
  }), deliteLike);

export default router;