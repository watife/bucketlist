import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const CreateBucketlist = ({ modal, toggle, onSubmit, handleChange }) => {
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
            name="list"
            onChange={handleChange}
          />
          <button className="create-button" type="submit" onClick={onSubmit}>
            Create
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CreateBucketlist;
