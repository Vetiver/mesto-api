import { model, Model, Schema, Document } from 'mongoose';
import mongoose from 'mongoose';
import validator from 'validator';
export interface IUser {
    email: string;
    about: string;
    avatar: string;
  }

  const userSchema = new Schema<IUser>({
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 30,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Неправильный формат почты'
      }
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: true
    },
    avatar: {
        type: String,
        required: true
      }
  });
  export default mongoose.model('user', userSchema); 