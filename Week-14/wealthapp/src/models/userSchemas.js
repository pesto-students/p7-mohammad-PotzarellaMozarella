const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const bcrypt = require("bcrypt");


//to create user schema 
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
   },
   lastName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
   },
   userName: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
   },
   email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
   },
   hash_password: {
      type: String,
      require: true,
   }
}, { timestamps: true });

//to get fullName when we get data from database as virtual property that do not persist
userSchema.virtual("fullName").get(function () {
   return `${this.firstName} ${this.lastName}`;
});

//to compare passwords with the database and return the result from here
userSchema.method({
   async authenticate(password) {
      return bcrypt.compare(password, this.hash_password);
   },
});


module.exports = Users = mongoose.model("User", userSchema);

