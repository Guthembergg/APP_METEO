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
    <Row className="d-flex justify-content-center m-0 p-0  w-100">
      <Col xs={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-start fw-bold ">
            <Form.Label className="text-light fs-6">Where are you?</Form.Label>
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
