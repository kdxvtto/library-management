const express = require('express');
const router = express.Router();

const loginAuth = require('../controllers/loginController');

router.post('/', loginAuth);

module.exports = router;