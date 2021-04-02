// TODO fix after course model is working
/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  courseCode: String,
  courseName: String,
  courseProgram: String,
  courseSemester: String,
  courseComment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

StudentSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('student', StudentSchema);*/
