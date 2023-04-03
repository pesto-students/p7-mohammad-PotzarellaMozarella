const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchema")
const { loginInputCheck, loginAuth } = require("../utils/loggedInUserCheck")

/*
User income/expenditure/savings info logic:
-getFinances: get all income, expenses and savings for current year
-addFinances: update income or expenses for user
-filterFinances: filter results by financial year, or by month
*/


let token, user 

const addFinances = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        //add new income/expense to user's finance details array
        user.finance.push(req.body.finance)
        await user.save();
        const { finance } = user;
        res.status(StatusCodes.OK).json({
            token,
            message: "Finances updated",
            user: { finance },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const getFinances = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
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
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const filterFinances = async (req, res) => {
    try {
        loginInputCheck(req)
        token = await loginAuth(req)
        user = await Users.findOne({ email: req.body.email });
        //checking if params has month/year or both and filtering by month or year
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
        //if result array is empty an entry does not exist for the given month/year
        if (!result.length) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Income/Expense details do not exist..!",
            });
        }
        else {
            res.status(StatusCodes.OK).json({
                token,
                user: { finance: result },
            });
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

module.exports = { getFinances, addFinances, filterFinances }