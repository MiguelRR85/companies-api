const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    const user = new User(req.body);
    console.log("FILE=>>>>>>>>", req.file);
     if(req.file){
        user.avatar = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
     }
    user.save()
      .then(user => res.status(201).json(user))
      .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          throw createError(404, 'User not found');
        } else {
          res.json(user);
        }
      })
      .catch(error => {
        next(error);
      });
  }

  module.exports.delete = (req, res, next) => {
    User.findOneAndDelete({_id: req.params.id})
      .then(user => {
        if (!user) {
          throw createError(404, 'User not found');
        } else {
          res.status(204).json();
        }
      })
      .catch(error => next(error));
  }