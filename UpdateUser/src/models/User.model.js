const {Schema, model} = require('mongoose');


let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    last_name: {
        type: String,
        required: true,
        minLength: 1
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/gm
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/,
        unique: true,
        required: true
    },
    user_type: {
        type: Number,
        min: 0,
        max: 1,
        required: true
    },
    user_status: {
        type: Number,
        min: 0,
        max: 2,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

},{
    timestamps: true,
    versionKey: false
});


module.exports = model('User', userSchema);