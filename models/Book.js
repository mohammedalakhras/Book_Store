const { required } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["Soft Cover", "Hard Cover"],
    },
  },
  { timestamps: true }
);

//book  model

const Book = new mongoose.model("Book", BookSchema);

function ValidateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description:Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover:Joi.string().valid("Soft Cover", "Hard Cover").required()
  });
  return schema.validate(obj);
}

function ValidateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description:Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover:Joi.string().valid("Soft Cover", "Hard Cover")
  });
  return schema.validate(obj);
}
module.exports = { Book, ValidateCreateBook, ValidateUpdateBook };





