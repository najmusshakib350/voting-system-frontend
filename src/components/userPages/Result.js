import { Fragment, useEffect, useState } from "react";
import Navbar from "../usernavbar/Navbar";
import styles from "./Result.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { connect } from "react-redux";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { CandidateInfoArray } from "./../blockchain/LoadCandidate";
import { SuccessMsg } from "./../../utils/Messages";
//redux state
function mapStateToProps(state) {
  return state;
}

//Result Component
function Result(props) {
  const [candidate, setCandidate] = useState([]);
  const { start, stop } = props.adminStateChange;
  let filterArr = [];
  //useEffect hook
  useEffect(function () {
    document.title = "Result";
  }, []);
  useEffect(function () {
    //LoadWeb3 and LoadBlockchainData code start
    LoadWeb3()
      .then((res) => {})
      .catch((err) => {});
    LoadBlockchainData()
      .then((res) => {})
      .catch((err) => {});
    //LoadWeb3 and LoadBlockchainData code end
    //Retrive candidate details information code start
    window.contract.methods
      .retriveCandidate()
      .call()
      .then((getCandidate) => setCandidate(getCandidate))
      .catch((err) => {});
    //Retrive candidate details information code end
  }, []);

  //winnerCandidateObject  function code start
  function winnerCandidateObject(filterArr) {
    let arr = filterArr.map(function (el, i) {
      return parseInt(el.votecount);
    });
    let maxvalue = Math.max(...arr);
    let winnerCandidate = filterArr.filter(
      (el) => el.votecount === String(maxvalue)
    );

    return winnerCandidate;
  }
  //otherCandidateObjects function code start
  function otherCandidateObjects(filterArr) {
    let arr = filterArr.map(function (el, i) {
      return parseInt(el.votecount);
    });
    let maxvalue = Math.max(...arr);
    let arrOthercandidates = filterArr.filter(
      (el) => el.votecount != String(maxvalue)
    );
    return arrOthercandidates;
  }
  //candidate info array function
  let returnFilterArr = CandidateInfoArray(candidate, filterArr);
  const wincandidate = winnerCandidateObject(returnFilterArr);
  //winnerCandidate
  function winnerCandidate() {
    if (wincandidate.length > 0) {
      let ArrReturn = "";

      ArrReturn = wincandidate.map((el, i) => {
        return (
          <Col
            className={styles.result__candidatecontent}
            key={i + Math.random() + "win"}
          >
            <p
              className={`${styles.result__paragraph} ${styles.result__winnerparagraph}`}
            >
              Name
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__winnerparagraph}`}
            >
              {el.name}
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__winnerparagraph}`}
            >
              Total Vote
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__winnerparagraph}`}
            >
              {el.votecount}
            </p>
          </Col>
        );
      });
      return (
        <Fragment>
          <h5 className="heading-five text-center mt-5">Winner Candidate</h5>
          {ArrReturn}
        </Fragment>
      );
    }
  }
  //otherCandidate
  function otherCandidate() {
    let othersCandidates = otherCandidateObjects(returnFilterArr);
    if (othersCandidates.length > 0) {
      let ArrReturn = "";
      ArrReturn = othersCandidates.map((el, i) => {
        return (
          <Col
            className={styles.result__candidatecontent}
            key={i + Math.random() + "oth"}
          >
            <p
              className={`${styles.result__paragraph} ${styles.result__othcandidateparagraph}`}
            >
              Name
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__othcandidateparagraph}`}
            >
              {el.name}
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__othcandidateparagraph}`}
            >
              Total Vote
            </p>
            <p
              className={`${styles.result__paragraph} ${styles.result__othcandidateparagraph}`}
            >
              {el.votecount}
            </p>
          </Col>
        );
      });
      return (
        <Fragment>
          <h5 className="heading-five text-center mt-5">Other Candidate</h5>
          {ArrReturn}
        </Fragment>
      );
    }
  }
  return (
    <Fragment>
      <Navbar />
      <Container className={`${styles.result}`} fluid>
        <Row>
          <Col className={`content`}>
            <Col className="mt-3">
              {stop ? winnerCandidate() : ""}
              {stop ? otherCandidate() : ""}
              {start ? SuccessMsg("voting is still going on") : ""}
              {!start && !stop
                ? SuccessMsg("There are currently no votes and no result")
                : ""}
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
export default connect(mapStateToProps)(Result);
