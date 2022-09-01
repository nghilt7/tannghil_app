import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";

import "./Login.scss";
import { toast } from "react-toastify";
import { validateEmail } from "./../../utils/validateEmail";

const Login = () => {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //   handle
  const handleLogin = async () => {
    // validate

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email is not valid");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    // call apis

    const data = await postLogin(email, password);
    console.log(">>> data login", data);
    const { EM, EC, DT } = data;

    if (data && +EC === 0) {
      toast.success(EM);
      navigate("/");
    }
    if (data && +EC !== 0) {
      toast.error(EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Tanghi</div>
      <div className="welcome col-4 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span>Forgot password?</span>
        <div className="">
          <button onClick={() => handleLogin()}>Login to Tanghi</button>
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
