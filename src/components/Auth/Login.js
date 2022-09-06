import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";

import "./Login.scss";
import { toast } from "react-toastify";
import { validateEmail } from "./../../utils/validateEmail";
import { doLogin } from "./../../redux/User/user.actions";

const Login = () => {
  // data state
  const validDefault = {
    validEmail: true,
    validPassword: true,
  };

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [validForm, setValidForm] = useState(validDefault);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  //   handle
  const handleLogin = async () => {
    setValidForm(validDefault);
    // validate
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

    // call apis

    setIsLoading(true);

    const data = await postLogin(email, password);
    const { EM, EC, DT } = data;

    if (data && +EC === 0) {
      dispatch(doLogin(DT));
      toast.success(EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && +EC !== 0) {
      setIsLoading(false);
      toast.error(EM);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Tanghi</div>
      <div className="welcome col-4 mx-auto">Hello, who’s this?</div>
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
              onKeyDown={(event) => handleKeyDown(event)}
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
        <span>Forgot password?</span>
        <div className="">
          <button disabled={isLoading} onClick={() => handleLogin()}>
            {isLoading ? (
              <ImSpinner9 className="loader-icon" />
            ) : (
              <span> Login to Tanghi</span>
            )}
          </button>
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

export default Login;
