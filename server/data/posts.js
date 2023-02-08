import { getPosts } from '../database/database.js';
import * as userRepository from './auth.js';
import MongoDb from 'mongodb';
const ObjectId = MongoDb.ObjectId;

export async function getAll(){
    return getPosts()
    .find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapPosts);
}

export async function getAllByUsername(username){
    return getPosts()
    .find({username})
    .sort({createdAt: -1})
    .toArray()
    .then(mapPosts);
}

export async function getById(id){
    return getPosts()
    .findOne({_id: new ObjectId(id)})
    .then(mapOptionalPost);
}

export async function create(text, userId){
    const {name, username, url } = await userRepository.findById(userId);
    const post = {
        text,
        createdAt: new Date(),
        userId,
        name: name,
        username: username,
        url: url,
    };
    return getPosts()
    .insertOne(post)
    .then((data) => {
        const newPost = mapOptionalPost({...post, _id: data.insertedId});
        console.log(newPost);
        return newPost;
    })
}

export async function update(id, text){
   return getPosts()
   .findOneAndUpdate(
    {_id: new ObjectId(id)},
    { $set: {text}},
    { returnDocument: 'after'} //이걸 명시하지않으면 수정 이전에 해당하는 객체를 받아옴
   )
   .then(result => result.value)
   .then(mapOptionalPost);
}

export async function remove(id){
    return getPosts().deleteOne({_id: new ObjectId(id)});
}

function mapOptionalPost(post){
    return post ? {...post, id: post._id.toString()} : post; 
}

function mapPosts(posts){
    return posts.map((post) => mapOptionalPost(post));
}