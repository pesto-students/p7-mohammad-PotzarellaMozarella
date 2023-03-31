//to check whether the requested data is enough or right to succeed in an API call
const { check, validationResult } = require("express-validator")
const { StatusCodes } = require("http-status-codes")

//middleware to validate asset access request inputs and display msg 
const validateUserRequest = [
    check("email").isEmail().withMessage("Valid Email required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 character long"),
]

//to check if any validation errors have been extracted by the method: validationResult
const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: errors.array()[0].msg })
    }
    next();
}

isAuthenticatedUser = async (req, res, next) => {
    if (!token) {
        return next("Please Login to Access  this resource");

    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    next();

}
module.exports = {
    validateUserRequest,
    isRequestValidated,
}