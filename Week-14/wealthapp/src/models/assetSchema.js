const mongoose = require("mongoose")
const { Schema, Types } = mongoose
const Users = require("/Users")

//to create assets schema with _id from userSchema as foreign key 
const assetsSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true,
      enum: ['Equity', 'Fixed-Income', 'Alternatives', 'Assets'],
      default: 'Assets'
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
   //assigns ObjectId from userSchema as foreign key in each asset 
   assignedTo: { 
      type: Types.ObjectId, 
      ref: Users },
   createdBy: { 
      type: Types.ObjectId, 
      ref: Users }
})

module.exports = Asset = mongoose.model("Asset", assetsSchema)
