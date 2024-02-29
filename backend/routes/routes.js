const express = require('express');
const UserModel = require('../models/userModel');

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const user = new UserModel({
        bankAccountId: req.body.bankAccountId
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;