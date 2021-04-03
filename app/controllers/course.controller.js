const db = require('../models');
const Course = db.courses;

exports.create = (req, res) => {
  if (!req.body.courseCode) {
    res.status(400).send({message: "Content can not be empty"});
    return;
  }
  const course = new Course({
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    courseSection: req.body.courseSection,
    courseSemester: req.body.courseSemester,
  });

  course.save(course).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating"
    });
  });
};

exports.findAll = (req, res) => {
  const courseName = req.body.courseName;
  let condition = courseName ? {courseName: { $regex: new RegExp(courseName()), $options: "i"}} : {};
  console.log(condition);
  Course.find(condition).then(data =>{
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving"
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.body.id;

  Course.findOne(id).then(data =>{
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
    }
    else
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
    }
    else
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
