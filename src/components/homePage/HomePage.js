import { Fragment, useEffect } from "react";
import homeStyles from "./HomePage.module.css";
import { connect } from "react-redux";
import { ErrorMsg, ShowLoading, SuccessMsg } from "./../../utils/Messages";
import { Navigate } from "react-router-dom";
import { userInfo, isAuthenticated } from "./../../utils/Auth";
import {
  actionChangeSignUpForm,
  actionChangeSignInForm,
  actionSubmitSignUpForm,
  actionSubmitSignInForm,
} from "./../../redux/AuthActionCreators";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//redux state
function mapStateToProps(state) {
  console.log("Hello i am homepage state");
  console.log(state);
  return state;
}
//redux dispatch

function mapDispatchToProps(dispatch) {
  return {
    signUpFormChange: function (user) {
      return dispatch(actionChangeSignUpForm(user));
    },
    signInFormChange: function (user) {
      return dispatch(actionChangeSignInForm(user));
    },
    signUpFormSubmit: function (user) {
      return dispatch(actionSubmitSignUpForm(user));
    },
    signInFormSubmit: function (user) {
      return dispatch(actionSubmitSignInForm(user));
    },
  };
}
//HomePage Component
function HomePage(props) {
  //signUp state
  const {
    name,
    email,
    password,
    password_confirmation,
    error,
    loading,
    disabled,
    success,
    alethide,
  } = props.signUpuser;
  //signIn state
  const {
    logemail,
    logpassword,
    logerror,
    logloading,
    logdisabled,
    logredirect,
    logsuccess,
    logalethide,
  } = props.signInuser;
  //useEffect Hook
  useEffect(function () {
    document.title = "Home Page";
  }, []);
  useEffect(
    function () {
      const hideAlertBox = document.querySelectorAll(".hideAlertBox");
      if (hideAlertBox) {
        hideAlertBox.forEach(function (el) {
          setTimeout(() => {
            el.style.display = "none";
          }, 2000);
        });
      }
    },
    [alethide, logalethide]
  );

  //signUpFormhandleChange
  const signUpFormhandleChange = (e) => {
    let user = {
      ...props.signUpuser,
      [e.target.name]: e.target.value,
      success: "",
    };
    props.signUpFormChange(user);
  };

  //signInFormhandleChange
  const signInFormhandleChange = (e) => {
    let user = {
      ...props.signInuser,
      [e.target.name]: e.target.value,
      logsuccess: "",
    };
    props.signInFormChange(user);
  };
  //signUphandleSubmit
  const signUphandleSubmit = (e) => {
    e.preventDefault();
    let user = {
      ...props.signUpuser,
      error: false,
      loading: true,
      disabled: true,
      success: "",
    };
    const userPayload = props.signUpFormChange(user);
    props.signUpFormSubmit(userPayload.payload);
  };
  //signInFormSubmit
  const signInFormSubmit = (e) => {
    e.preventDefault();
    let user = {
      ...props.signInuser,
      logerror: false,
      logloading: true,
      logdisabled: true,
      logsuccess: "",
    };
    const userPayload = props.signInFormChange(user);
    props.signInFormSubmit(userPayload.payload);
  };

  //SignIn Form
  const signInForm = () => (
    <div className={homeStyles.homepage__BothFormControl}>
      <Col>
        <h5 className={`${homeStyles.homepage__headingFive} heading-five`}>
          Login your account
        </h5>
      </Col>
      <Col>
        <Form
          className={homeStyles.homepage__FormControl__loginForm}
          onSubmit={signInFormSubmit}
        >
          <Form.Group
            controlId="loginemail"
            className={`${homeStyles.homepage__FormControl__group}`}
          >
            <i
              className={`far fa-envelope ${homeStyles.homepage__FormControl__i}`}
            ></i>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="logemail"
              value={logemail}
              onChange={signInFormhandleChange}
              required
              className={`Page__FormControl__input`}
            />
          </Form.Group>

          <Form.Group
            controlId="loginPassword"
            className={`${homeStyles.homepage__FormControl__group}`}
          >
            <Col>
              <i
                className={`fas fa-unlock-alt ${homeStyles.homepage__FormControl__i}`}
              ></i>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                name="logpassword"
                value={logpassword}
                onChange={signInFormhandleChange}
                required
                className={`Page__FormControl__input`}
              />
            </Col>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={logdisabled}
            className={`${homeStyles.homepage__FormControl__group} ${homeStyles.signInbtn} customBtn`}
          >
            Log in
          </Button>
        </Form>
      </Col>
    </div>
  );

  //SignUp Form
  const signUpForm = () => (
    <div className={homeStyles.homepage__BothFormControl}>
      <Col>
        <h5 className={`${homeStyles.homepage__headingFive} heading-five`}>
          Create Your Account
        </h5>
      </Col>
      <Col>
        <Form
          className={homeStyles.homepage__FormControl__SignUpForm}
          onSubmit={signUphandleSubmit}
        >
          <Form.Group
            controlId="signUpname"
            className={`mb-3 ${homeStyles.homepage__FormControl__group}`}
          >
            <i
              className={`far fa-user ${homeStyles.homepage__FormControl__i}`}
            ></i>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={signUpFormhandleChange}
              required
              className={`Page__FormControl__input ${homeStyles.homepage__FormControl__inputModifire}`}
            />
          </Form.Group>

          <Form.Group
            controlId="signUpemail"
            className={`mb-3 ${homeStyles.homepage__FormControl__group}`}
          >
            <i
              className={`far fa-envelope ${homeStyles.homepage__FormControl__i}`}
            ></i>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={signUpFormhandleChange}
              required
              className={`Page__FormControl__input`}
            />
          </Form.Group>

          <Form.Group
            controlId="signUppassword"
            className={`mb-3 ${homeStyles.homepage__FormControl__group}`}
          >
            <Col>
              <i
                className={`fas fa-unlock-alt ${homeStyles.homepage__FormControl__i}`}
              ></i>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={signUpFormhandleChange}
                required
                className={`Page__FormControl__input`}
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="signUpconfirmpassword"
            className={`mb-3 ${homeStyles.homepage__FormControl__group}`}
          >
            <Col>
              <i
                className={`fas fa-unlock-alt ${homeStyles.homepage__FormControl__i}`}
              ></i>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password_confirmation"
                value={password_confirmation}
                onChange={signUpFormhandleChange}
                required
                className={`Page__FormControl__input`}
              />
            </Col>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={disabled}
            className={`${homeStyles.homepage__FormControl__group} customBtn ${homeStyles.signUpbtn}`}
          >
            Sign Up
          </Button>
        </Form>
      </Col>
    </div>
  );

  //RedirectUser
  const RedirectUser = () => {
    const auth = isAuthenticated();
    if (logredirect || auth) {
      return <Navigate to={`${userInfo().role}/dashboard`} />;
    }
  };

  return (
    <Fragment>
      <Container className={`${homeStyles.homepage} Page`} fluid>
        <Row className={homeStyles.homepage__heightControl}>
          <Col
            sm={12}
            md={6}
            lg={6}
            className={homeStyles.homepage__heightControl}
          >
            <h1 className="heading-one">welcome</h1>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={6}
            className={`${homeStyles.homepage__heightControl} ${homeStyles.homepage__FormControl}`}
          >
            {/* RedirectUser */}
            {RedirectUser()}
            {/* showSuccess */}
            {SuccessMsg(success)}
            {/* showError */}
            {ErrorMsg(logerror)}
            {ErrorMsg(error)}
            {/* Spinner */}
            {ShowLoading(logloading)}
            {/* SignIn Form code start */}
            {signInForm()}
            {/* SignIn Form code end */}
            {/* SignUp Form code start */}
            {signUpForm()}
            {/* SignUp Form code end */}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
