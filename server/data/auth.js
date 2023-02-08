import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
//import MongoDb from 'mongodb';
//const ObjectId = MongoDb.ObjectId;

const userSchema = new Mongoose.Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  url: String,
});


useVirtualId(userSchema);

//모델 만들기
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username){
  return User.findOne({username});
}

export async function findById(id){
  return User.findById(id);
}

export async function createUser(user){
  return new User(user).save().then((data)=> data.id);
}
