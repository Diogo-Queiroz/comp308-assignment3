exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Home Page - Course List Assignment 3, COMP 308" });
}

exports.userBoard = (req, res) => {
  res.status(200).send({ message: "User Access" });
}

exports.adminBoard = (req, res) => {
  res.status(200).send({ message: "Admin Access" });
}
