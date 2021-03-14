const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/me', controller.getCurrentUser); // obtaining info about me

router.patch('/me'); // update user info

module.exports = router;