const Users = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")

function loginInputCheck(req) {
    if (!req.body.email || !req.body.password) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please enter email and password to login",
        });
    }
}

const loginAuth = async (req) => {
    console.log(req)
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
        if (user.authenticate(req.body.password)) {
            return jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET, { expiresIn: "30d" });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Something went wrong!",
            });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "User does not exist..!",
        });
    }
}

module.exports = { loginInputCheck, loginAuth }