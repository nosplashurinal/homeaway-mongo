const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
let UserModel = require("../models/user");

function handle_request(msg, callback) {
  console.log("Traveller :", msg.userid);
  let {
    email,
    lastname,
    firstname,
    phonenumber,
    aboutme,
    city,
    country,
    company,
    school,
    hometown,
    languages,
    gender
  } = msg;
  UserModel.update(
    { userid: msg.userid },
    {
      $set: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        aboutme: aboutme,
        city: city,
        country: country,
        company: company,
        school: school,
        hometown: hometown,
        languages: languages,
        gender: gender
      }
    }
  )
    .catch(err => {
      callback(null, err);
    })
    .then(user => {
      console.log("Traveler has been updated!");
      callback(null, user);
    });
}

exports.handle_request = handle_request;
