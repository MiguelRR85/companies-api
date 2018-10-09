const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'The company name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    logo:{
        type: String,
        required: 'The logo is required'
    },
    work: {
        type: String,
        required: 'A brief explanation of the work of your company is required'
    },
    suscriptors: {
        type:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ]
    },
    date: Date
}, { 
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;