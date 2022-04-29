import { Fragment, useState, useEffect } from "react";
import Navbar from "../adminnavbar/Navbar";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ErrorMsg, SuccessMsg } from "./../../utils/Messages";
import { ValidNidNumber } from "./../../utils/ApiData";
import { CandidateInfoArray } from "./../blockchain/LoadCandidate";

function AddCandidate() {
  //react state code start
  const [candidate, setCandidate] = useState([]);
  const [values, setValues] = useState({
    name: "",
    age: "",
    party: "",
    qualification: "",
    nidnumber: "",
    success: "",
    error: "",
  });
  const [formErrors, setFormErrors] = useState({});
  //react state code end
  let { name, age, party, qualification, nidnumber, success, error } = values;
  let {
    nameMessage,
    ageMessage,
    partyMessage,
    qualificationMessage,
    nidnumberMessage,
  } = formErrors;
  let filterArr = [];
  //useEffect hook
  useEffect(function () {
    document.title = "Add Candidate";
  }, []);

  useEffect(() => {
    //Retrive Valid Nid number
    window.voterInfo = ValidNidNumber();
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
    if (
      Object.keys(formErrors).length === 0 &&
      name &&
      age &&
      party &&
      qualification &&
      nidnumber
    ) {
      //blockchain code start for admin account checking
      window.web3.eth
        .getAccounts()
        .then(function (accounts) {
          if (accounts[0] === "0x0bA8Fc88675FDbD256A1855A6A27Ec01eDc71873") {
            return window.contract.methods
              .Addcandidate(
                name,
                party,
                parseInt(age),
                qualification,
                nidnumber
              )
              .send({ from: accounts[0] });
          } else {
            return "You are not permited for this action!!!";
          }
        })
        .then(function (transaction) {
          if (transaction.status === true) {
            setValues({
              name: "",
              age: "",
              party: "",
              qualification: "",
              nidnumber: "",
              success: "Candidate Add Successfull!!!",
              error: "",
            });
          } else {
            setValues({
              ...values,
              error: transaction,
            });
          }
        })
        .catch(function (err) {
          setValues({
            ...values,
            error: "Something Wrong! Try Again",
          });
        });
      ////blockchain code end for admin account checking
    }
  }, [formErrors]);

  //candidate info array function
  let returnFilterArr = CandidateInfoArray(candidate, filterArr);
  //handleChange
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }
  //handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(values));
  }
  //validate input field
  function validate(values) {
    const errors = {};
    //name field
    const nameRegex = /^[A-Za-z\s]+$/gi;
    const namePattern = nameRegex.test(values.name);
    if (values.name.length >= 3 && values.name.length <= 20 && namePattern) {
    } else {
      const message =
        "please enter more than or equal 3 and less than or equal 20  letter!!!";
      errors.nameMessage = message;
    }
    //age field
    const ageRegex = /\d/g;
    const agePattern = ageRegex.test(values.age);
    if (
      values.age.length >= 2 &&
      values.age.length <= 3 &&
      parseInt(values.age) <= 130 &&
      parseInt(values.age) >= 25 &&
      agePattern
    ) {
    } else {
      const message =
        "please enter digit more than or equal 25 and less than or equal 130 digit value!!!";
      errors.ageMessage = message;
    }
    //party field

    if (values.party.length >= 2 && values.party.length <= 20) {
    } else {
      const message =
        "please enter more than or equal 2 and less than or equal 20  character!!!";
      errors.partyMessage = message;
    }
    //qualification field
    const qualificationRegex = /^[A-Z.?a-z.?\s]+$/gi;
    const qualificationPattern = qualificationRegex.test(values.qualification);
    if (
      values.qualification.length >= 3 &&
      values.qualification.length <= 20 &&
      qualificationPattern
    ) {
    } else {
      const message =
        "please enter more than or equal 3 and less than or equal 20  letter!!!";
      errors.qualificationMessage = message;
    }
    //valid NidNumber
    let oneVoter = window.voterInfo.find(
      (el) => el.nidnumber === values.nidnumber
    );
    let avoidDuplicate = returnFilterArr.find(
      (el) => parseInt(el.nidnumber) === parseInt(values.nidnumber)
    );
    if (!oneVoter) {
      const message = "please enter valid nid number!!!";
      errors.nidnumberMessage = message;
    } else if (avoidDuplicate) {
      const message = "This nid is already used!!!";
      errors.nidnumberMessage = message;
    }

    return errors;
  }

  //clear errors message code start
  function handlenameMessageClick() {
    setFormErrors({
      ...formErrors,
      nameMessage: "",
    });
  }
  function handleageMessageClick() {
    setFormErrors({
      ...formErrors,
      ageMessage: "",
    });
  }
  function handlepartyMessageClick() {
    setFormErrors({
      ...formErrors,
      partyMessage: "",
    });
  }
  function handlequalificationMessageClick() {
    setFormErrors({
      ...formErrors,
      qualificationMessage: "",
    });
  }
  function handleNidnumberMessageClick() {
    setFormErrors({
      ...formErrors,
      nidnumberMessage: "",
    });
  }
  //clear error messsage end

  //AddCandidateForm
  const AddCandidateForm = () => (
    <div className="Page__BothFormControl">
      <Col>
        <h5 className="heading-five">Add Candidate</h5>
      </Col>
      <Col>
        {SuccessMsg(success)}
        {ErrorMsg(error)}
      </Col>
      <Col>
        <Form onSubmit={handleSubmit} className="Page__FormControl__Form">
          <Form.Group controlId="addcandidatename" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Candidate Name"
              name="name"
              value={name}
              onChange={handleChange}
              onClick={handlenameMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{nameMessage}</p>
          </Form.Group>

          <Form.Group controlId="addcandidateage" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Candidate Age"
              name="age"
              value={age}
              onChange={handleChange}
              onClick={handleageMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{ageMessage}</p>
          </Form.Group>

          <Form.Group controlId="addcandidateparty" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Candidate Party"
              name="party"
              value={party}
              onChange={handleChange}
              onClick={handlepartyMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{partyMessage}</p>
          </Form.Group>

          <Form.Group controlId="addcandidatequalification" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Candidate Qualification"
              name="qualification"
              value={qualification}
              onChange={handleChange}
              onClick={handlequalificationMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{qualificationMessage}</p>
          </Form.Group>
          <Form.Group controlId="addcandidatenidnumber" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Candidate Nidnumber"
              name="nidnumber"
              value={nidnumber}
              onChange={handleChange}
              onClick={handleNidnumberMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{nidnumberMessage}</p>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="customBtn submitUpbtn"
          >
            Submit
          </Button>
        </Form>
      </Col>
    </div>
  );

  return (
    <Fragment>
      <Navbar />
      <Container className="Page" fluid>
        <Row>
          <Col className="Page__FormControl content">{AddCandidateForm()}</Col>
        </Row>
      </Container>
    </Fragment>
  );
}
export default AddCandidate;
