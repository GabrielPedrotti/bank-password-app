const express = require('express');
const UserService = require('../services/userService')

const router = express.Router()

router.post('/user', UserService.createUser)

router.get('/user/:username', UserService.getUser)

router.get('/user/:username/bank-keyboard', UserService.getUserBankKeyboard)

module.exports = router;