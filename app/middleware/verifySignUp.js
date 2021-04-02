const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateLoginInfo = (req, res, next) => {
  // for username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed, this username already exists. Please, log-in"});
      return;
    }

    // for Email
    User.findOne({
      email: req.body.email
    }).exec((err, email) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      if (email) {
        res.status(400).send({ message: "Failed, this email already exists. Please, log-in"});
        return;
      }

      next();
    });
  });
};

checkDuplicateRole = (req, res, next) => {
  const roles = req.body.roles;
  if (roles) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        res.status(400).send({ message: `${role} does not exist`});
        return;
      }
    }
  }
  next();
}

const verifySignUp = {
  checkDuplicateLoginInfo,
  checkDuplicateRole
};

module.exports = verifySignUp;

