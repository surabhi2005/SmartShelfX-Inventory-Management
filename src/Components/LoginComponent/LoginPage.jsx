import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const checkLogin = (e) => {
    e.preventDefault();
    validateUser(formData.username, formData.password).then((response) => {
      let role = String(response.data);
      if (role === "Admin") navigate("/AdminMenu");
      else if (role === "Manager") navigate("/ManagerMenu");
      else if (role === "Vendor") navigate("/VendorMenu");
      else alert("Wrong Userid/Password");
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      checkLogin(event);
    }
  };

  const registerNewUser = (e) => {
    navigate("/Register");
  };

  return (
    <div className="register-container">
      <img src="Login.png" alt="Login" className="register-image" />
      <div className="register-form-box">
        <h2 style={{ letterSpacing: "3px" }}>Access Your Dashboard</h2>
        <br />
        <form className="form-box">
          <div className="form-group">
            <label>User Name</label>
            <input
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={onChangeHandler}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <br />
          <button className="btn btn-primary" onClick={handleValidation}>
            LOGIN
          </button>
        </form>
        <p style={{ color: "#333333" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={(e) => registerNewUser(e)}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
