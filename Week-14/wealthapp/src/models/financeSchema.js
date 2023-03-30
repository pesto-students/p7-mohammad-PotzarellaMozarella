const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const Users = require("/Users");

//to create finance schema with _id from userSchema as foreign key 
const financeSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true,
      enum: ['Income', 'Expenses', 'Savings'],
      default: 'Expenses'
   },
   amount: {
      type: Number,
      required: true,
      default: 0.0
   },
   date: {
      type: Date,
      required: true,
      default: Date.now
   },
   //assigns ObjectId from userSchema as foreign key in each asset on
   assignedTo: { 
      type: Types.ObjectId, 
      ref: Users },
   createdBy: { 
      type: Types.ObjectId, 
      ref: Users }
});

module.exports = Finance = mongoose.model("Finance", financeSchema);
