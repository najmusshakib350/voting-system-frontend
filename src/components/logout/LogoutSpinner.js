import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "./../../utils/Auth";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./LogoutSpinner.module.css";
import { connect } from "react-redux";
import {
  actionChangeSignUpForm,
  actionChangeSignInForm,
} from "./../../redux/AuthActionCreators";

//redux state
function mapStateToProps(state) {
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
  };
}

//Logout Component
function Logout(props) {
  const navigate = useNavigate();
  //useEffect hook
  useEffect(function () {
    setTimeout(function () {
      signOut(function () {
        navigate("/", { replace: true });
      });
    }, 1000);
    return function () {
      LogOutShowLoading(false);
    };
  });
  //redux state change

  function changeState() {
    props.signInFormChange({
      ...props.signInuser,
      logpassword: "",
      logerror: false,
      logloading: false,
      logdisabled: false,
      logredirect: false,
      logsuccess: false,
      logalethide: false,
    });
    props.signUpFormChange({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: false,
      loading: false,
      disabled: false,
      success: false,
      alethide: false,
    });
  }
  //LogOutShowLoading Text function
  function LogOutShowLoading(loading) {
    if (loading) {
      return (
        <Container fluid className={styles.container}>
          <Row>
            <Col className={styles.column}>
              <h5 className={`${styles.paragraph} heading-five`}>
                Please Wait...
              </h5>
            </Col>
          </Row>
        </Container>
      );
    }
  }
  return (
    <Fragment>
      {LogOutShowLoading(true)}
      {setTimeout(function () {
        changeState();
      }, 1000)}
    </Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
