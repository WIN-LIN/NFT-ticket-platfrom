const router = require('express').Router();
const { deployContract } = require('../controllers/adminController');

router.route('/deployContract').post( deployContract );
module.exports = router;