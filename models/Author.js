const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
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
  }}
  ,{

    timestamps:true
  }
);


/*we will pass in first param "ModelName"
 that will create collection in same name in DB.
 Second param is Schema object
*/
const Author= mongoose.model('Author',AuthorSchema);

module.exports={
  Author
}