import axios from "axios";
import http from '../http-common';

const API_URL = "http://localhost:8080/api/course/";

class CourseService {

  registerCourse(courseCode, courseName, courseSection, courseSemester, userId) {
    return axios.post(API_URL + "addCourse", {courseCode, courseName, courseSection, courseSemester, userId});
  }

  getAllCourses() {
    return axios.get(API_URL + "courses");
  }

  getAllCoursesByStudent(id) {
    return axios.get(API_URL + `coursesById/${id}`);
  }

  getAllStudentByCourse(id) {
    return axios.get(API_URL + `studentByCourse/${id}`);
  }

}

export default new CourseService();
