require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Function to encrypt password
const encryptPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

// Function to compare password
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    encryptPassword, comparePassword
}