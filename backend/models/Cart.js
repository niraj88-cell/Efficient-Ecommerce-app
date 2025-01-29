const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Reference to Product ID
          required: true,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Minimum quantity should be at least 1
          default: 1
        },
        size: {
          type: String, // Change to String if it's a single size
          required: true
        },
        color: {
          type: String, // Change to String if it's a single color
          required: true
        },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
