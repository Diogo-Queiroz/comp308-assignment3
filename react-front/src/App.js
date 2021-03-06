import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Link, Switch, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorial-list.component";
import AddTutorial from "./components/add-tutorial.component";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/page-user.component";
import BoardAdmin from "./components/page-admin.component";
import AddCourse from "./components/add-course.component";
import StudentList from "./components/student-list.component";
import CourseList from "./components/course-list.component";
import studentByCourse from "./components/studentsByCourse.component";

import {logout} from './actions/auth';
import {clearMessage} from "./actions/message";

import {history} from "./helpers/history";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {currentUser, showAdminBoard} = this.state;
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Assignment3-D&L
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/courses"} className="nav-link">
                  Courses
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/api/course/coursesById/" + this.props.user.id} className="nav-link">
                    User courses
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/addCourse"} className="nav-link">
                    Add Course
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              {/*<Route exact path={["/", "/tutorials"]} component={TutorialsList}/>*/}
              {/*<Route exact path={["/add"]} component={AddTutorial}/>*/}
              {/*<Route path="/tutorials/:id" component={Tutorial}/>*/}
              <Route exact path={["/", "/home"]} component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/addCourse" component={AddCourse}/>
              <Route exact path="/students" component={StudentList}/>
              <Route exact path="/courses" component={CourseList}/>
              <Route path="/api/course/coursesById/:id" component={BoardUser}/>
              <Route path="/api/course/studentByCourse/:id" component={studentByCourse}/>

              <Route path="/admin" component={BoardAdmin}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(App);
