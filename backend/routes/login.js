const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/settings");

require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.post("/", (req, res, next) => {
  console.log("Inside Express Login Route");
  if (!req.body.email || !req.body.password) {
    res.status(404).send("Email/Password fields cannot be blank!");
  } else {
    passport.authenticate("local", { session: false }, (error, user) => {
      if (error || !user) {
        console.log("Authentication error", error);
        res.status(401).send(error);
        return;
      }

      console.log("User Login Successful! Response from authenticate", user);
      /** This is what ends up in our JWT */
      console.log("Firstname : ", user.firstname);
      const payload = {
        email: user.email,
        userid: user._id,
        firstname: user.firstname,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
      };

      /** assigns payload to req.user */
      req.login(payload, { session: false }, error => {
        if (error) {
          console.log(error);
          res.status(400).send(error);
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), config.secret);

        /** assign our jwt to the cookie */
        res.cookie("jwt", token, {
          maxAge: 900000,
          //expires: new Date(Date.now() + 900000),
          httpOnly: false,
          path: "/"
        });
        res.status(200).json({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          type: user.type,
          _id: user._id
        });
      });
    })(req, res, next);
  }
});

module.exports = router;
