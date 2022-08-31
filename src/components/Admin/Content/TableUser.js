import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getAllUsers();
    const { EM, EC, DT } = data;
    if (data && +EC === 0) {
      setListUsers(DT);
    }
    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`users-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info">View</button>
                    <button className="btn btn-warning mx-3">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={4}>No found user</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUsers;
