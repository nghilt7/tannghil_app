import axios from "../utils/axiosCustomize";

//  USER

const postCreateNewUser = async (email, password, username, role, image) => {
  // config axios form data type
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return await axios.post("api/v1/participant", data);
};

const getAllUsers = async () => {
  return await axios.get("api/v1/participant/all");
};

const putUpdateUser = async (id, username, role, image) => {
  // config axios form data type
  const data = new FormData();

  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return await axios.put("api/v1/participant", data);
};

const deleteUser = async (id) => {
  return await axios.delete("api/v1/participant", { data: { id } });
};

const getUserWithPaginate = async (page, limit) => {
  return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = async (email, password) => {
  return await axios.post(`api/v1/login`, { email, password, delay: 3000 });
};

const postRegister = async (email, username, password) => {
  return await axios.post(`api/v1/register`, { email, username, password });
};

// Quiz

const getQuizByUser = async () => {
  return await axios.get(`api/v1/quiz-by-participant`);
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
};
