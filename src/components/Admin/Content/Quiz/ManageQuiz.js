import { useState, useRef } from "react";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import { toast } from "react-toastify";

import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../services/apiService";

import "./ManageQuiz.scss";
import TableQuiz from "./TableQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const ManageQuiz = () => {
  // state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState({ value: "EASY", label: "EASY" });
  const [image, setImage] = useState(null);

  const [listQuiz, setListQuiz] = useState([]);

  const inputRef = useRef(null);

  // Select option quiz difficult
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  //   handle

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC === 0) {
      setListQuiz(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  const handleChangeFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    // validate form
    if (!name || !description) {
      toast.error("Name and Description is required!");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);

    if (res && +res.EC === 0) {
      // todo
      setName("");
      setDescription("");
      setImage(null);
      resetFileInput();
      toast.success(res.EM);
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="name"
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="form-control"
                    placeholder="description"
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quiz type"
                  />
                </div>
                <div className="more-action form-group">
                  <label htmlFor="image" className="mb-1">
                    Upload Image
                  </label>
                  <input
                    ref={inputRef}
                    onChange={(event) => handleChangeFile(event)}
                    type="file"
                    id="image"
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz fetchQuiz={fetchQuiz} listQuiz={listQuiz} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
