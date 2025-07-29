const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log(process.env.JWT_SECRET,"JWT AT jwt token method")

const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
            issuer: "Scatch",
            subject: user._id.toString(),
            audience: "myapp-users",
        }
    );
};

module.exports.generateToken = generateToken;
