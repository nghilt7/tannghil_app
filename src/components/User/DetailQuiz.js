import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import { toast } from "react-toastify";

import "./DetailQuiz.scss";

import Question from "./Question";

const DetailQuiz = () => {
  // State
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  // modify data

  const params = useParams();
  const {
    state: { quizTitle },
  } = useLocation();

  const { id } = params;

  useEffect(() => {
    fetchQuestions(id);
  }, [id]);

  const fetchQuestions = async (quizId) => {
    let res = await getDataQuiz(quizId);
    const { EC, EM, DT } = res;

    if (res && +EC === 0) {
      // data handle
      let data = _.chain(DT)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
    if (res && +EC !== 0) {
      toast.error(EM);
    }
  };

  // handle

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckBox = (answerId, questionId) => {
    const _dataQuiz = _.cloneDeep(dataQuiz);
    let question = _dataQuiz.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      let b = question.answers.map((answer) => {
        if (+answer.id === +answerId) {
          answer.isSelected = !answer.isSelected;
        }
        return answer;
      });

      question.answers = b;
    }

    let index = _dataQuiz.findIndex((item) => +item.questionId === +questionId);

    if (index > -1) {
      _dataQuiz[index] = question;
      setDataQuiz(_dataQuiz);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="q-title">
          Quiz {id}: {quizTitle ? quizTitle : ""}
        </div>
        <hr />
        <div className="q-body"></div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleCheckBox={handleCheckBox}
          />
        </div>
        <div className="q-footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button
            className="btn btn-secondary mx-3"
            onClick={() => handleNext()}
          >
            Next
          </button>
          <button className="btn btn-warning">Finish</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
