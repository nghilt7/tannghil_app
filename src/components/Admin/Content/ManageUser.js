import { useState } from "react";

import { FcPlus } from "react-icons/fc";

import ModalCreateUser from "./ModalCreateUser";

import "./ManageUser.scss";

const ManageUser = () => {
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const handleShow = () => setIsShowModalCreateUser(true);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={handleShow}>
            <FcPlus /> Add new user
          </button>
        </div>
        <div className="table-users-container">table user</div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
