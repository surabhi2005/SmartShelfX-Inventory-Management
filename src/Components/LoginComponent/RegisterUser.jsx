import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { registerNewUser } from "../../Services/LoginService";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    personalName: "",
    password: "",
    email: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const saveUser = (event) => {
    event.preventDefault();
    if (inventoryUser.password === confirmPassword) {
      registerNewUser(inventoryUser).then((response) => {
        alert("User is registered successfully...Go For Login");
        navigate("/");
      });
    }
  };

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setInventoryUser((values) => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!inventoryUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!inventoryUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      inventoryUser.password.length < 5 ||
      inventoryUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (inventoryUser.password !== confirmPassword) {
      tempErrors.password = "Both the passwords are not matched";
      isValid = false;
    }

    if (!inventoryUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }
    if (!inventoryUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(inventoryUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }
    if (!inventoryUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveUser(event);
    }
  };

  return (
    <div className="register-container">
      <img src="Register.png" alt="Register" className="register-image" />
      <div className="register-form-box">
        <h2 style={{ letterSpacing: "3px" }}>Create Your Account</h2>
        <br />
        <form className="form-box">
          <div className="form-group">
            <label>User Name</label>
            <input
              placeholder="username"
              name="username"
              value={inventoryUser.username}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inventoryUser.password}
              onChange={(event) => onChangeHandler(event)}
              placeholder="password"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="confirm password"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div className="form-group">
            <label>Personal Name</label>
            <input
              placeholder="personal name"
              name="personalName"
              value={inventoryUser.personalName}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.personalName && <p>{errors.personalName}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="email"
              name="email"
              value={inventoryUser.email}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <input
              list="types"
              name="role"
              value={inventoryUser.role}
              onChange={(event) => onChangeHandler(event)}
            />
            <datalist id="types">
              <option value="Manager" />
              <option value="Admin" />
              <option value="Vendor" />
            </datalist>
            {errors.role && <p>{errors.role}</p>}
          </div>

          <br />
          <button className="btn btn-primary" onClick={handleValidation}>
            Submit
          </button>
        </form>
        <p style={{ color: "#333333" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
