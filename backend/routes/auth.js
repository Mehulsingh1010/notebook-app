
const express = require("express");
const fetchUser =require("../middleware/fetchUser")
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mehulsingh"
//create user using post "/api/auth"

router.post(
  "/createuser",
  [
    body("name", "name  must contain atleast 3 units").isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPas = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({ error: "please enter a unique value for creating another account" });
      //   });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data,  JWT_SECRET);
      res.json({ authtoken: authtoken });

      res.json(user);
    } catch (error) {
      console.error(error.message);
    }
  }
);

//login
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "try to login with correct info" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ error: "try to login with correct info" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//get login details login required.

router.get(
  "/getuserdata",fetchUser,

  async (req, res) => {
    try {

      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
