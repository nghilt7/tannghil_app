import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  // props data
  const { user } = props;

  // props function
  const { show, setShow, fetchListUsersWithPaginate, setCurrentPage } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(user.id);

    const { EM, EC } = data;

    if (data && +EC === 0) {
      toast.success(EM);
      handleClose();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }

    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user have email is <b>{user.email}</b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
