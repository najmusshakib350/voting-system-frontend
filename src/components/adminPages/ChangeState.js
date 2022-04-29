import { Fragment, useEffect } from "react";
import styles from "./ChangeState.module.css";
import Navbar from "../adminnavbar/Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { SuccessMsg } from "./../../utils/Messages";

//redux state
function mapStateToProps(state) {
  return state;
}
//redux dispatch
function mapDispatchToProps(dispatch) {
  return {
    voteStart: function () {
      return dispatch({
        type: "adminStateChange",
        payload: {
          start: true,
          stop: false,
          startSuccessMsg: "Vote start is successfully!",
          stopSuccessMsg: "",
        },
      });
    },
    voteStop: function () {
      return dispatch({
        type: "adminStateChange",
        payload: {
          start: false,
          stop: true,
          stopSuccessMsg: "Vote end is successfully!",
          startSuccessMsg: "",
        },
      });
    },
  };
}

function ChangeState(props) {
  const { startSuccessMsg, stopSuccessMsg } = props.adminStateChange;
  //useEffect hook
  useEffect(function () {
    document.title = "Change State";
  }, []);
  function startHandleClick() {
    props.voteStart();
  }
  function stopHandleClick() {
    props.voteStop();
  }
  return (
    <Fragment>
      <Navbar />
      <Container className={`${styles.changestate}`} fluid>
        <Row>
          <Col className={`content`}>
            <Col>
              <h5 className="heading-five text-center mt-5">
                Admin can start or end votestate
              </h5>
              {SuccessMsg(startSuccessMsg)}
              {SuccessMsg(stopSuccessMsg)}
            </Col>
            <Col className="text-center">
              <Button
                variant="primary"
                type="button"
                className={`customBtn  ${styles.submitUpbtn}`}
                onClick={startHandleClick}
              >
                start
              </Button>
              <Button
                variant="primary"
                type="button"
                className={`customBtn ${styles.submitUpbtn}`}
                onClick={stopHandleClick}
              >
                stop
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeState);
