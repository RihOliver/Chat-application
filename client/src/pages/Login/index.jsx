import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import { BackgroundImage, LoginBox } from "./style";
import { ToastContainer, toast } from "react-toastify"
import { loginRoute } from "../../utils/APIRoutes"


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    localStorage.clear()
  }, [])

  const validateForm = () => {
    if (username == "") {
      toast.error("Username is required.", toastOptions)
      return false;
    } else if (password == "") {
      toast.error("Password is required.", toastOptions)
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        localStorage.setItem(
          import.meta.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.token)

        )
        localStorage.setItem('idUser', data.token)
        navigate("/chat")
      } catch (error) {
        console.log(error)

        if (error.response) {
          toast.error(error.response.data.msg, toastOptions);
        } else {
          toast.error("Server error", toastOptions);
        }
      }
    }
  }

  return (
    <BackgroundImage>
      <LoginBox >
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>Chat login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Log In</button>
          <span>Don't have an account?<Link to="/register">Click to Register</Link></span>
        </form>
      </LoginBox>
      <ToastContainer />
    </BackgroundImage>
  );
}

export default Login