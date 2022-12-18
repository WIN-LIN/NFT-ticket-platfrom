require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // post image should be the last one or you can not get the rest of req.body
            const eventName = req.body.eventName;
            const imagePath = path.join(__dirname, `../../frontend/public/events/${eventName}`);
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath);
            }
            cb(null, imagePath);
        },
        filename: (req, file, cb) => {
            const customFileName = crypto.randomBytes(18).toString('hex').substr(0, 8);
            const fileExtension = file.mimetype.split('/')[1]; // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
        },
        limits: {
            fileSize: 10000000, // 10MB
        },
    }),
});

// reference: https://thecodebarbarian.com/80-20-guide-to-express-error-handling
const wrapAsync = (fn) => {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

module.exports = {
    upload,
    wrapAsync,
}