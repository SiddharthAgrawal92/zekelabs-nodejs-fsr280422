const postsRoutes = require('express').Router();
const postsControllers = require('../controllers/posts.controllers');

//get all posts
postsRoutes.get('/', postsControllers.getAllPosts);

//create post
postsRoutes.post('/', postsControllers.createPost);

//delete post
postsRoutes.delete('/:postId', postsControllers.deletePost);


module.exports = postsRoutes;