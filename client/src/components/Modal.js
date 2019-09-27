import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalComponent = ({ open, handleClose, message, handleDelete }) => (
  <Modal open={open} onClose={handleClose} closeIcon basic size="small">
    <Modal.Header> {message}</Modal.Header>

    <Modal.Actions>
      <Button color="green" onClick={handleClose}>
        <Icon name="remove" /> No
      </Button>
      <Button color="red" onClick={handleDelete}>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalComponent;
