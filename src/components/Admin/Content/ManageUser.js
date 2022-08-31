import ModalCreateUser from "./ModalCreateUser";

import "./ManageUser.scss";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="">
          <button className="btn btn-primary">Add new user</button>
        </div>
        <div className="">table user</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
