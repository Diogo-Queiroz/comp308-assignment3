import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, SET_MESSAGE
  } from './types';

  import CourseService from '../services/course.service';


  export const registerCourse = (courseCode, courseName, courseSection, courseSemester, userId) => (dispatch) => {
    return CourseService.registerCourse(courseCode, courseName, courseSection, courseSemester, userId)
      .then((response) => {
          dispatch({type: REGISTER_SUCCESS});
          dispatch({type: SET_MESSAGE, payload: response.data.message});
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();

          dispatch({type: REGISTER_FAIL,});
          dispatch({type: SET_MESSAGE, payload: message,});
          return Promise.reject();
        });
  };

  export const getCoursesById = (studentId) => (dispatch) => {
    return CourseService.getAllCoursesByStudent()
      .then((response) => {
        console.log("response", response);
      })
  }

