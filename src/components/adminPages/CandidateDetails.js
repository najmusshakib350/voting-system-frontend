import { Fragment, useEffect, useState } from "react";
import Navbar from "../adminnavbar/Navbar";
import styles from "./CandidateDetails.module.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { CandidateInfoArray } from "./../blockchain/LoadCandidate";
//CandidateDetails Component
function CandidateDetails() {
  //react state code start
  const [candidate, setCandidate] = useState([]);
  //react state code end
  let filterArr = [];
  //useEffect hook
  useEffect(function () {
    document.title = "Candidate Details";
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

  //candidate info array function
  let returnFilterArr = CandidateInfoArray(candidate, filterArr);
  //CandidateInfoReturnArray function
  function CandidateInfoReturnArray() {
    return returnFilterArr.map(function (el, i) {
      return (
        <tr key={i + Math.random()}>
          <td className={styles.table__columnData}>{i}</td>
          <td className={styles.table__columnData}>{el.name}</td>
          <td className={styles.table__columnData}>{el.party}</td>
          <td
            className={`${styles.table__columnData} ${styles.table__columnDataHide}`}
          >
            {el.age}
          </td>
          <td
            className={`${styles.table__columnData} ${styles.table__columnDataHide}`}
          >
            {el.qualification}
          </td>
          <td className={styles.table__columnData}>{el.nidnumber}</td>
          <td className={styles.table__columnData}>{el.votecount}</td>
        </tr>
      );
    });
  }

  return (
    <Fragment>
      <Navbar />
      <Container className={`${styles.candidatedetails}`} fluid>
        <Row>
          <Col className={`content`}>
            <Col>
              <h5 className="heading-five text-center mt-5">
                Candidate Details
              </h5>
            </Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className={styles.table__columnData}>SN</th>
                  <th className={styles.table__columnData}>Name</th>
                  <th className={styles.table__columnData}>Party</th>
                  <th
                    className={`${styles.table__columnData} ${styles.table__columnDataHide}`}
                  >
                    Age
                  </th>
                  <th
                    className={`${styles.table__columnData} ${styles.table__columnDataHide}`}
                  >
                    Qualification
                  </th>
                  <th className={styles.table__columnData}>NidNumber</th>
                  <th className={styles.table__columnData}>Votes</th>
                </tr>
              </thead>
              <tbody>{CandidateInfoReturnArray()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
export default CandidateDetails;
