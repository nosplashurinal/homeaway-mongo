const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PropSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  owneremail: String,
  sleeps: Number,
  bathrooms: Number,
  bedrooms: Number,
  type: {
    type: String
  },
  price: Number,
  location: {
    type: String
  },
  photos: Array
});

module.exports = mongoose.model("Property", PropSchema);