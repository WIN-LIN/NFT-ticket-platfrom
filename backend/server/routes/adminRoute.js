const router = require('express').Router();
const { upload, wrapAsync} = require('../../util/util');
const { createEvent, getEvents } = require('../controllers/adminController');

router.route('/createEvent').post( upload.single('eventImg'), wrapAsync(createEvent) );

// admin?account={0x1234...}, all, search?keyword={keyword}
router.route(`/event/:category`).get(wrapAsync(getEvents));

module.exports = router;