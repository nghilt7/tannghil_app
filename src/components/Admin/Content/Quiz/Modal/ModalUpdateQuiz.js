import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from "react-select";

import { putUpdateQuiz } from "../../../../../services/apiService";

const ModalUpdateQuiz = (props) => {
  // Props data
  const { show, dataEdit } = props;

  // props function

  const { setShow, fetchQuiz, resetDataEdit } = props;

  // Select option quiz difficult
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  //   State of form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState({});
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataEdit)) {
      setName(dataEdit.name);
      setDescription(dataEdit.description);
      setType({ value: dataEdit.difficulty, label: "EASY" });
      setImage("");
      if (dataEdit.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataEdit.image}`);
      }
    }
  }, [dataEdit]);

  //   Handle
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType();
    setImage("");
    setPreviewImage("");
    resetDataEdit();
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    // call api
    let data = await putUpdateQuiz(
      dataEdit.id,
      description,
      name,
      type.value,
      image
    );

    // check response
    const { EC, EM } = data;
    if (data && +EC === 0) {
      toast.success(EM);
      handleClose();
      await fetchQuiz();
    }

    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <Select
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder="Quiz type"
              />
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="images preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
