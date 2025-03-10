const mongoose = require('mongoose');

//schema is structure of document
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// Model is way to interact with db
const User = mongoose.model('User', userSchema);
module.exports = User;