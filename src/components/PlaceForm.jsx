import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const PlaceForm = () => {
  const Dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    if (event.keyCode === 13) {
      Dispatch({ type: "PLACE", payload: event.target.value });
    }
  }

  return (
    <Row className="d-flex justify-content-center mt-5">
      <Col xs={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Were are you?</Form.Label>
            <Form.Control
              placeholder="Enter your location"
              onKeyDown={handleChange}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
export default PlaceForm;
