import user from '../models/user'
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const NotFoundError = require('../errors/errors');
const INTERNAL_SERVER_ERROR = require('../errors/errors');
const BAD_REQUEST = require('../errors/errors');
export const getUsers = (_req: Request, res: Response) => {
    return user.find({})
    .then((user:any) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  }

export const createUser = (_req: Request, res: Response) => {
    const { name, about, avatar, email, password } = _req.body;
    return bcrypt.hash(password, 10)
    .then((hash: string) => user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // return user.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
  }

  export const login = (_req: Request, res: Response) => {
    const { email, password } = _req.body;

    return user.findUserByCredentials(email, password)
      .then((user:any) => {
        res.send({
          token: jwt.sign({ _id: user._id }, 'super-strong-secret'),
        });
      })
      .catch((err:any) => {
        res
          .status(BAD_REQUEST)
          .send({ message: err.message });
      });

  }

  export const getUser = (_req: Request,res: Response) => {
    const userId = _req.user;
    user.findById(userId).select('+password')
      .then((user) => {
        if (!user) {
          res.status(NotFoundError).send({ message: "Запрашиваемый пользователь не найден"})
          return
        }
        res.send({data: user});
      })
  
      .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемый пользователь не найден" }));
  };

export const getUserById = (_req: Request, res: Response) => {
    const { _id } = _req.body;
    user.findById(_id)
    .then((user:any) => {
      if (!user) {
    res.status(NotFoundError).send({ message: "Запрашиваемый пользователь не найден"})
    return;
    
  }
      
      res.send({ data: user });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемый пользователь не найден"}));
  }

export const updateUser = (_req: Request, res: Response) => {
    const { name, about, _id } = _req.body;
    user.findByIdAndUpdate(_id, {name, about}, { new: true, runValidators: true })
    .then((user:any) => res.send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемый пользователь не найден"}));
  }

export const updateUserAvatar = (_req: Request, res: Response) => {
    const { avatar, _id } = _req.body;
    user.findByIdAndUpdate(_id, {avatar}, { new: true, runValidators: true })
    .then((user:any) => res.send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: "Запрашиваемый пользователь не найден" }));
  }

