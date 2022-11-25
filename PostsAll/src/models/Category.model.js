const {Schema, model} = require('mongoose');

let categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 1,
        maxLength: 50
    }

},{
    timestamps: true,
    versionKey: false
});


module.exports = model('Category', categorySchema);