import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./Register.scss";

import { validateEmail } from "./../../utils/validateEmail";
import { postRegister } from "../../services/apiService";

const Register = () => {
  // state data
  const validDefault = {
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
  };
  // state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [validForm, setValidForm] = useState(validDefault);

  const navigate = useNavigate();

  //   handle
  const handleRegister = async () => {
    setValidForm(validDefault);
    // validate form
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email is not valid");
      setValidForm({ ...validDefault, validEmail: false });
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      setValidForm({ ...validDefault, validPassword: false });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm password is not correct!");
      setValidForm({ ...validDefault, validConfirmPassword: false });
      return;
    }

    // call api
    let data = await postRegister(email, username, password);
    const { EC, EM } = data;

    if (data && +EC === 0) {
      toast.success(EM);
      navigate("/");
    }
    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="title col-4 mx-auto">Tanghi</div>
      <div className="welcome col-4 mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className={
              validForm.validEmail ? "form-control" : "form-control is-invalid"
            }
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="position-relative">
            <input
              type={isShowPassword ? "text" : "password"}
              size="5"
              className={
                validForm.validPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {isShowPassword ? (
              <AiFillEye
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="position-absolute top-50 end-0 translate-middle"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="position-absolute top-50 end-0 translate-middle"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className={
              validForm.validConfirmPassword
                ? "form-control"
                : "form-control is-invalid"
            }
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="">
          <button onClick={() => handleRegister()}>Sign up to Tanghi</button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            {" "}
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
