import axios from "axios";

const API_URL = "http://localhost:8080/api/course/";

class CourseService {

  registerCourse(courseCode, courseName, courseSection, courseSemester, userId) {
    return axios.post(API_URL + "addCourse", {courseCode, courseName, courseSection, courseSemester, userId});
  }

  getAllCourses() {
    return axios.get(API_URL + "courses");
  }

}

export default new CourseService();
