import { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";

import ModalCreateUser from "./ModalCreateUser";
import TableUsers from "./TableUser";
import { getAllUsers } from "../../../services/apiService";

import "./ManageUser.scss";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = () => {
  // Modal State
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);

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

  // Modal Update User

  const [dataUpdate, setDataUpdate] = useState({});

  const handleClickBtnUpdate = (user) => {
    setIsShowModalUpdateUser(true);
    if (user) {
      setDataUpdate(user);
    }
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  // Modal Delete User
  const [dataDelete, setDataDelete] = useState({});

  const handleClickBtnDelete = (user) => {
    setIsShowModalDeleteUser(true);
    if (user) {
      setDataDelete(user);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary mb-3 mt-3"
            onClick={() => setIsShowModalCreateUser(true)}
          >
            <FcPlus /> Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          user={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
        />
        <ModalDeleteUser
          show={isShowModalDeleteUser}
          setShow={setIsShowModalDeleteUser}
          fetchListUsers={fetchListUsers}
          user={dataDelete}
        />
      </div>
    </div>
  );
};

export default ManageUser;
