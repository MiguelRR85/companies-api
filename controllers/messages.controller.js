const Message = require('../models/message.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.create = (req, res, next) => {
    const message = new Message(req.body);
  
    message.save()
      .then(message => res.status(201).json(message))
      .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    Message.find()
        .then(messages => res.json(messages))
        .catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  // Message.findByIdAndUpdate(req.params.id,{ $set: req.body })
  // .then(message => {
  //   if (!message) {
  //     throw createError(404, 'Message not found');
  //   } else {
  //     res.json(message);
  //   }
  // })
  // .catch(error => {
  //   next(error);
  // });
}

module.exports.delete = (req, res, next) => {
    Message.findOneAndDelete({_id: req.params.id})
    .then(message => {
      if (!message) {
        throw createError(404, 'Message not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}