import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  // props data
  const { data, index } = props;

  // props function
  const { handleCheckBox } = props;

  // state
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  //   handle
  const handleHandleCheckBox = (event, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt="..."
          />
          {isPreviewImage && (
            <Lightbox
              onClose={() => setIsPreviewImage(false)}
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
            />
          )}
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
