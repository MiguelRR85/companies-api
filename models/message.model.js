const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'The email is required']
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
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

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;