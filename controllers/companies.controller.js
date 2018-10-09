const Company = require('../models/company.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  Company.find()
    .then(companies => res.json(companies))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    const company = new Company(req.body);
  
    company.save()
      .then(company => res.status(201).json(company))
      .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    Company.findById(req.params.id)
      .then(company => {
        if (!company) {
          throw createError(404, 'Company not found');
        } else {
          res.json(company);
        }
      })
      .catch(error => {
        next(error);
      });
  }

  module.exports.delete = (req, res, next) => {
    Company.findOneAndDelete({_id: req.params.id})
      .then(company => {
        if (!company) {
          throw createError(404, 'Company not found');
        } else {
          res.status(204).json();
        }
      })
      .catch(error => next(error));
  }