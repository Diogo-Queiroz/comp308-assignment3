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

      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating"
        });
      });

    } else {
      console.log("newCourse", newCourse);
      Course.findOne({courseCode: newCourse.courseCode}).then((course) => {
        console.log("filha da puta", course);
        Student.findByIdAndUpdate({_id: userId}, {$addToSet: {courses: course}}, {
          new: false,
          useFindAndModify: false
        }, function (err, student) {
          if (err) {
            res.send(err);
          } else {
            console.log("User", student);
          }
        }).then(data => {
          Course.findByIdAndUpdate({_id: course._id}, {$addToSet: {students: data}}, {
            new: false,
            useFindAndModify: false
          }, function (err, course) {
            console.log("poora do caralho");
          })
        })
      })

    }
  })

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
  const id = req.params.id;
  console.log("req", req);
  Course.find({students: id}).then(data => {
    if (!data)
      res.status(400).send({message: "Data not found with id: " + id});
    else {
      console.log("course", data);
      console.log("students", data.students);
      for (let i = 0; i < data.students.length; i++) {
        console.log("student id:", data.students[i]._id);
      }
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving with id: " + id
    });
  });
};


exports.findAllById = (req, res) => {
  var userId = req.params.id;

  var coursesList = []

  console.log("userId", userId);
  Course.find().then(data => {
    console.log("data", data);
    for (let i = 0; i < data.length; i++) {
      console.log("Data Loop");
      for (let j = 0; j < data[i].students.length; j++) {
        console.log("Students in the for loop", data[i].students[j]._id);
        console.log("userId", userId);
        if (data[i].students[j]._id == userId) {
          console.log("Student in course");
          coursesList.push(data[i])
        }
      }
    }
    res.send({message: "Course almost found", courses: coursesList});
  })
}

exports.findStudentsByCourse = (req, res) => {
  console.log("req.params", req.params);
  var userId = req.params.id;

  var studentsList = []

  console.log("userId", userId);
  Student.find().then(data => {

    console.log("data", data);
    for (let i = 0; i < data.length; i++) {

      console.log("Data Loop");
      for (let j = 0; j < data[i].courses.length; j++) {

        console.log("Students in the for loop", data[i].courses[j]._id);
        console.log("userId", userId);
        if (data[i].courses[j]._id == userId) {
          console.log("Student in course");
          studentsList.push(data[i])
        }
      }
    }
    res.send({message: "Course almost found", students: studentsList});
  })
}

exports.dropCourse = (req,res) => {
  
}


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
