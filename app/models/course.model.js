const { Schema } = require("mongoose");

module.exports = mongoose => {
  let course = mongoose.Schema({
    courseCode: String,
    courseName: String,
    courseSection: String,
    courseSemester: String,
    date: {
      type: Date,
      default: Date.now()
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  }) ;
  course.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  return mongoose.model("course", course);
}

//
//
//
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const CourseSchema = new Schema({
//   courseCode: String,
//   courseName: String,
//   courseProgram: String,
//   courseSemester: String,
//   courseComment: String,
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   // student: {
//   //   type: Schema.Types._ObjectId,
//   //   ref: 'Student'
//   // },
// });
//
// CourseSchema.method("toJSON", function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });
//
// module.exports = mongoose.model('course', CourseSchema);
