module.exports = app => {
  const courses = require('../controllers/course.controller');
  let router = require('express').Router();

  router.post('/', courses.create);
  router.get('/', courses.findAll);
  router.get('/:id', courses.findOne);
  router.put('/:id', courses.update);
  router.delete('/:id', courses.delete);
  router.delete('/', courses.deleteAll);

  app.post("/api/course/addCourse", courses.create);
  app.get("/api/course/courses", courses.findAll);
  app.get('/api/course/coursesById/:id', courses.findAllById);
  app.get('/api/course/studentByCourse/:id', courses.findStudentsByCourse);

  app.delete("/api/courseDrop/:userId/:courseId", courses.dropCourse);

  app.use('/api/courses', router);
}
