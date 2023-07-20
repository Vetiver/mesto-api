import { model, Model, Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface ICard {
    name: string;
    link : string;
    owner: Object;
    likes:any,
    createdAt: string
  }

  const cardSchema = new Schema<ICard>({
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link : {
      type: String,
      required: true
    },
    owner: {
        type: Object,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
  });
  export default mongoose.model('card', cardSchema); 