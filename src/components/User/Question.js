import _ from "lodash";

const Question = (props) => {
  // props data
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      {data.image && (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} alt="..." />
        </div>
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id={`flexCheckDefault-${index}`}
                  />
                  <label
                    class="form-check-label"
                    for={`flexCheckDefault-${index}`}
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
