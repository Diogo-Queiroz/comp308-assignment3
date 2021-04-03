import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {username, password})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  };

  logout() {
    // Just removing the user from the localStorage is enough to logout
    localStorage.removeItem("user");
  }

  register(username, email, password, studentNumber, firstName, lastName, address, city, phoneNumber, program) {
    return axios.post(API_URL + "signup", {username, email, password, studentNumber, firstName, lastName, address, city, phoneNumber, program});
  }

  registerCourse(couseCode, courseName, courseSection, courseSemester) {
    return axios.post(API_URL + "addCourse", {couseCode, courseName, courseSection, courseSemester});
  }

}

export default new AuthService();
