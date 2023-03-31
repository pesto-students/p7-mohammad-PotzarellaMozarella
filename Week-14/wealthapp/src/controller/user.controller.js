const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchemas")
const jwt = require("jsonwebtoken")

/*
User info logic:
-get all assets for user
-update assets for user
-or send a response with the message if user already existst
*/
const getAssets = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        const user = await Users.findOne({ email: req.body.email });

        if (user) {
            if (user.authenticate(req.body.password)) {

                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET, { expiresIn: "30d" });
                const { assets } = user;
                // console.log(token)
                res.status(StatusCodes.OK).json({
                    token,
                    user: { assets },
                });
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
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const addAssets = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }
        
        const user = await Users.findOne({ email: req.body.email });

        if (user) {
            if (user.authenticate(req.body.password)) {

                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET, { expiresIn: "30d" });
                
                user.assets.push(req.body.assets) 
                await user.save();
                const { assets } = user;
                res.status(StatusCodes.OK).json({
                    token,
                    message: "Assets updated",
                    user: { assets },
                });
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
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

module.exports = { getAssets, addAssets }