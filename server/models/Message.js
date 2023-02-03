const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
    message: String

})

module.exports = Message