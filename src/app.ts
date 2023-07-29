import path from 'path';
import userRouter from '../src/routers/user'
import cardRoter from '../src/routers/card'
import express from 'express';
import mongoose from 'mongoose';
import { requestLogger, errorLogger } from '../src/middlewares/log';
import errorSenter from '../src/middlewares/error'
const { errors } = require('celebrate');


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mynewdb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);
app.use('/users', userRouter)
app.use('/cards', cardRoter)
app.use(errorLogger);
app.use(errors());
app.use(errorSenter);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});