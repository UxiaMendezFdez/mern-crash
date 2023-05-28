import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";

const UserForm = ({ type, handleSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [passHidden, setPassHidden] = useState(true);
  const [repeatPassHidden, setRepeatPassHidden] = useState(true);

  const [validated, setValidated] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      handleSubmit({ email, name, password });
    }
  };

  return (
    <Container className=" p-2 mt-5">
      <Row className="justify-content-md-center ">
        <Col xs={12} md={6}>
          {type === "login" ? (
            <h3 className="text-center">Welcome Back!</h3>
          ) : (
            <h3 className="text-center">Register</h3>
          )}

          <Form noValidate onSubmit={onSubmit} validated={validated}>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Form.Group>
            {type === "register" ? (
              <Form.Group controlId="name" className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}

            <div className="mb-3 mt-3">
              <Form.Label htmlFor="password">Repeat Password</Form.Label>
              <InputGroup>
                <Form.Control
                  id="password"
                  type={passHidden ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
                <Button
                  variant="outline-secondary"
                  onClick={() => setPassHidden(!passHidden)}
                >
                  {passHidden ? <BsFillEyeFill /> : <BsEyeSlashFill />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </InputGroup>
            </div>

            {type === "register" ? (
              <div className="mb-3 mt-3">
                <Form.Label htmlFor="repeatPassword">
                  Repeat Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    id="repeatPassword"
                    type={repeatPassHidden ? "password" : "text"}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  ></Form.Control>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setRepeatPassHidden(!repeatPassHidden)}
                  >
                    {repeatPassHidden ? <BsFillEyeFill /> : <BsEyeSlashFill />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Required
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
            ) : null}
            <Button
              type="submit"
              variant="dark"
              className="mt-3 w-100"
              disabled={loading}
            >
              Submit {loading && <Spinner size="sm" className="ml-2" />}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={6}>
          {type === "login" ? (
            <p>
              Don't have an account? <Link to="/register">Register now</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/login">Login now</Link>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
