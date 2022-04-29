import { Fragment, useState, useEffect } from "react";
import Navbar from "./../usernavbar/Navbar";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { userInfo } from "./../../utils/Auth";
import { SuccessMsg, ErrorMsg } from "./../../utils/Messages";
import { ValidNidNumber } from "./../../utils/ApiData";
import { SendOTP, CheckValidOTP } from "./../../utils/ApiData";
import { LoadWeb3 } from "./../blockchain/LoadWeb3";
import { LoadBlockchainData } from "./../blockchain/LoadBlockchainData";
import { connect } from "react-redux";
import { VoterInfoArray } from "./../blockchain/LoadVoter";
//redux state
function mapStateToProps(state) {
  return state;
}
//VoterRegistration Component
function VoterRegistration(props) {
  //react state code start
  const [show, setShow] = useState(false);
  const [otpValue, setOtpValue] = useState({
    otpnumber: "",
  });
  const [values, setValues] = useState({
    nidnumber: "",
    address: "",
    disabled: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [voterresponse, setVoterresponse] = useState({
    voterSuccess: "",
    voterError: "",
  });
  const [getVoter, setVoter] = useState([]);
  //react state code end

  let voterArr = [];
  let { nidnumber, address, disabled } = values;
  let { nidnumberMessage, addressMessage } = formErrors;
  let { otpnumber } = otpValue;
  let { voterSuccess, voterError } = voterresponse;
  const { id, token } = userInfo();

  //useEffect hook
  useEffect(function () {
    document.title = "Voter Registration";
  }, []);

  useEffect(() => {
    //Retrive Valid Nid number
    window.voterInfo = ValidNidNumber();
    if (Object.keys(formErrors).length === 0 && nidnumber && address) {
      SendOTP(token)
        .then(function (res) {
          setValues({
            ...values,
            disabled: true,
          });
        })
        .catch(function (err) {});
    }
  }, [formErrors]);
  //useEffect hook

  useEffect(function () {
    //LoadWeb3 and LoadBlockchainData code start
    LoadWeb3()
      .then((res) => {})
      .catch((err) => {});
    LoadBlockchainData()
      .then((res) => {})
      .catch((err) => {});
    //LoadWeb3 and LoadBlockchainData code end
    //Retrive voter details information code start
    window.contract.methods
      .retriveVoter()
      .call()
      .then((voterList) => setVoter(voterList))
      .catch((err) => {});
    //Retrive voter details information code end
  }, []);

  let returnVoterArr = VoterInfoArray(getVoter, voterArr);
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
    //valid NidNumber
    let oneVoter = window.voterInfo.find(
      (el) => el.nidnumber === values.nidnumber
    );
    //valid Metamask Address
    let voterValidAddress = window.voterInfo.find(
      (el) => el.address === values.address
    );
    //avoidDuplicate NidNumber,email and Metamask account
    let avoidDuplicate = returnVoterArr.find((el) => {
      let elementAddress = el.address;
      let inputAddress = values.address;

      return (
        parseInt(el.nid) === parseInt(values.nidnumber) ||
        el.email === props.getUserProfile.email ||
        elementAddress === inputAddress
      );
    });
    if (!oneVoter) {
      const message = "please enter valid nid number!!!";
      errors.nidnumberMessage = message;
    } else if (avoidDuplicate) {
      const message = "you are already registered voter!!!";
      errors.addressMessage = message;
    } else if (!voterValidAddress) {
      const message = "please enter valid Address!!!";
      errors.addressMessage = message;
    }
    return errors;
  }
  ////clear error messsage end
  function handleNidnumberMessageClick() {
    setFormErrors({
      ...formErrors,
      nidnumberMessage: "",
    });
  }
  function handleAddressMessageClick() {
    setFormErrors({
      ...formErrors,
      addressMessage: "",
    });
  }
  //clear error messsage end
  //Modal Code Start
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const OtphandleChange = (e) => {
    setOtpValue({
      ...otpValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    CheckValidOTP(token, otpnumber)
      .then(function (res) {
        //blockchain code start for admin account checking
        window.web3.eth
          .getAccounts()
          .then(function (accounts) {
            let checkValidAddress = accounts[0] === address;
            if (checkValidAddress) {
              return window.contract.methods
                .Voterregistation(parseInt(nidnumber), res.data.email, address)
                .send({ from: accounts[0] });
            } else {
              throw "Your connected metamask address is invalid!";
            }
          })
          .then(function (transaction) {
            if (transaction.status === true) {
              setVoterresponse({
                voterSuccess: res.data.message,
                voterError: "",
              });
            } else {
            }
          })
          .catch(function (err) {
            if (err) {
              setVoterresponse({
                voterSuccess: "",
                voterError: err,
              });
            } else {
              setVoterresponse({
                voterSuccess: "",
                voterError: "Insufficient Fund or Metamask Error!",
              });
            }
          });
        ////blockchain code end for admin account checking
      })
      .catch(function (err) {
        setVoterresponse({
          voterSuccess: "",
          voterError: "OTP is invalid or has expired",
        });
      });
  };
  //Modal JSX code start
  const ModalForm = () => (
    <div className="Page__BothFormControl">
      <Col>
        <Form
          onSubmit={handleModalFormSubmit}
          className="Page__FormControl__Form"
        >
          <Form.Group controlId="otpnumber" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Your OTP"
              name="otpnumber"
              value={otpnumber}
              onChange={OtphandleChange}
              required
              className="Page__FormControl__input"
            />
          </Form.Group>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="customBtn submitUpbtn"
          >
            cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleClose}
            className="customBtn submitUpbtn"
          >
            send
          </Button>
        </Form>
      </Col>
    </div>
  );
  //Modal JSX code end

  function ModalFn() {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="heading-five">Check Your Email</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="modal__footer">{ModalForm()}</Modal.Footer>
      </Modal>
    );
  }
  //Modal Code End
  //VoterRegistration Form
  const VoterRegistationForm = () => (
    <div className="Page__BothFormControl">
      {!voterSuccess ? "" : SuccessMsg(voterSuccess)}
      {!voterError ? "" : ErrorMsg(voterError)}
      <Col>
        <h5 className="heading-five">Voter Registration</h5>
      </Col>
      <Col></Col>
      <Col>
        <Form onSubmit={handleSubmit} className="Page__FormControl__Form">
          <Form.Group controlId="registrationformnidfield" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Your Nidnumber"
              name="nidnumber"
              value={nidnumber}
              onChange={handleChange}
              onClick={handleNidnumberMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{nidnumberMessage}</p>
          </Form.Group>
          <Form.Group controlId="metamaskaddress" className={`mb-3`}>
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              name="address"
              value={address}
              onChange={handleChange}
              onClick={handleAddressMessageClick}
              required
              className="Page__FormControl__input"
            />
            <p className="alertBox alertParagraph">{addressMessage}</p>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="customBtn submitUpbtn"
            onClick={handleShow}
            disabled={disabled}
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
          <Col className="Page__FormControl content">
            {VoterRegistationForm()}
            {Object.keys(formErrors).length === 0 && nidnumber && address
              ? ModalFn()
              : ""}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default connect(mapStateToProps)(VoterRegistration);
