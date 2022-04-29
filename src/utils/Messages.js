import { Alert, Spinner } from "react-bootstrap";
export const ErrorMsg = (error) => {
  if (error) {
    return (
      <Alert variant="success" className="alertBox hideAlertBox">
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>
    );
  }
};
export const SuccessMsg = (success) => {
  if (success) {
    return (
      <Alert variant="success" className="alertBox hideAlertBox">
        <Alert.Heading>{success}</Alert.Heading>
      </Alert>
    );
  }
};

export const ShowLoading = (loading) => {
  if (loading) {
    return (
      <Spinner animation="border" role="status" className={`spinnerStyle `}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
};
