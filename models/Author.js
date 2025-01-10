const mongoose = require("mongoose");
const { object } = require("joi");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlenghth: 200,
    },
    lastnamme: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlenghth: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlenghth: 20,
    },
    image: {
      type: String,
      trim: true,
      minlength: 3,
      maxlenghth: 200,
    },
  },
  {
    timestamps: true,
  }
);

/*we will pass in first param "ModelName"
 that will create collection in same name in DB.
 Second param is Schema object
*/
const Author = mongoose.model("Author", AuthorSchema);

function CheckInsertAuthor(data) {
  const schema = Joi.object({
    firstname: Joi.string().trim().max(30).min(2).required(),
    lastnamme: Joi.string().trim().max(30).min(2).required(),
    nationality: Joi.string().trim().max(30).min(2).required(),
    image: Joi.string().trim(),
  });
  return schema.validate(data);
}

function CheckUpdatetAuthor(data) {
  const schema = Joi.object({
    firstname: Joi.string().trim().max(30).min(2),
    lastnamme: Joi.string().trim().max(30).min(2),
    nationality: Joi.string().trim().max(30).min(2),
    image: Joi.string().trim(),
  });
  return schema.validate(data);
}
module.exports = {
  Author,
  CheckInsertAuthor,
  CheckUpdatetAuthor,
};
