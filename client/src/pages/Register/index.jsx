import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { RegisterBox, BackgroundImage } from "./style"
import { registerRoute } from "../../utils/APIRoutes"
import ReactInputMask from "react-input-mask"

function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    phone: "",
    cpf: "",
  })

  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { cpf, phone } = values
    if (cpf.length < 11) {
      toast.error(
        "CPF is invalid"
      )

    } else if (phone.length < 8) {
      toast.error(
        "Phone is invalid",
        toastOptions
      )
      return false
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { username, password, confirmpassword, phone, cpf } = values
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        confirmpassword,
        phone,
        cpf
      }).then((res) => {
        toast.success(res.data.msg, toastOptions)
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user))
        navigate("/")
      }).catch((res) => {
        toast.error(res.response.data.msg, toastOptions)
      })
    }
  }

  return (
    <BackgroundImage>
      <RegisterBox>
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)} />

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            onChange={(e) => handleChange(e)} />

          <ReactInputMask
            name="phone"
            placeholder="Phone"
            mask="(99)99999-9999"
            onChange={(e) => handleChange(e)} />

          <ReactInputMask
            type="text"
            name="cpf"
            placeholder="CPF"
            mask="***.***.***-**"
            onChange={(e) => handleChange(e)} />

          <button type="submit">Register</button>
          <span>Already have an account?<Link to="/">Click to login</Link></span>
        </form>
      </RegisterBox>
      <ToastContainer />
    </BackgroundImage>
  )
}

export default Register