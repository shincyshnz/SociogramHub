const bcrypt = require("bcrypt");

const generatedPasswordHash = (password, salt) => {
    return bcrypt.hash(password, salt);
};

const comparePasswordHash = (password , passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

module.exports = {
    generatedPasswordHash,
    comparePasswordHash,
}