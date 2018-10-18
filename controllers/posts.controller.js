const Post = require('../models/post.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  
  Post.find({companyId: req.params.companyId})
    .then(posts => res.json(posts))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const post = new Post(req.body);
  post.userId = req.user._id;
  post.companyId = req.params.companyId;

  post.save()
    .then(post => res.status(201).json(post))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  console.info('PARAMS ----> ', req.params.postId);
  Post.findById(req.params.postId)
    .populate('userId') // DESPLIEGA EL ID EN UN OBEJTO 
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found');
      } else {
        console.log(post);
        const userEmail = post.userId.email;
        post.userId = post.userId.id;

        const data = post.toObject();
        data.userEmail = userEmail

        res.json(data);
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.delete = (req, res, next) => {
  Post.findOneAndDelete({ user: req.params.userId, _id: req.params.id })
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}
