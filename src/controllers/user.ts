import user from '../models/user'
import { Router, Request, Response } from 'express';

export const getUsers = (_req: Request, res: Response) => {
    return user.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  }

export const setUsers = (_req: Request, res: Response) => {
    const { name, about, avatar } = _req.body;
    return user.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  }

export const getUserById = (_req: Request, res: Response) => {
    const { _id } = _req.body;
    user.findById(_id)
    .then((user) => {
      if (!user) {
    res.status(404).send({ message: "Запрашиваемый пользователь не найден"})
    return;
    
  }
      
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: "Запрашиваемый пользователь не найден"}));
  }

export const updateUser = (_req: Request, res: Response) => {
    const { name, about, _id } = _req.body;
    user.findByIdAndUpdate(_id, {name, about}, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Запрашиваемый пользователь не найден"}));
  }

export const updateUserAvatar = (_req: Request, res: Response) => {
    const { avatar, _id } = _req.body;
    user.findByIdAndUpdate(_id, {avatar}, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Запрашиваемый пользователь не найден" }));
  }

