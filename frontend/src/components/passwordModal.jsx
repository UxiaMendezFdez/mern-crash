import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const PasswordModal = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-5">
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Repeat New Password</Form.Label>
            <Form.Control type="password" autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={close}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModal;
