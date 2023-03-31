const express = require("express")
//importing router
const router = express.Router()


//middlewares to check whether the requested data is enough or right to succeed in an API call
const {  
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../middleware/auth.validator")

const { signUp, signIn } = require("../controller/auth.controller")

/* Routes for  signup/signin using:
  -method to check valid inputs for signup/signin fields
  -validator checks: if inputs have been validated
  -controller: for API logic
*/
router.route("/signin").post(validateSignInRequest, isRequestValidated, signIn)

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp)

/*//////////////////////////////////////////////*/


//middlewares to check whether the requested data is enough or right to succeed in an API call
const {  
  validateUserRequest,
} = require("../middleware/user.validator")
const { getAssets, addAssets } = require("../controller/user.controller")

/*user details routes:
-to see all assets
-to add assets
-to update assets
-to delete assets
*/

router.route("/assets/all").get(validateSignInRequest, isRequestValidated, getAssets)
router.route("/assets/add").get(validateSignInRequest, isRequestValidated, addAssets)


module.exports = router