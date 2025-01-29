const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
      // match: "^[A-.]+@([A-]+.)+[A-]{2,4}",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// User Model

const User = mongoose.model("User", userSchema);

// Validation Function

function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    username: Joi.string().trim().min(5).max(30).required(),
    password: Joi.string().trim().min(6).max(100),
 
  });

  return schema.validate(obj);
}

function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).max(100),
  });

  return schema.validate(obj);
}

function validateUpdatedUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(5).max(30),
    password: Joi.string().trim().min(6).max(100),
    
  });

  return schema.validate(obj);
}
module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdatedUser,
};
