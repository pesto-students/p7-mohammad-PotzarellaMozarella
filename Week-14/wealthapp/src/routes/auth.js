const express = require("express");
//importing router
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");

//middlewares to check whether the requested data is enough or right to succeed in an API call
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");

/* Routes for  signup/signin using:
  -method to check valid inputs for signup/signin fields
  -validator checks: if inputs have been validated
  -controller: for API logic
*/
router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router;