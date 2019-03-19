import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalView = ({ modal, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} className="header-text">
        Create a New Bucketlist
      </ModalHeader>
      <ModalBody>
        <div className="bucketlist-create">
          <input
            type="text"
            className="create-input"
            placeholder="create bucketlist"
          />
          <button className="create-button">Create</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalView;
