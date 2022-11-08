const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.virtual('password').set(function (value){
    return new Promise((res, rej)=>{
        bcrypt.hash(value, 10, (err, hash)=>{
            this.set({password_hash: hash}); 
            res();
        }) 
    });
     
});

module.exports = model('User', userSchema);