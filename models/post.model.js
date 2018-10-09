const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    post: {
        type: String,
        required: [true, 'The post is required']
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    companyId:{type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    date: Date
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;      
            return ret;
        }
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;