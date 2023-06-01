const express = require('express')
const router = express.Router();
const userRoute  = require('../routes/user');
const controller = require('../controllers/user')

router.post('/register', controller.register);
router.post('/login', controller.login);
router.use('/user', userRoute);

module.exports = router;