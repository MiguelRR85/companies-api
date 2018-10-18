
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The post name is required']
    },
    content: {
        type: String,
        required: 'The post content is required'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `Post needs an user`]
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: [true, `Post needs a company`]
    }
}, { 
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      if (!ret['comments']) {
        ret.comments = [];
      }  
      return ret;
    }
  }
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  options: { sort: { createdAt: -1 } }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;