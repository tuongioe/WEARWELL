"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    product_name: { type: String, trim: true },
    product_price: { type: Number, required: true },
    product_size: { type: String, required: true },
    product_desc: { type: String, required: true },
    product_images: { type: Array, default: [] },
    product_thumb: { type: String, default: null },
    product_hover: { type: String, default: null },
    product_type: {
      type: String,
      enum: ["Male", "FeMale", "Jacket", "TShirt", "Silk-Dress", "TShirt-Pants"],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, productSchema);
