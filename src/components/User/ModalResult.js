import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  // props data
  const { dataModalResult } = props;

  // props function
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  console.log(">>> data", dataModalResult);

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            Total Questions: <b> {dataModalResult.countTotal} </b>
          </div>
          <div className="">
            Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Show Answers</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
