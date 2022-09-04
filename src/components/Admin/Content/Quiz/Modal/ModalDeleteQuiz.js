import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const handleClose = () => setShow(false);

  //   props data
  const { dataDelete, fetchQuiz } = props;

  //   props func
  const { show, setShow } = props;

  // handle
  const handleDeleteBtnClick = async (quizId) => {
    let res = await deleteQuiz(quizId);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      await fetchQuiz();
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz -_-</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete quiz: <b>{dataDelete.name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteBtnClick(dataDelete.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
