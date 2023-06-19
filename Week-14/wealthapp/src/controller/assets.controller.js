const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchema")
const { loginInputCheck, loginAuth } = require("../utils/loggedInUserCheck")

/*
User assets info logic:
-get all assets for user
-update assets for user
-delete assets for user
-filter results by financial year, or by month
*/

let token, user 

const getAssets = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        const { assets } = user;
        res.status(StatusCodes.OK).json({
            token,
            user: { assets },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const addAssets = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        user.assets.push(req.body.assets)
        await user.save();
        const { assets } = user;
        res.status(StatusCodes.OK).json({
            token,
            message: "Assets updated",
            user: { assets },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const deleteAssets = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        user.assets.pull(req.body.assets)
        await user.save();
        const { assets } = user;
        res.status(StatusCodes.OK).json({
            token,
            message: "Assets deleted",
            user: { assets },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const filterAssets = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        const result = user.assets.filter(asset => {
            return asset.month == req.body.month && asset.year == req.body.year
        })
        console.log(result)
        res.status(StatusCodes.OK).json({
            token,
            user: { result },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

module.exports = { getAssets, addAssets, deleteAssets, filterAssets }