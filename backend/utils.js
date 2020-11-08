require('dotenv').config();

const jwtSecret = () => {
    return process.env.JWT_SECRET_TOKEN;
}

module.exports = {
    jwtSecret
}