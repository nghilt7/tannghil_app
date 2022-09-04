import Select from "react-select";
import { useState } from "react";

import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

import "./Questions.scss";

const Questions = () => {
  // State
  const [selectedQuiz, setSelectedQuiz] = useState({});

  // select options
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="questions-container container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group mt-2">
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          ></Select>
        </div>
        <div className="mt-3 mb-3">Add Questions:</div>

        <div className="">
          <div className="questions-content">
            <div className="form-floating description">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Description</label>
            </div>
            <div className="group-upload">
              <label className="label-up">Upload Image</label>
              <input type="file" hidden />
              <span> Upload: myfile.png</span>
            </div>
            <div className="btn-add">
              <span>
                <BsFillPatchPlusFill className="icon-add" />
              </span>
              <span>
                <BsFillPatchMinusFill className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input isCorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <AiOutlinePlusCircle className="icon-add" />
              </span>
              <span>
                <AiOutlineMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
