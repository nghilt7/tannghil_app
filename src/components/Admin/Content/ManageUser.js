import { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";

import "./ManageUser.scss";

import { getUserWithPaginate } from "../../../services/apiService";

import ModalCreateUser from "./ModalCreateUser";
// import TableUsers from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  // paginate
  const LIMIT_USER = 2;

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);

  // Table User
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // fetchListUsers(); fetch all user
    fetchListUsersWithPaginate(1); // fetch user in page 1
  }, []);

  // const fetchListUsers = async () => {
  //   const data = await getAllUsers();
  //   const { EM, EC, DT } = data;
  //   if (data && +EC === 0) {
  //     setListUsers(DT);
  //   }
  //   if (data && +EC !== 0) {
  //     toast.error(EM);
  //   }
  // };

  const fetchListUsersWithPaginate = async (page) => {
    const data = await getUserWithPaginate(page, LIMIT_USER);
    const {
      EM,
      EC,
      DT: { users, totalPages },
    } = data;
    if (data && +EC === 0) {
      setListUsers(users);
      setPageCount(totalPages);
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
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          user={dataUpdate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={isShowModalDeleteUser}
          setShow={setIsShowModalDeleteUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          user={dataDelete}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
