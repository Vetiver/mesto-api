import { model, Model, Schema, Document } from 'mongoose';
import mongoose from 'mongoose';
export interface IUser {
    name: string;
    about: string;
    avatar: string;
  }

  const userSchema = new Schema<IUser>({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
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