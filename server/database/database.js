import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){    
// _id -> id : mongoDB에서는 _id로 저장되고 정의되서, 읽을때는 id로 바꿔줘야함.
schema.virtual('id').get(function(){
    return this._id.toString();
  });
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});
  
}

// TODO(Hyemin) : Delete blow 
let db;

export function getPosts(){
    return db.collection('posts');
}