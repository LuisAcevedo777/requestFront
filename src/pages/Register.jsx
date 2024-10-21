import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Register = () => {

  //Llamado a token del localStorage

  const token = JSON.parse(localStorage.getItem("token"));
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState("");
  const [response, setResponse] = useState("");

  //Función con la información del formulario de registro, crea nuevo empleado

  const submit = (data) => {
    axios
      .post("https://requestserver-y82y.onrender.com/api/auth/register/", data, {
        headers: { token: token },
      })
      .then((res) => {
        setRegisterUser("Registro Exitoso!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Datos incorrectos!");
        } else {
          setResponse(error.message);
          setTimeout(() => {
            setResponse("");
          }, 2000);
          console.log("No se puedo registrar a la cuenta");
          console.log(error);
        }
      });
  };

  return (
    <div className="register">

      {/*Formulario de registro*/}


      <Form className="form-register" onSubmit={handleSubmit(submit)}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>

        <div className="btn-register">
          <Button variant="primary" type="submit" className="btn-form">
            Submit
          </Button>

         {/*Redireccionamiento al login*/}

          <Link to="/login" className="textFormRegister">
            Ya tienes cuenta?, ingresa aquí!
          </Link>
        </div>
        <h2 className="requestMessage">{response}</h2>
      </Form>

      <h1 className="registroExitoso">{registerUser}</h1>
    </div>
  );
};

export default Register;
