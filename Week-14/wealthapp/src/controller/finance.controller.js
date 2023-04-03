const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchemas")
const jwt = require("jsonwebtoken")

/*
User info logic:
-get all income, expenses and savings for current year
-update income or expenses for user
-filter results by financial year, or by month
*/
const getFinances = async (req, res) => {
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
                //gets current year
                const d = new Date();
                let year = d.getFullYear();
                //loops over finances to calculate income, expenses and savings for current year
                let income = 0, expenses = 0, savings = 0;
                user.finance.forEach(finance => {
                    if (finance.year == year && finance.type == 'Income') {
                        income = income + finance.amount
                    }
                    else if (finance.year == year && finance.type == 'Expenses') {
                        expenses = expenses + finance.amount
                    }
                })
                savings = income - expenses
                res.status(StatusCodes.OK).json({
                    token,
                    user: { income: income, expenses: expenses, savings: savings },
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

const filterFinances = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            if (!req.params.month && !req.params.year) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Please enter email and password",
                });
            }

        }
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            if (user.authenticate(req.body.password)) {

                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET, { expiresIn: "30d" });
                //filtering by month or year
                console.log(req.params.month)
                console.log(req.params.year)
                let result = [];
                if (req.params.month && req.params.year) {
                    result = user.finance.filter(finance => {
                        return finance.year == req.params.year && finance.month == req.params.month;
                    })
                }
                else if (req.params.year) {
                    result = user.finance.filter(finance => {
                        return finance.year == req.params.year;
                    })
                }
                console.log(result)
                if (!result.length) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Income/Expense details do not exist..!",
                    });
                }
                else {
                    res.status(StatusCodes.OK).json({
                        token,
                        user: { finance: result},
                    });
                }
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

const addFinances = async (req, res) => {
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

                user.finance.push(req.body.finance)
                await user.save();
                const { finance } = user;
                res.status(StatusCodes.OK).json({
                    token,
                    message: "Finaces updated",
                    user: { finance },
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

// const deleteFinances = async (req, res) => {
//     try {
//         if (!req.body.email || !req.body.password) {
//             res.status(StatusCodes.BAD_REQUEST).json({
//                 message: "Please enter email and password",
//             });
//         }

//         const user = await Users.findOne({ email: req.body.email });

//         if (user) {
//             if (user.authenticate(req.body.password)) {

//                 const token = jwt.sign(
//                     { _id: user._id },
//                     process.env.JWT_SECRET, { expiresIn: "30d" });

//                 user.assets.pull(req.body.assets)
//                 await user.save();
//                 const { assets } = user;
//                 res.status(StatusCodes.OK).json({
//                     token,
//                     message: "Assets deleted",
//                     user: { assets },
//                 });
//             } else {
//                 res.status(StatusCodes.UNAUTHORIZED).json({
//                     message: "Something went wrong!",
//                 });
//             }
//         } else {
//             res.status(StatusCodes.BAD_REQUEST).json({
//                 message: "User does not exist..!",
//             });
//         }
//     } catch (error) {
//         res.status(StatusCodes.BAD_REQUEST).json({ error })
//     }
// }


module.exports = { getFinances, addFinances, filterFinances }