const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The company name is required'],
        unique: true
    },
    logo:{
        type: String,
        required: 'The logo is required'
    },
    description: {
        type: String,
        required: 'A brief explanation of the work of your company is required'
    },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, `Need User`]},
    suscriptors: {
        type:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ]
    }    
}, { 
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;