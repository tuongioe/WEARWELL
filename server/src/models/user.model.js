"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    user_username: { type: String, trim: true, unique: true },
    user_password: { type: String, required: true },
    user_fullName: { type: String, default: null },
    user_phone: { type: String, default: null },
    user_address: { type: String, default: null },
    user_role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
