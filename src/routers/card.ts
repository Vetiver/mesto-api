import { getCards, setCard, deliteCard, setLike, deliteLike } from "../controllers/card";



const router = require('express').Router();

router.get('/', getCards);
router.delite('/:cardId', deliteCard);
router.post('/', setCard);
router.put('/:cardId/likes', setLike);
router.delite('/:cardId/likes', deliteLike);

export default router;