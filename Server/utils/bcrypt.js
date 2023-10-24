const bcrypt = require("bcrypt");

const generatedPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

const comparePasswordHash = (password , passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

module.exports = {
    generatedPasswordHash,
    comparePasswordHash,
}