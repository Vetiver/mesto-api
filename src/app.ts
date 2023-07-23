import path from 'path';
import { Router, Request, Response } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import user from '../src/models/user'

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mynewdb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/users', (_req: Request, res: Response) => {
    return user.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  });
  app.post('/users', (_req: Request, res: Response) => {
    const { name, about, avatar } = _req.body;
    return user.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  });
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});