const { StatusCodes } = require("http-status-codes")
const Users = require("../models/userSchemas")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

/*
Signup logic:
-check if all inputs are provided & send error msg if not
-generate a hash password using the bcrypt package
-find the email, send a response with the message if user already exists
-or creates a new user if already doesnt exist
*/
const signUp = async (req, res) => {
   const { firstName, lastName, userName, email, password } = req.body;
   if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
         message: "Please Provide Required Information",
      });
   }

   const hash_password = await bcrypt.hash(password, 10);

   const userData = {
      firstName,
      lastName,
      userName,
      email,
      hash_password,
   };

   const user = await Users.findOne({ email });
   if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
         message: "User already registered",
      });
   } else {
      Users.create(userData).then((data, err) => {
         if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
         else
            res
               .status(StatusCodes.CREATED)
               .json({ message: "User created Successfully" });
      });
   }
};

/*
Signin logic:
-check if all inputs are provided & send error msg if not
-find the email, authenticates if user found
-or send a response with the message if user already existst
*/
const signIn = async (req, res) => {
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
               
            const { _id, firstName, lastName, userName, email, fullName } = user;
            console.log(token)
            res.status(StatusCodes.OK).json({
               token,
               user: { _id, firstName, lastName, userName, email, fullName },
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

module.exports = { signUp, signIn }