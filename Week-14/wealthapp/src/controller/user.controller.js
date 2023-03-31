const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchemas")
const jwt = require("jsonwebtoken")

/*
User info logic:
-get all assets for user
-update assets for user
-delete assets for user
-filter results by financial year, or by month
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

const deleteAssets = async (req, res) => {
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

                user.assets.pull(req.body.assets)
                await user.save();
                const { assets } = user;
                res.status(StatusCodes.OK).json({
                    token,
                    message: "Assets deleted",
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

const filterAssets = async (req, res) => {
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
                // console.log(user.assets)
                const result = user.assets.filter(asset => {
                    return asset.month == req.body.month && asset.year == req.body.year
                })
                console.log(result)
                res.status(StatusCodes.OK).json({
                    token,
                    user: { result },
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


module.exports = { getAssets, addAssets, deleteAssets, filterAssets }