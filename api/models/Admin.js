const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  googleId: String,
  displayName: String,
  email: { type: String, unique: true }
});

module.exports = mongoose.model('Admin', AdminSchema);
