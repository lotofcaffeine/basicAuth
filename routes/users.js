var express = require("express");
var router = express.Router();

const User = require("../models/User");

/* GET users listing. */

//"/users"
router.get("/", function(req, res, next) {
  User.find()
    .then(users => {
      res.render("userList", { users: users });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/update/:id", (req, res) => {
  //Find user by id
  //res show form
  User.findById(req.params.id)
    .then(user => {
      res.render("showUser", {
        user: user,
        route: `/users/update/${user._id}`
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/update/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      res.redirect("/users");
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/delete/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      res.redirect("/users");
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
