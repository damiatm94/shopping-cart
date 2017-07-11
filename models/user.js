const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs'); // allows to easy hash our password

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// helper method to easy encrypt the password
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null); // check what bcrypt.genSaltSync(5) is exactly doing??
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);