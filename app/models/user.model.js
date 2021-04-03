const { Schema } = require("mongoose");

module.exports = mongoose => {
  let user = mongoose.Schema({
    username: String,
    studentNumber: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    program: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
      }
    ],
    courses:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
      }
    ]
  });
  return mongoose.model("user", user);
};
