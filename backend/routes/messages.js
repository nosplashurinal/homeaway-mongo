const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const MsgModel = require("../models/messages");
const PropModel = require("../models/property");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside Add new message");

    let From = req.body.from;
    let To = req.body.to;
    let Body = req.body.msgbody;
    let Timestamp = new Date();
    let sender = req.user.firstname;

    let Message = new MsgModel({
      _id: new mongoose.Types.ObjectId(),
      from: From,
      to: To,
      sendername: sender,
      body: Body,
      timestamp: Timestamp
    });

    console.log("Message", Message);

    Message.save()
      .then(message => {
        console.log(`Message sent to owner ${To}`);
        res.status(200).send(message);
      })

      .catch(error => {
        res.status(400).send(error);
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("GET messages");
    let user = req.query.id;
    console.log("User is", user);
    MsgModel.find({ $or: [{ from: user }, { to: user }] })
      .then(messages => {
        console.log("Messages for the user : ", messages);
        res.status(200).send({ messages });
      })
      .catch(error => {
        console.log("Error :", error);
        res.status(400).send(error);
      });
  }
);

module.exports = router;
