import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  //Se llama al token del localStorage

  
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  //Función con la información del formulario del login, envía para autenticación

  const submit = (data) => {
    axios
      .post("https://requestserver-y82y.onrender.com/api/auth/login/", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("employeeId", JSON.stringify(res.data.employeeId));
        localStorage.setItem("role", JSON.stringify(res.data.role));
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setResponse(error.response.data.message);
          setTimeout(() => {
            setResponse("");
          }, 2000);
        } else {
          setResponse(error.response.data.message);
          setTimeout(() => {
            setResponse("");
          }, 2000);
          console.log(error);
        }
      });
  };

  return (
    <div className="divLogin">

        {/*Formulario Login*/}

      <Form className="login" onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email"
            defaultValue="juanadmin@gmail.com"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Password"
            defaultValue="123"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <h2 className="requestMessage">{response}</h2>
        <div className="btn-login">
          <Button variant="primary" type="submit" className="btn-form">
            Submit
          </Button>
        </div>
        <Link to="/register" className="textFormLogin">
          Aún no estás registrado?
        </Link>
      </Form>
    </div>
  );
};

export default Login;
