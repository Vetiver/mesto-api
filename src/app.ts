import path from 'path';
import userRouter from '../src/routers/user'
import cardRoter from '../src/routers/card'
import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mynewdb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', userRouter)
app.use('/cards', cardRoter)
app.use((_req: Request, res: Response, next: NextFunction) => {
  _req.user = {
    _id: '64bd9d60f57d0bfb8fc9ed94' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
}); 
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});