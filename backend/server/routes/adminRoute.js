const router = require('express').Router();
const { upload, wrapAsync } = require('../../util/util');
const { createEvent, getEvents, sellTickets, mintTickets, getTickets } = require('../controllers/adminController');

router.route('/createEvent').post( upload.single('eventImg'), wrapAsync(createEvent) );
router.route('/mintTickets').post( wrapAsync(mintTickets) );
router.route('/sellTickets').post( wrapAsync(sellTickets));

// admin?account={0x1234...}, all, search?keyword={keyword}
router.route(`/event/:category`).get(wrapAsync(getEvents));
router.route(`/ticket`).get(wrapAsync(getTickets));

module.exports = router;