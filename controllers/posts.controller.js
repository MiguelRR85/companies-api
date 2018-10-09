const Post = require('../models/post.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.create = (req, res, next) => {
    const post = new Post(req.body);
  
    post.save()
      .then(post => res.status(201).json(post))
      .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
    // Post.findByIdAndUpdate(req.params.id,{ $set: req.body })
    // .then(post => {
    //   if (!post) {
    //     throw createError(404, 'Post not found');
    //   } else {
    //     res.json(post);
    //   }
    // })
    // .catch(error => {
    //   next(error);
    // });
}

module.exports.delete = (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.id})
    .then(post => {
      if (!post) {
        throw createError(404, 'Post not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}