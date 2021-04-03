import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import {connect} from "react-redux";
import {register} from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vstudentNumber = (value) => {
  if (value.length != 9) {
    return (
      <div className="alert alert-danger" role="alert">
        The student number must have 9 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeStudentNumber = this.onChangeStudentNumber.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeProgram = this.onChangeProgram.bind(this);

    this.state = {
      username: "",
      studentNumber: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phoneNumber: "",
      program: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeStudentNumber(e) {
    this.setState({
      studentNumber: e.target.value,
    })
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    })
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    })
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    })
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    })
  }

  onChangeProgram(e) {
    this.setState({
      program: e.target.value,
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(
            this.state.username, this.state.email, this.state.password,
            this.state.studentNumber, this.state.firstName, this.state.lastName, this.state.address,
            this.state.city, this.state.phoneNumber, this.state.program,
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
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentNumber">student Number:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="studentNumber"
                    value={this.state.studentNumber}
                    onChange={this.onChangeStudentNumber}
                    validations={[required, vstudentNumber]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Number:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeCity}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">phone Number:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.onChangePhoneNumber}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="program">Program:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="program"
                    value={this.state.program}
                    onChange={this.onChangeProgram}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
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
  return {message};
}

export default connect(mapStateToProps)(Register);
