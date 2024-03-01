const express = require('express');
const UserService = require('../services/userService')

const router = express.Router()

router.post('/user', UserService.createUser)

router.get('/user/:username', UserService.getUser)

router.get('/bank-keyboard', (req, res) => {
    // TODO
    res.send('Deve retornar os pares de teclas e a ordem em que aparecerão na tela')
})

module.exports = router;