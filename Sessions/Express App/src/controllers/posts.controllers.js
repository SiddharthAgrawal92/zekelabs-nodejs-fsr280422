const Posts = require('../models/posts.model');

//method to get all posts
const getAllPosts = async (req, res) => {
    const postsList = await Posts.find({}).catch(err => {
        res.status(500).send({ error: 'Something went wrong. Please try again!' });
    });
    res.status(200).send({ postsList: postsList });
}

const createPost = async (req, res) => {
    const result = await Posts.create(req.body).catch(err => {
        res.status(500).send({ error: 'Something went wrong. Please try again!' });
    });
    const io = req.app.get('socket.io');
    //event is sent to sync the data in all connected clients
    io.emit('new-post', result);
    res.send({ post: result });
}

const deletePost = async (req, res) => {
    const result = await Posts.deleteOne({ _id: req.params.postId }).catch(err => {
        res.status(500).send({ error: 'Something went wrong. Please try again!' });
    });
    if (result.deletedCount) {
        const io = req.app.get('socket.io');
        //event is sent to sync the data in all connected clients
        io.emit('deleted-post', req.params.postId);
    }
    res.send({ msg: result });
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost
}

//we have 100 clients connected and all of them are managing a website
// some of them will be creating new posts --> emit/send an event using socket with the newly created entry
// while some of them will be deleting few posts --> emit/send an event using socket with the deleted entry
// and some are doing nothing only seeing the data

// consequence will be all the data will be synchronized as cleint will be listening to the events
// of create/delete post