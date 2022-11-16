const {Schema, model, default: mongoose} = require('mongoose');

let postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500
    },
    status: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String
    }

},{
    timestamps: true,
    versionKey: false
});


module.exports = model('Post', postSchema);