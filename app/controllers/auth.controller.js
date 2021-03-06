const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

let jwt = require('jsonwebtoken');
let encrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: encrypt.hashSync(req.body.password, 8),
    studentNumber: req.body.studentNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    program: req.body.program
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }
            res.send({ message: "Account created successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }
          res.send({ message: "Account was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .populate("roles", "-__v")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "Account Not found, please create one." });
    }

    let passwordIsValid = encrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    let token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    let authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  });
}

exports.findAll = (req, res) => {
  const username = req.body.username;
  let condition = username ? {username: { $regex: new RegExp(username()), $options: "i"}} : {};
  console.log(condition);
  User.find(condition).then(data =>{
    console.log("findAllUsers", data);
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred retrieving all users" });
  });
};
