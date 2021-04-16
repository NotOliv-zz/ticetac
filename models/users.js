var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: String,
    firstname: String,
    email: String,
    password: String,
    userjourney: [{type: mongoose.Schema.Types.ObjectId, ref: "journey"}]
})

var UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;