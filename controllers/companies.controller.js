const Company = require('../models/company.model');
const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  Company.find()
    .then(companies => res.json(companies))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    const newCompany = new Company(req.body);
    console.info('USUARIO -> ', req.user)
    console.info('COMPANY --> ', req.body)
    newCompany.userId = req.user.id;
    
    Company.findOne({userId:req.user.id})
        .then(company => {
          if(!company){
            console.info("Company1 ==>", newCompany);
            newCompany.save()
              .then(company => {
                console.info("Company2 ==>",company)
                console.info('Success creating new company!')
                res.status(201).json(company) 
                User.findByIdAndUpdate(req.user.id, { $set: {companyRole: "Admin", company: company.id }})
                    .then()
                    .catch(error => next(error))  
              })
              .catch(error => next(error));
          } else {
            throw createError(404, 'you can only create one company');
          }
        })
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