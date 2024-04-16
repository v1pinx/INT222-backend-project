const express = require('express');
const { userSignup, userLogin } = require('../controllers/user');
const router = express.Router();

const User = require('../models/user');


router.post('/', userSignup);
router.post('/login', userLogin);

module.exports = router;