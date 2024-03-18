const express = require('express');
const UserService = require('../services/userService')

const router = express.Router()

router.post('/user', UserService.createUser)

router.get('/user/:username', UserService.getUser)

router.get('/bankId/:id', UserService.getUserByBankId)

router.get('/user/:username/bank-keyboard', UserService.getUserBankKeyboard)

router.put('/check-password', UserService.checkUserPassword)

module.exports = router;