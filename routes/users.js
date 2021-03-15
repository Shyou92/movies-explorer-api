const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/me', controller.getCurrentUser); // obtaining info about myself

router.patch('/me', controller.updateUser); // update user info

module.exports = router;