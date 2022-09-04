import { useState } from "react";
import { useEffect } from "react";

import ModalDeleteQuiz from "./Modal/ModalDeleteQuiz";
import ModalUpdateQuiz from "./Modal/ModalUpdateQuiz";

const TableQuiz = (props) => {
  // props
  const { listQuiz, fetchQuiz } = props;

  // State

  // Modal State
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // handle
  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleDelete = (quiz) => {
    setIsShowModalDelete(true);
    setDataDelete(quiz);
  };

  const handleEdit = (quiz) => {
    setIsShowModalUpdate(true);
    setDataEdit(quiz);
  };

  const resetDataEdit = () => {
    setDataEdit({});
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
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
      <ModalUpdateQuiz
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        dataEdit={dataEdit}
        fetchQuiz={fetchQuiz}
        resetDataEdit={resetDataEdit}
      />
    </>
  );
};

export default TableQuiz;
