import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import PasswordModal from "../components/passwordModal";
import { toast } from "react-toastify";
import { setUser } from "../slices/authSlice";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid Email Address"),
    name: yup
      .string()
      .required("Required")
      .min(3, "Must be at least 3 characters"),
  });

  //check if user is logged in
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      //redirect to log in page
      navigate("/login");
    }
  }, [user, navigate]);

  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const submitProfile = async (form) => {
    try {
      const res = await updateProfile(form).unwrap();
      dispatch(setUser({ ...res }));
      toast.success(`Your Profile has been updated`, { hideProgressBar: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3>Profile</h3>
        </Col>
      </Row>
      <Row>
        <Col className="">
          <Formik
            validationSchema={schema}
            initialValues={user}
            onSubmit={submitProfile}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="name" className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={errors.name}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="mt-3 w-100"
                  disabled={isLoading}
                >
                  Submit {isLoading && <Spinner size="sm" className="ml-2" />}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="submit"
            variant="outline-secondary"
            className="mt-3 "
            onClick={() => setShowModal(true)}
          >
            Change Password
          </Button>
          <PasswordModal show={showModal} close={() => setShowModal(false)} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
