import card from '../models/card'
import user from '../models/user'
import { Router, Request, Response } from 'express';


const NotFoundError = require('../errors/errors');
const INTERNAL_SERVER_ERROR = require('../errors/errors');
export const getCards = (_req: Request, res: Response) => {
    return card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(NotFoundError).send({ message: 'Произошла ошибка' }));
  }

export const setCard = (_req: Request, res: Response) => {
    const { name, link } = _req.body;
    const id = _req.user._id;
    return card.create({ name, link, userId: id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(NotFoundError).send({ message: 'Произошла ошибка' }));
  }

export const deliteCard = (_req: Request, res: Response) => {
    const { _id } = _req.body;
    const userId = _req.user._id;
    card.findOne(_id)
    .then((card) => {
      if (!card) {
    res
    .status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемая карточка не найдена"})
        return;
      }
      if(userId == _id) {
        res.send({ data: card });
      }
      res
      .status(INTERNAL_SERVER_ERROR).send({ message: "Нет доступа к этой карточке"})
    })
    .catch(() => res.status(NotFoundError).send({ message: 'Произошла ошибка' }));
  }

export const setLike = (_req: Request, res: Response) => {
    const { _id } = _req.body;
    card.findByIdAndUpdate(_id,  
    { $addToSet: { likes: _req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
    ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
    res
    .status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемая карточка не найдена"})
        return;
      }
      res.send({ data: card });
    })
    .catch(() => res.status(NotFoundError).send({ message: 'Произошла ошибка' }));
  }

export const deliteLike = (_req: Request, res: Response) => {
    const { _id } = _req.body;
    card.findByIdAndUpdate(_id,  
    { $pull: { likes: _req.user._id } }, // убрать _id из массива
    { new: true },
    )
    .then((card) => {
      if (!card) {
    res
    .status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемая карточка не найдена"})
        return;
      }
      res.send({ data: card });
    })
    .catch(() => res.status(NotFoundError).send({ message: 'Произошла ошибка' }));
  }