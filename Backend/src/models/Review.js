const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipeId: {
    type: String, // Spoonacular recipe ID
    required: true
  },
  recipeName: String,

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  review: {
    type: String
  }

}, { timestamps: true });

//Prevent duplicate review by same user
reviewSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);