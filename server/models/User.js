const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    password: String,
    phone: String,
    cpf: String
})

module.exports = User