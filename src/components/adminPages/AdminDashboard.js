import { Fragment, useEffect } from "react";

import Navbar from "../adminnavbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

function AdminDashboard() {
  useEffect(function () {
    document.title = "Admin Dashboard";
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <Row>
          <Col className={`content`}>
            <Col className="mt-3 instruction">
              <h5 className="heading-five mb-4">Guidelines for admin</h5>
              <h6 className="heading-six color-black mb-4">1. Add Candidate</h6>
              <ul>
                <li>
                  <span>
                    To add candidate information you have to go to "Add
                    Candidate" option where you have to provide name,age,
                    metamask,party,NID number,educational qualification.{" "}
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">2. Approve Voter</h6>
              <ul>
                <li>
                  <span>
                    You can approve those voters who completed voter
                    registrationn. So to do this you have to go to "Approve
                    Voter" option.
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">3. Change State</h6>
              <ul>
                <li>
                  <span>
                    Only Admin cand start or stop voting. So at the time of
                    voting you need to start voting by clicking "Changing state"
                    option.
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">
                4. Candidate Details
              </h6>
              <ul>
                <li>
                  <span>
                    After adding candidates, if you want to see the candidates
                    you added you can do it by pressing "Candidate Details"
                    option.
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">5. Mode Change</h6>
              <ul>
                <li>
                  <span>
                    Admin can also cast vote for this you need to change the
                    admin mode to user mode. After that you find the user
                    instruction.{" "}
                    <p>
                      <strong>Note: </strong>An admin also needs to perform
                      voter registration for voting.
                    </p>
                  </span>
                </li>
              </ul>
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
export default AdminDashboard;
