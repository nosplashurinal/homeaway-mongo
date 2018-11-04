let mongoose = require("mongoose");
let validator = require("validator");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
  },
  password: String,
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  type: {
    type: String
  },
  phonenumber: Number,
  aboutme: String,
  city: String,
  country: String,
  company: String,
  school: String,
  hometown: String,
  languages: String,
  gender: String
});

module.exports = mongoose.model("User", UserSchema);