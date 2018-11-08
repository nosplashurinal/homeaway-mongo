const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

const PropModel = require("../models/property");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside Property List Page");
    console.log("req.query : ", req.query);
    kafka.make_request("property_list", req.query, function(err, result) {
      if (err) {
        console.log("Error searching for property", err);
        res.status(404).send(err);
      } else {
        console.log("Property results ", result);
        res.status(200).json(result);
      }
    });
  }
);

router.get(
  "/:min/:max",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { min, max } = req.params;
    PropModel.find({
      $and: [{ price: { $gte: min } }, { price: { $lte: max } }]
    })
      .then(properties => {
        console.log("Properties :", properties);
        res.status(200).send(properties);
      })

      .catch(error => {
        console.log("Error :", error);
        res.status(400).send(error);
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let bedrooms;
    PropModel.find({ bedrooms: { $eq: bedrooms } })
      .then(properties => {
        console.log("Properties :", properties);
        res.status(200).send(properties);
      })

      .catch(error => {
        console.log("Error :", error);
        res.status(400).send(error);
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let bedrooms;
    PropModel.find({ bedrooms: { $eq: bedrooms } })
      .then(properties => {
        console.log("Properties :", properties);
        res.status(200).send(properties);
      })

      .catch(error => {
        console.log("Error :", error);
        res.status(400).send(error);
      });
  }
);

module.exports = router;
