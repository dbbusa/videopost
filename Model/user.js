const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true });
module.exports = mongoose.model("User", usersSchema);