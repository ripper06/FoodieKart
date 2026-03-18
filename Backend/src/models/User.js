const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  dietaryPreferences: [{
  type: String,
  lowercase: true,
  trim: true
}],
allergies: [{
  type: String,
  lowercase: true,
  trim: true
}],
dislikedIngredients: [{
  type: String,
  lowercase: true,
  trim: true
}],
  skillLevel: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    default: "beginner"
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;