import _ from "lodash";

const Question = (props) => {
  // props data
  const { data, index } = props;

  // props function
  const { handleCheckBox } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  //   handle
  const handleHandleCheckBox = (event, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  console.log(">>>", data);

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} alt="..." />
        </div>
      ) : (
        <div className="q-image"></div>
      )}

      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={answer.isSelected}
                    onChange={(event) =>
                      handleHandleCheckBox(event, answer.id, data.questionId)
                    }
                    id={`flexCheckDefault-${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexCheckDefault-${index}`}
                  >
                    {answer.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
