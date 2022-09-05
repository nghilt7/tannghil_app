import Select from "react-select";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  getAllQuizForAdmin,
  getAllUsers,
} from "../../../../services/apiService";

const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  //handle
  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    } else {
      toast.error(res.EM);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && +res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(users);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz: </label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        ></Select>
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User: </label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        ></Select>
      </div>
      <div className="">
        <button className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
