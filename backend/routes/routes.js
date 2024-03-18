const express = require('express');
const UserService = require('../services/userService')

const router = express.Router()

router.post('/user', UserService.createUser)

router.get('/user/:username', UserService.getUser)

router.get('/bankId/:id', UserService.getUserByBankId)

router.get('/user/:bankId/bank-keyboard', validateSession, UserService.getUserBankKeyboard)

router.put('/check-password', validateSession, UserService.checkUserPassword)

function validateSession(req, res, next) {
    const { sessionid } = req.headers;
    console.log(req.sessionStore.sessions)
    if (!sessionid || !req.sessionStore.sessions[sessionid]) return res.status(401).json({ message: 'Sessão inválida' });

    next();
}

module.exports = router;