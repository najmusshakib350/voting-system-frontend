import { Fragment, useEffect } from "react";

import Navbar from "./../usernavbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

function UserDashboard() {
  useEffect(function () {
    document.title = "User Dashboard";
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <Row>
          <Col className={`content`}>
            <Col className="mt-3 instruction">
              <h5 className="heading-five mb-4">Guidelines for user</h5>
              <h6 className="heading-six color-black mb-4">
                1. Voter Registration
              </h6>
              <ul>
                <li>
                  <span>
                    In voter registration section you need to provide your NID
                    number and MetaMask address provided by your NID card.{" "}
                  </span>
                </li>
                <li>
                  <span>
                    After giving these information you found a popup appearing
                    and you will be given an OTP code through your gmail
                    address.
                  </span>
                </li>
                <li>
                  <span>
                    Give this otp to the popup field and complete your voting
                    registration. After completing registration,please wait for
                    admin approval.
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">
                2. Voting Process
              </h6>
              <ul>
                <li>
                  <span>
                    After getting admin approval go to voting area and vote for
                    your candidate.
                  </span>
                </li>
              </ul>
              <h6 className="heading-six color-black mb-4">3. Voting Result</h6>
              <ul>
                <li>
                  <span>
                    After completing the vote you will see the final result.
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
export default UserDashboard;
