import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import {connect} from "react-redux";
import {registerCourse} from "../actions/course";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.handleAddCourse = this.handleAddCourse.bind(this);
    this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCourseSection = this.onChangeCourseSection.bind(this);
    this.onChangeCourseSemester = this.onChangeCourseSemester.bind(this);


    this.state = {
      courseCode: "",
      courseName: "",
      courseSection: "",
      courseSemester: "",
      currentUser: undefined,
      successful: false,
    };
  }


  componentDidMount() {
    
    console.log("user", this.props);

  }
  




  onChangeCourseCode(e) {
    this.setState({
      courseCode: e.target.value,
    });
  }

  onChangeCourseName(e) {
    this.setState({
      courseName: e.target.value,
    });
  }

  onChangeCourseSection(e) {
    this.setState({
      courseSection: e.target.value,
    });
  }

  onChangeCourseSemester(e) {
    this.setState({
      courseSemester: e.target.value,
    })
  }

  handleAddCourse(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          registerCourse(
            this.state.courseCode, this.state.courseName, this.state.courseSection,
            this.state.courseSemester, this.props.user.id
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const {message} = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="https://i0.wp.com/bellevuefuneralchapel.com/wp-content/uploads/2017/01/generic-profile-avatar_352864.jpg?fit=500,500"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleAddCourse}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="courseCode">Course Code</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="courseCode"
                    value={this.state.courseCode}
                    onChange={this.onChangeCourseCode}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courseName">Course Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="courseName"
                    value={this.state.courseName}
                    onChange={this.onChangeCourseName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courseSection">Course Section</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="courseSection"
                    value={this.state.courseSection}
                    onChange={this.onChangeCourseSection}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courseSemester">Course Semester</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="courseSemester"
                    value={this.state.courseSemester}
                    onChange={this.onChangeCourseSemester}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add Course</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{display: "none"}}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
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

export default connect(mapStateToProps)(AddCourse);
