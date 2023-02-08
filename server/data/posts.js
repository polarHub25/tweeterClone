import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const postSchema = new Mongoose.Schema({
    text: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    url: String,
  }, 
  {timestamps: true});

useVirtualId(postSchema);
const Post = Mongoose.model('Post', postSchema);

export async function getAll(){
   return Post.find().sort({createdAt: -1});
}

export async function getAllByUsername(username){
    return Post.find({username}).sort({createdAt: -1});
}

export async function getById(id){
    return Post.findById(id);
}

export async function create(text, userId){
    return userRepository.findById(userId)
    .then((user) =>
    new Post({
        text,
        userId,
        name: user.name,
        username: user.username,
    }).save()
    );
}

export async function update(id, text){
   return Post.findByIdAndUpdate(id, {text}, {returnOriginal: false});
}

export async function remove(id){
    return Post.findByIdAndDelete(id);
}