import { useState } from "react";
import { useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC === 0) {
      setListQuiz(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="my-3">List Quizzes</div>
      <table className="table table-bordered table-hover my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button className="btn btn-warning me-2">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
