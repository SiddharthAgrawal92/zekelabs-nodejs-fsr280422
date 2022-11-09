const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

const AuthSchema = new Schema({
    userName: String,
    password: String,
    role: String,
    mobileNumber: Number
});

//originalStringPassword --> hashedString
AuthSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//validating the hashed password stored in the db document with originalStringPassword 
AuthSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Auth', AuthSchema);