import React, { useState } from "react";
import "./style/SignUp.scss";
import { IRegisterUser, Roles } from "../../types/Auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { BASE_URL } from "../../../modules/environments/utils/Constants";
import { AuthResponseError } from "../../types/AuthResponse";

const API_BASE = BASE_URL;
const initialFormState: IRegisterUser = {
  id: 0,
  Username: "",
  Email: "",
  Password: "",
  FirstName: "",
  LastName: "",
  role: Roles.Support,
};
const SignUp = () => {
  const [data, setData] = useState<IRegisterUser>(initialFormState);
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();
  if (auth.isAuthenticated) {
    return <Navigate to="/Dashboard" />;
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}Authentication/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User created succesfully");
        setErrorResponse("");
        goTo("/Login");
      } else {
        console.log("Something went wrong");
        const textResponse = await response.text();
        if (textResponse) {
          const json = (await response.json()) as AuthResponseError;
          setErrorResponse(json.body.error);
        } else {
          setErrorResponse("Unexpected error occurred.");
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (
      data.Username == "" ||
      data.Password == "" ||
      data.Email == "" ||
      data.FirstName == "" ||
      data.LastName == ""
    ) {
      alert("Please fill the form");
      return;
    }
  };
  return (
    <>
      <div className="sign-up-form">
        <h2>Register</h2>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              id="FirstName"
              value={data.FirstName}
              onChange={handleChange}
              placeholder="Enter your First Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              id="LastName"
              value={data.LastName}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              id="Username"
              value={data.Username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="Email"
              value={data.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="Password"
              value={data.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <label htmlFor="role">Choose a Role:</label>
            <select
              name="role"
              id="role"
              value={data.role}
              onChange={handleChange}
            >
              <option value={Roles.Admin}>{Roles.Admin}</option>
              <option value={Roles.Support}>{Roles.Support}</option>
            </select>
          </div>
          <button
            type="submit"
            className="button"
          >
            Register
          </button>
          <Link
            type="submit"
            className="my-custom-link"
            to={"/Login"}
          >
            Login
          </Link>
        </form>
      </div>
    </>
  );
};
export default SignUp;
