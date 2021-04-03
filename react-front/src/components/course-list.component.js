import React, {Component} from "react";
import CourseService from "../services/course.service";

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    //this.setActiveTutorial = this.setActiveTutorial.bind(this);
    //this.removeAllTutorial = this.removeAllTutorial.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCourses()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCourses() {
    CourseService.getAllCourses().then(response => {
      this.setState({
        courses: response.data
      });
      console.log("Retrieve Courses");
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
    });
  }

  /*refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }*/

  /*setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index
    })
  }*/

  /*removeAllStudents() {
    UserService.deleteAll().then(response => {
      console.log("Delete All Tutorials = " + response.data);
      this.refreshList();
    }).catch(err => {
      console.log(err.message);
    })
  }*/

  /*searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle).then(response => {
      this.setState({
        tutorials: response.data
      });
      console.log("Search Title response = " + response.data);
    }).catch(err => {
      console.log(err.message);
    })
  }*/

  render() {
    const {searchTitle, courses, currentStudent, currentIndex} = this.state;
    console.log(this.state.courses);
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
            <caption>List of All the Courses</caption>
            <thead className="thead-light">
              <tr>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col">Section</th>
                <th scope="col">Semester</th>
              </tr>
            </thead>
            <tbody>
              {courses && courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseSection}</td>
                  <td>{course.courseSemester}</td>
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
