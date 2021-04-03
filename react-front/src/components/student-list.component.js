import React, {Component} from "react";
import UserService from "../services/auth.service";
import {Link} from "react-router-dom"

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    //this.setActiveTutorial = this.setActiveTutorial.bind(this);
    //this.removeAllTutorial = this.removeAllTutorial.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveStudents() {
    UserService.getAllStudents().then(response => {
      this.setState({
        students: response.data
      });
      console.log("Retrieve Students");
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
    const {searchTitle, students, currentStudent, currentIndex} = this.state;
    console.log(this.state.students);
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
          <h4>Student List</h4>
          <table className="table table-hover table-striped table-responsive-xl" align="center">
            <caption>List of All the Students</caption>
            <thead className="thead-light">
              <tr>
                <th scope="col">Student Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Program</th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.address}</td>
                  <td>{student.city}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.program}</td>
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
