exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Public Access" });
}

exports.userBoard = (req, res) => {
  res.status(200).send({ message: "User Access" });
}

exports.adminBoard = (req, res) => {
  res.status(200).send({ message: "Admin Access" });
}
