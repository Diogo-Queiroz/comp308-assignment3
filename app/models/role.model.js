module.exports = mongoose => {
  let role = mongoose.Schema({
    name: String,
  });
  return mongoose.model("role", role);
};
