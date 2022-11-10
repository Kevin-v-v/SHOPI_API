const {Schema, model} = require('mongoose');

let postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    status: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true
    }

},{
    timestamps: true,
    versionKey: false
});


module.exports = model('Post', postSchema);