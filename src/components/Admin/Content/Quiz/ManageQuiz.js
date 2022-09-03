import { useState } from "react";
import Select from "react-select";

import "./ManageQuiz.scss";

const ManageQuiz = () => {
  // state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  // Select option quiz difficult
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  //   handle
  const handleChangeFile = (event) => {};

  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new container">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz:</legend>
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
            <Select value={type} options={options} placeholder="Quiz type" />
          </div>
          <div className="more-action form-group">
            <label htmlFor="image" className="mb-1">
              Upload Image
            </label>
            <input
              onChange={(event) => handleChangeFile(event)}
              type="file"
              id="image"
              className="form-control"
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
