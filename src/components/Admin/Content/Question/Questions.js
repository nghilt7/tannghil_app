import Select from "react-select";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

import "./Questions.scss";

const Questions = () => {
  // State
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      image: "",
      imageFile: "",
      answers: [{ id: uuidv4(), description: "nghilt 1", isCorrect: false }],
    },
  ]);

  // select options
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  //handle
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageFile: "",
        answers: [
          { id: uuidv4(), description: "", isCorrect: false },
          { id: uuidv4(), description: "", isCorrect: false },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let _questions = _.cloneDeep(questions);
      _questions = _questions.filter((question) => question.id !== id);

      setQuestions(_questions);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let _questions = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };

      let index = _questions.findIndex((item) => item.id === questionId);
      _questions[index].answers.push(newAnswer);

      setQuestions(_questions);
    }

    if (type === "REMOVE") {
      let index = _questions.findIndex((item) => item.id === questionId);
      _questions[index].answers = _questions[index].answers.filter(
        (answer) => answer.id !== answerId
      );

      setQuestions(_questions);
    }
  };

  console.log("check questions", questions);
  return (
    <div className="questions-container container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group mt-2">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          ></Select>
        </div>
        <div className="mt-3 mb-3">Add Questions:</div>

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                    />
                    <label>Question's {index + 1} description</label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input type="file" hidden />
                    <span> Upload: myfile.png</span>
                  </div>
                  <div className="btn-add">
                    <span>
                      <BsFillPatchPlusFill
                        className="icon-add"
                        onClick={() => handleAddRemoveQuestion("ADD", "")}
                      />
                    </span>
                    {questions.length > 1 && (
                      <span>
                        <BsFillPatchMinusFill
                          className="icon-remove"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span>
                            <AiOutlinePlusCircle
                              className="icon-add"
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", question.id)
                              }
                            />
                          </span>
                          {question.answers.length > 1 && (
                            <span>
                              <AiOutlineMinusCircle
                                className="icon-remove"
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
