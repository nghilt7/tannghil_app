import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./ListQuiz.scss";

const ListQuiz = () => {
  const navigate = useNavigate();
  // state
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let data = await getQuizByUser();
    const { EC, EM, DT } = data;
    if (data && +EC === 0) {
      setArrQuiz(DT);
    }
    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={`quiz-${index}`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                >
                  Start now
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && (
        <div>You don't have any quiz now</div>
      )}
    </div>
  );
};

export default ListQuiz;
