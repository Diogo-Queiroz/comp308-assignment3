const {user} = require('../models');
const db = require('../models');
const mongoose = require('mongoose')

const Course = db.courses;
const Student = db.user;

exports.create = (req, res) => {

  var userId = req.body.userId;

  console.log("req", req.body);
  if (!req.body.courseCode) {
    res.status(400).send({message: "Content can not be empty"});
    return;
  }
  const newCourse = new Course({
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    courseSection: req.body.courseSection,
    courseSemester: req.body.courseSemester,
    students: [{_id: userId}]
  });

  Course.findOne({courseCode: newCourse.courseCode}).then(course => {
    if (!course) {
      //res.status(400).send({message: "Course not found with code: " + newCourse.courseCode});
      console.log("Course not found with code: " + newCourse.courseCode);

      newCourse.save(newCourse).then(data => {
        res.send({message: "Course registered successfully!"});
        Student.findByIdAndUpdate({_id: userId}, {$addToSet: {courses: newCourse._id}}, {new: true}, function (err, student) {
          if (err) {
            res.send(err);
          } else {
            console.log("User", student);
          }
        }).then(data => {
          console.log("data", data);
        })
      }).then(course => {
        console.log("newCourse", newCourse._id);

        console.log("Added user " + userId + " to course with code " + newCourse.courseCode);

        // Course.findByIdAndUpdate(
        //   newCourse._id,
        //   { $addToSet: { userId } },
        //   { new: true, useFindAndModify: false }
        // );

      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating"
        });
      });

    } else {
      console.log("newCourse", newCourse);
      Course.findOne({courseCode: newCourse.courseCode}).then((course) => {
        console.log("filha da puta", course);
        Student.findByIdAndUpdate({_id: userId}, {$addToSet: {courses: course}}, {new: false, useFindAndModify: false}, function (err, student) {
          if (err) {
            res.send(err);
          } else {
            console.log("User", student);
          }
        }).then(data => {
          Course.findByIdAndUpdate({_id: course._id}, {$addToSet: {students: data}}, {new: false, useFindAndModify: false}, function (err, course) {
            console.log("poora do caralho");
          })
        })
      })

    }
  })


  // userModel.findOne({ _id: "606801a62177f1a8f416dbbd"}).then(data =>{
  //   if (!data)
  //     res.status(400).send({message: "Data not found with id: " + id});
  //   else
  //     console.log("daaata", data);
  // })

  // course.save(course).then(data => {
  //   res.send({ message: "Course registered successfully!" });

  // }).catch(err => {
  //   res.status(500).send({
  //     message: err.message || "Some error occurred while creating"
  //   });
  // });
};

exports.findAll = (req, res) => {
  const courseName = req.body.courseName;
  let condition = courseName ? {courseName: {$regex: new RegExp(courseName()), $options: "i"}} : {};
  console.log(condition);
  Course.find(condition).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving"
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.body.id;

  Course.findOne(id).then(data => {
    if (!data)
      res.status(400).send({message: "Data not found with id: " + id});
    else
      res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving with id: " + id
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({message: "Data to update cannot be empty"});
  }

  const id = req.params.id;

  Course.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
    if (!data) {
      res.status(400).send({message: "Cannot update with id: " + id});
    } else
      res.send({message: "Course updated successfully"});
  }).catch(err => {
    res.status(500).send({
      message: "Error updating course"
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
    if (!data) {
      res.status(400).send({message: "Cannot delete with id: " + id});
    } else
      res.send({message: "Course deleted successfully"});
  }).catch(err => {
    res.status(500).send({
      message: "Error deleting course"
    })
  })
};

exports.deleteAll = (req, res) => {
  Course.deleteMany({}).then(data => {
    res.send({message: `Deleted all ${data.deletedCount} Courses`});
  }).catch(err => {
    res.status(500).send({
      message: "Some error occurred while deleting all Courses"
    });
  });
};
