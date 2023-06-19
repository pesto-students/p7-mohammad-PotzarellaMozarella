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


/*user details routes for assets & other income details:
-to see all assets
-to add assets
-to update assets
-to delete assets
*/

const { getAssets, addAssets, deleteAssets,filterAssets } = require("../controller/assets.controller")

router.route("/assets/all").get(validateSignInRequest, isRequestValidated, getAssets)
router.route("/assets/add").get(validateSignInRequest, isRequestValidated, addAssets)
router.route("/assets/delete").get(validateSignInRequest, isRequestValidated, deleteAssets)
router.route("/assets/filter").get(validateSignInRequest, isRequestValidated, filterAssets)


const { getFinances, addFinances, filterFinances } = require("../controller/finance.controller")

router.route("/finances/current").get(validateSignInRequest, isRequestValidated, getFinances)
router.route("/finances/update").get(validateSignInRequest, isRequestValidated, addFinances)
router.route("/finances/:year/:month").get(validateSignInRequest, isRequestValidated, filterFinances)

module.exports = router