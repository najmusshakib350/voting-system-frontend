import { Fragment, useEffect, useState } from "react";
import styles from "./VotingArea.module.css";
import Navbar from "./../usernavbar/Navbar";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { SuccessMsg, ErrorMsg } from "./../../utils/Messages";
import axios from "axios";
import { userInfo } from "../../utils/Auth";
import { actiongetUserProfile } from "./../../redux/ActionCreators";
import { VoterInfoArray } from "./../blockchain/LoadVoter";
import { CandidateInfoArray } from "./../blockchain/LoadCandidate";
//redux state
function mapStateToProps(state) {
  return state;
}
//redux dispatch
function mapDispatchToProps(dispatch) {
  return {
    userProfile: function (token, id) {
      return dispatch(actiongetUserProfile(token, id));
    },
  };
}
//VotingArea component
function VotingArea(props) {
  const [candidate, setCandidate] = useState([]);
  const [validVoter, setValidVoter] = useState([]);
  const [getVoter, setVoter] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState("");
  const { start, stop } = props.adminStateChange;
  let voterArr = [];
  let filterArr = [];
  //useEffect hook
  useEffect(function () {
    document.title = "Voting Area";
  }, []);

  useEffect(function () {
    //Check Valid Voter code start
    axios("http://localhost:3000/voterinfo.json")
      .then((res) => {
        setValidVoter(res.data.voterinfo);
      })
      .catch((err) => {});
    //Check Valid Voter code end
    //LoadWeb3 and LoadBlockchainData code start
    LoadWeb3()
      .then((res) => {})
      .catch((err) => {});
    LoadBlockchainData()
      .then((res) => {})
      .catch((err) => {});
    //LoadWeb3 and  LoadBlockchainData code end
    //Retrive candidate details information code start
    window.contract.methods
      .retriveCandidate()
      .call()
      .then((getCandidate) => setCandidate(getCandidate))
      .catch((err) => {});
    //Retrive candidate details information code end
    //Retrive voter details information code start
    window.contract.methods
      .retriveVoter()
      .call()
      .then((voterList) => setVoter(voterList))
      .catch((err) => {});
    //Retrive voter details information code end
  }, []);
  //
  useEffect(function () {
    const { token, id } = userInfo();
    props.userProfile(token, id);
  }, []);
  //voter info array function
  let returnVoterArr = VoterInfoArray(getVoter, voterArr);
  //voteHandleClick function
  function voteHandleClick(i) {
    window.web3.eth
      .getAccounts()
      .then(function (account) {
        //avoidDuplicate NidNumber,email and Metamask account
        let avoidDuplicate = returnVoterArr.find((el) => {
          let elementAddress = el.address;
          let inputAddress = account[0];
          return elementAddress === inputAddress;
        });
        if (avoidDuplicate) {
          return window.contract.methods
            .giveRightToVote(account[0])
            .send({ from: account[0] });
        } else {
          throw "Already voted.can not again vote! or invalid metamask account address";
        }
      })
      .then(function (res) {
        return window.contract.methods.vote(i).send({ from: res.from });
      })
      .then(function (res) {
        setAlreadyVoted("voted successfully!");
      })
      .catch(function (err) {
        if (err.message) {
          setAlreadyVoted(
            "Already voted.can not again vote! or invalid metamask account address"
          );
        } else {
          setAlreadyVoted(err);
        }
      });
  }
  //candidate info array function
  let returnFilterArr = CandidateInfoArray(candidate, filterArr);
  function CandidateInfoReturnArray() {
    return returnFilterArr.map(function (el, i) {
      //findout candidate image
      let voterimage = validVoter.find(
        (item) => item.nidnumber === el.nidnumber
      );
      if (voterimage) {
        voterimage = `/voterimages/${voterimage.image}`;
      } else {
        voterimage = "";
      }
      return (
        <Card
          style={{ width: "20rem" }}
          key={i + Math.random()}
          className="text-center"
        >
          <Card.Img variant="top" src={voterimage} />
          <Card.Body>
            <Card.Title
              className={`heading-five ${styles.votingarea__headingFive} mb-2`}
            >
              {el.name}
            </Card.Title>
            <Card.Text className={`${styles.votingarea__paragraph}`}>
              {el.party}
            </Card.Text>
            <Card.Text className={`${styles.votingarea__paragraph}`}>
              {el.qualification}
            </Card.Text>
            <Button
              variant="primary"
              type="button"
              className={`${styles.customBtn}`}
              onClick={() => voteHandleClick(i)}
            >
              vote
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }
  //showMessage for have one election or have no election

  function haveElection() {
    let lookCandidate = returnVoterArr.find((el) => {
      if (
        el.email === props.getUserProfile.email &&
        parseInt(el.status) === 1
      ) {
        return el;
      }
    });
    let hideCandidate = returnVoterArr.find((el) => {
      if (
        el.email === props.getUserProfile.email &&
        parseInt(el.status) === 0
      ) {
        return el;
      }
    });
    let sta = "";
    if (lookCandidate) {
      sta = lookCandidate.status;
    }
    if (hideCandidate) {
      sta = hideCandidate.status;
    }
    if (start && parseInt(sta) === 1) {
      return CandidateInfoReturnArray();
    } else if (stop) {
      return SuccessMsg("Vote is over! or At present have no vote!");
    } else if (parseInt(sta) === 0) {
      return SuccessMsg("Please wait for admin approval");
    } else {
      return SuccessMsg(
        "You are not registered voter!!! Please complete your voter registration"
      );
    }
  }
  return (
    <Fragment>
      <Navbar />
      <Container className={`${styles.votingarea}`} fluid>
        <Row>
          <Col
            className={`${styles.votingarea__cardcontrol} ${styles.content}`}
          >
            {ErrorMsg(alreadyVoted)}
            {haveElection()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(VotingArea);
