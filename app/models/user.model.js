module.exports = mongoose => {
  let user = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
      }
    ]
  });
  return mongoose.model("user", user);
};
