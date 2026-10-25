import React, { useEffect, useState } from "react";
import "./style/Login.scss";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../types/Auth";
import { useAuth } from "../../AuthProvider";
import { BASE_URL } from "../../../modules/environments/utils/Constants";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { AuthResponse, AuthResponseError } from "../../types/AuthResponse";

const API_BASE = BASE_URL;
const Login = () => {
  const [data, setData] = useState<ILogin>({
    Username: "",
    Password: "",
  });
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/Environments");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    setData({ ...data, [id]: value });
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}Authentication/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Login succesfully");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;
        console.log("Response JSON:", json);
        if (json.token.accessToken && json.token.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        console.log("Something went wrong");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login-form">
        <Typography variant="h2">Login</Typography>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <Typography variant="h6">Username</Typography>
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
            <Typography variant="h6">Password</Typography>
            <input
              type="Password"
              id="Password"
              value={data.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="button"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
export default Login;
