const {Schema, model} = require('mongoose');

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/,
        unique: true,
        required: true
    },
    user_type: {
        type: Number,
        match: /^[0-1]$/gm
    },
    user_status: {
        type: Number,
        match: /^[0-2]$/gm
    },
    password_hash: String,
    image: String

},{
    timestamps: true,
    versionKey: false
});



module.exports = model('User', userSchema);