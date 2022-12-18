const router = require('express').Router();
const { upload, wrapAsync} = require('../../util/util');
const { createEvent } = require('../controllers/adminController');

router.route('/createEvent').post( upload.single('eventImg'), wrapAsync(createEvent) );

module.exports = router;