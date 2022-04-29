import React, { useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { userInfo } from "./../../utils/Auth";
import { connect } from "react-redux";
import { actionProfileUpdateForm } from "./../../redux/ActionCreators";
import { SuccessMsg } from "./../../utils/Messages";
import { profileUpdate } from "./../../redux/ActionTypes";
function mapStateToProps(state) {
  console.log("Hello i am profileset.js file");
  console.log(state);
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    uploadImage: () => {
      dispatch({
        type: profileUpdate,
        payload: {
          formData: new FormData(),
          success: "please upload an image!",
          error: false,
          disabled: false,
        },
      });
    },
    profileUpdateFormSubmit: function (token, formData) {
      return dispatch(actionProfileUpdateForm(token, formData));
    },
  };
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

//ProfileSet Component
function ProfileSet(props) {
  const [files, setFiles] = useState([]);
  const { formData, success, error, disabled } = props.profileUpdate;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  //handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    const { token } = userInfo();
    formData.set("profile", files[0]);
    if (!files[0]) {
      props.uploadImage();
    } else {
      props.profileUpdateFormSubmit(token, formData);
    }
  }
  return (
    <Container className="Page" fluid>
      <Row>
        <Col className="Page__FormControl content ">
          <Form
            onSubmit={handleSubmit}
            className="Page__FormControl__Form Page__BothFormControl"
          >
            {SuccessMsg(success)}
            {SuccessMsg(error)}
            <Col {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p className="alertBox alertParagraph">
                Drag 'n' drop some files here
              </p>
              <Button
                type="button"
                onClick={open}
                className="customBtn submitUpbtn openFileDialogBtn"
              >
                Open File Dialog
              </Button>
            </Col>
            <aside>
              <h5 className="heading-five">Files </h5>
              <ul>{filepath}</ul>
            </aside>
            <aside style={thumbsContainer}>{thumbs}</aside>
            <Button
              variant="primary"
              type="submit"
              className="customBtn submitUpbtn"
              disabled={disabled}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSet);
// function ProfileSet() {
//   let [values, setValues] = useState({
//     formData: "",
//   });
//   let { formData } = values;
//   useEffect(function () {
//     setValues({
//       ...values,
//       formData: new FormData(),
//     });
//   }, []);
//   function handleChange(e) {
//     formData.set(e.target.name, e.target.files[0]);
//     setValues({
//       ...values,
//       [e.target.name]: e.target.files[0],
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     //console.log(values);
//     console.log(formData);
//   }
//   return (
//     <Container className="Page" fluid>
//       <Row>
//         <Col className="Page__FormControl content">
//           <Form onSubmit={handleSubmit} className="Page__FormControl__Form">
//             <Form.Group controlId="addcandidatename" className={`mb-3`}>
//               <Form.Control
//                 type="file"
//                 name="name"
//                 onChange={handleChange}
//                 required
//                 className="Page__FormControl__input clear_candidateforminput-data"
//               />
//             </Form.Group>
//             <Button
//               variant="primary"
//               type="submit"
//               className="customBtn submitUpbtn"
//             >
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
// export default ProfileSet;
