import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
  // props data
  const { dataQuiz, handleFinishQuiz, setIndex } = props;

  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleFinishQuiz();
  };

  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-${index}`}
                className={getClassQuestion(index, item)}
                onClick={() => handleClickQuestion(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
