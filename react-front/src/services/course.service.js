import axios from "axios";

const API_URL = "http://localhost:8080/api/course/";

class CourseService {

  registerCourse(couseCode, courseName, courseSection, courseSemester) {
    return axios.post(API_URL + "addCourse", {couseCode, courseName, courseSection, courseSemester});
  }

}

export default new CourseService();
