import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"

import CourseService from "../services/course.service";
import { getCoursesById } from "../actions/course";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCoursesByStudent = this.retrieveCoursesByStudent.bind(this);

    this.state = {
      courses: [],
      currentStudent: null,
      currentIndex: -1,
      searchTitle: "",
      studentId: ""
    };
  }

  componentDidMount() {
    this.retrieveCoursesByStudent()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCoursesByStudent() {
    let id = this.props.user.id;
    CourseService.getAllCoursesByStudent(id).then(response => {
      console.log("resposta", response);
      this.setState({
        courses: response.data,
        studentId: id
      });
      console.log("Retrieve Courses");
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
    });
  }


  render() {
    const {searchTitle, courses, currentStudent, currentIndex, studentId} = this.state;
    console.log("State", this.state);
    console.log("courses", courses);

    return (
      <div className="list row">
        {/*<div className="col-md-8">*/}
        {/*  <div className="input-group mb-3">*/}
        {/*    <input type="text" className="form-control"*/}
        {/*           placeholder="Search by Title" value={searchTitle}*/}
        {/*           onChange={this.onChangeSearchTitle} />*/}
        {/*    <div className="input-group-append">*/}
        {/*      <button className="btn btn-outline-secondary"*/}
        {/*              type="button" onClick={this.searchTitle}>*/}
        {/*        Search*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="col-md-12">
          <h4>Course List</h4>
          <table className="table table-hover table-striped table-responsive-xl" align="center">
            <caption>List of Courses of current user</caption>
            <thead className="thead-light">
              <tr>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Section</th>
                <th scope="col">Course Semester</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.courses && courses.courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseSection}</td>
                  <td>{course.courseSemester}</td>
                  <td>
                    {/*<Form onSubmit={this.handleLogin}*/}
                    {/*  ref={(c) => {*/}
                    {/*    this.form = c;*/}
                    {/*  }}*/}
                    {/*>*/}

                    {/*  <div className="form-group">*/}
                    {/*    <button*/}
                    {/*      className="btn btn-primary btn-block"*/}
                    {/*      disabled={this.state.loading}*/}
                    {/*    >*/}
                    {/*      {this.state.loading && (*/}
                    {/*        <span className="spinner-border spinner-border-sm"></span>*/}
                    {/*      )}*/}
                    {/*      <span>Login</span>*/}
                    {/*    </button>*/}
                    {/*  </div>*/}

                    {/*  <CheckButton*/}
                    {/*    style={{display: "none"}}*/}
                    {/*    ref={(c) => {*/}
                    {/*      this.checkBtn = c;*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*</Form>*/}
                    <Link to={`/api/course/dropCourse/${course.id}/${studentId}`} className="btn btn-danger">
                      Drop Course
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*<button className="m-3 btn btn-sm btn-danger"*/}
          {/*        onClick={this.removeAllTutorial}>*/}
          {/*  Remove All*/}
          {/*</button>*/}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {message} = state.message;
  const {user} = state.auth;
  return {message,user};
}

export default connect(mapStateToProps)(BoardUser);
