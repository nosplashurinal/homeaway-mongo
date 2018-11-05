const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

router.get(
  "/Booked",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let payload = req.user;
    kafka.make_request("owner_dash_booked", payload, function(err, result) {
      if (err) {
        console.log("Error finding properties for owner :", err);
        res.status(404).send(err);
      } else {
        console.log("Booked properties", result);
        res.status(200).send(result);
      }
    });
  }
);

router.get(
  "/MyProps",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let payload = req.user;
    kafka.make_request("owner_dash_myprops", payload, function(err, result) {
      if (err) {
        console.log("Error finding properties for owner :", err);
        res.status(404).send(err);
      } else {
        console.log("Owner properties", result);
        res.status(200).send(result);
      }
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Owner id :", req.user.userid);
    let payload = req.body;
    kafka.make_request("owner_dash_update", payload, function(err, result) {
      if (err) {
        console.log("Error adding details for owner :", err);
        res.status(404).send(err);
      } else {
        console.log("Details added", result);
        res.status(200).send(result);
      }
    });
  }
);

module.exports = router;
