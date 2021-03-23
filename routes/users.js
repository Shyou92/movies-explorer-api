const router = require('express').Router();
const controller = require('../controllers/users');
const updateUserValidation = require('../middlewares/validators/updateUserValidation');

router.get('/me', controller.getCurrentUser); // obtaining info about myself

router.patch('/me', updateUserValidation, controller.updateUser); // update user info

module.exports = router;
