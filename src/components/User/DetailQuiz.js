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
          />
        </div>
        <div className="q-footer">
          <button className="btn btn-primary me-3" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
