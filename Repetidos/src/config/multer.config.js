const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../post_pics'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage,
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
    limits: {fileSize: 10000000}
}).single('image');