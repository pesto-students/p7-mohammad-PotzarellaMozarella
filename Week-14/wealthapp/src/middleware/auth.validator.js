//to check whether the requested data is enough or right to succeed in an API call
const { check, validationResult } = require("express-validator")
const { StatusCodes } = require("http-status-codes")

//middleware to validate signup request inputs and display msg 
const validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("userName").notEmpty().withMessage("User Name is required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
]

//middleware to validate signin request inputs
const validateSignInRequest = [
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

module.exports = {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
}