import { Fragment, useEffect, useState } from "react";
import Navbar from "../adminnavbar/Navbar";
import styles from "./ApproveVoter.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { VoterInfoArray } from "./../blockchain/LoadVoter";

function ApproveVoter(props) {
  const [value, setValue] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [getVoter, setVoter] = useState([]);
  let filterArr = [];
  //useEffect hook
  useEffect(function () {
    document.title = "Approve Voter";
  }, []);
  useEffect(
    function () {
      //immediate invoke function for LoadWeb3 and LoadBlockchainData code start
      LoadWeb3()
        .then((res) => {})
        .catch((err) => {});
      LoadBlockchainData()
        .then((res) => {})
        .catch((err) => {});
      //immediate invoke function for LoadWeb3 and LoadBlockchainData code end
      //Retrive voter details information code start
      window.contract.methods
        .retriveVoter()
        .call()
        .then((voterList) => setVoter(voterList))
        .catch((err) => {});
      //Retrive voter details information code end
    },
    [value]
  );

  function handleSubmit(e, nid) {
    e.preventDefault();
    //blockchain code start for admin account checking
    window.web3.eth
      .getAccounts()
      .then(function (accounts) {
        if (accounts[0] === "0x0bA8Fc88675FDbD256A1855A6A27Ec01eDc71873") {
          return window.contract.methods
            .activeVoter(parseInt(nid))
            .send({ from: accounts[0] });
        } else {
          return "You are not permited for this action!!!";
        }
      })
      .then(function (transaction) {
        if (transaction.status === true) {
          setValue(!value);
        } else {
          setPermissionError(transaction);
        }
      })
      .catch(function (err) {
        console.log("Hello i am metamask error for registered voter");
      });
    ////blockchain code end for admin account checking
  }

  //voter info array function
  let returnVoterArr = VoterInfoArray(getVoter, filterArr, 0);

  //voter info array function
  function VoterInfoReturnArray() {
    return returnVoterArr.map(function (el, i) {
      return (
        <Form
          onSubmit={(e) => handleSubmit(e, el.nid)}
          className={`Page__FormControl__Form ${styles.ApproveVoter__Form}`}
          key={i + Math.random()}
        >
          <Form.Group
            controlId="addcandidatename"
            className={`mb-3 ${styles.ApproveVoter__FormItemNid}`}
          >
            <Form.Control
              type="text"
              name="nid"
              value={el.nid}
              readOnly
              className={`Page__FormControl__input clear_candidateforminput-data ${styles.ApproveVoter__FormItem} `}
            />
          </Form.Group>

          <Form.Group
            controlId="addcandidateage"
            className={`mb-3 ${styles.ApproveVoter__FormItem} ${styles.ApproveVoter__FormItemStatus}`}
          >
            <Form.Control
              type="text"
              name="status"
              value={el.status}
              readOnly
              className={`Page__FormControl__input clear_candidateforminput-data ${styles.ApproveVoter__FormItem} `}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={`customBtn submitUpbtn  ${styles.ApproveVoter__FormItemBtn}`}
          >
            yes
          </Button>
        </Form>
      );
    });
  }

  const VoterListForm = () => (
    <div className={`Page__BothFormControl ${styles.ApproveVoter}`}>
      <Col>
        <h5 className="heading-five">Approve Voter List</h5>
      </Col>
      <Col>
        <p className="alertBox alertParagraph">{permissionError}</p>
      </Col>
      <Col>{getVoter.length > 0 ? VoterInfoReturnArray() : ""}</Col>
    </div>
  );

  return (
    <Fragment>
      <Navbar />
      <Container className="Page" fluid>
        <Row>
          <Col className="Page__FormControl content">{VoterListForm()}</Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default ApproveVoter;
