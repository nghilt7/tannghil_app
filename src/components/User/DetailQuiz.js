import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import { toast } from "react-toastify";

const DetailQuiz = () => {
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    fetchQuestions(id);
  }, [id]);

  const fetchQuestions = async (quizId) => {
    let res = await getDataQuiz(quizId);
    console.log(">>> quiz", res);
    const { EC, EM, DT } = res;

    if (res && +EC === 0) {
      let answers = _.chain(DT)
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
    }
    if (res && +EC !== 0) {
      toast.error(EM);
    }
  };

  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
