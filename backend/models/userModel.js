const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    bankAccountId: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model('User', userSchema);