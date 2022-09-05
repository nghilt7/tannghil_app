import Select from "react-select";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";

import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

import "./Questions.scss";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";

const Questions = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  // State
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);

  //handle
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    } else {
      toast.error(res.EM);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageFile: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
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
      if (index > -1) {
        _questions[index].answers.push(newAnswer);
      }

      setQuestions(_questions);
    }

    if (type === "REMOVE") {
      let index = _questions.findIndex((item) => item.id === questionId);
      if (index > -1) {
        _questions[index].answers = _questions[index].answers.filter(
          (answer) => answer.id !== answerId
        );
      }

      setQuestions(_questions);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    let _questions = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = _questions.findIndex((item) => item.id === questionId);
      if (index > -1) {
        _questions[index].description = value;
      }

      setQuestions(_questions);
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      _questions[index].imageFile = event.target.files[0];
      _questions[index].imageName = event.target.files[0].name;
    }

    setQuestions(_questions);
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex((item) => item.id === questionId);
    if (index > -1) {
      _questions[index].answers = _questions[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
    }

    setQuestions(_questions);
  };

  const handleSubmitQuestionForQuiz = async () => {
    // validate

    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a quiz");
      return;
    }

    let isValidAnswer = true;
    let indexQuestion,
      indexAnswer = 0;

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (!isValidAnswer) break;
    }

    if (!isValidAnswer) {
      toast.error(
        `Not empty answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`
      );
      return;
    }

    let isValidQuestion = true;

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i;
        break;
      }
      if (!isValidQuestion) break;
    }

    if (!isValidQuestion) {
      toast.error(`Not empty description for Question ${indexQuestion + 1}`);
      return;
    }

    // submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile ? question.imageFile : null
      );

      // submit answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Create question and answers successfully!");
    setQuestions(initQuestions);
  };

  const handlePreviewImage = (questionId) => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(_questions[index].imageFile),
        title: _questions[index].name,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="questions-container container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group mt-2">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Question's {index + 1} description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={`${question.id}`}
                      onChange={(event) =>
                        handleOnChangeFileQuestion(question.id, event)
                      }
                    />
                    <span>
                      {" "}
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {" "}
                          {question.imageName}{" "}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
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
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            {" "}
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>{" "}
          </div>
        )}
      </div>

      {isPreviewImage && (
        <Lightbox
          onClose={() => setIsPreviewImage(false)}
          image={dataImagePreview.url}
          title={dataImagePreview.title}
        />
      )}
    </div>
  );
};

export default Questions;
