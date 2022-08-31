import { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";

import ModalCreateUser from "./ModalCreateUser";
import TableUsers from "./TableUser";
import { getAllUsers } from "../../../services/apiService";

import "./ManageUser.scss";
import { toast } from "react-toastify";

const ManageUser = () => {
  // Modal User
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const handleShow = () => setIsShowModalCreateUser(true);

  // Table User
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
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
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary mb-3 mt-3" onClick={handleShow}>
            <FcPlus /> Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUsers listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
