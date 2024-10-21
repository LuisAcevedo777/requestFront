import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/";
import {
  filterRequestTitleThunk,
  getRequestThunk,
  requestEmployeeThunk,
  getClearThunk
} from "../store/slices/request.slice";
import { useState } from "react";
import { Card, InputGroup, Form, Row, Col, Button } from "react-bootstrap";
import "../App.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {

  //trae del localStorage el token, id de empleado y el role

  const token = JSON.parse(localStorage.getItem("token"));
  const employeeId = JSON.parse(localStorage.getItem("employeeId"));
  const role = JSON.parse(localStorage.getItem('role'))

  const dispatch = useDispatch();
  const { register, handleSubmit} = useForm();

  //Carga en el array de solicitudes, según el rol del usuario

  useEffect(() => {
    if(role === "admin"){ 
    dispatch(getRequestThunk());
   
    
  }
    else if(role === "employee"){
      dispatch(requestEmployeeThunk(employeeId))
     
    }else{
      dispatch(getClearThunk())
     setResponse("NO TIENES AUTORIZACIÓN")
    
    }
  }, [dispatch]);


  const [newsSearch, setNewsSearch] = useState("");
  const seeRequests = useSelector((state) => state.request || []);
  const [response, setResponse] = useState("");
  
 //Envía la información suministrada en el formulario de solicitudes, creando una nueva

  const submit = (data) => {
    const newData = { ...data, employeeId };
    axios
      .post("https://requestserver-y82y.onrender.com/api/request/", newData, {
        headers: { token: token },
      })
      .then((res) => {

        if(role === "admin"){ 
          dispatch(getRequestThunk());
         
          
        }
          else if(role === "employee"){
            dispatch(requestEmployeeThunk(employeeId))
           
          }else{
            dispatch(getClearThunk())
           setResponse("NO TIENES AUTORIZACIÓN")
          
          }

        console.log(res);
        setResponse("Solicitud Enviada!");
        setTimeout(() => {
          setResponse("");
        }, 2000);
        dispatch(get)
      })
      .catch((error) => {
        console.log("Error: ", error)
        if (error.response && error.response.status === 401) {
          alert("Datos incorrectos!");
        } else {
          console.log(error.response ? error.response.data  :  error.message);
          setResponse(error.response ? error.response.data.message : error.message);
          setTimeout(() => {
            setResponse("");
          }, 2000);
        }
      });
  };

  return (
    <Row className="principalRow">

{/*formulario para enviar solicitudes*/}


     <Form className="request" onSubmit={handleSubmit(submit)}>
        <h2 style={{color: "white"}}>Request</h2>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Code</Form.Label>
          <Form.Control
            size="xs"
            {...register("code")}
            type="text"
            placeholder="Enter your code"
          />
        </Form.Group>

        <h2 className="requestMessage">{response}</h2>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("description")}
              as="textarea"
              rows={1}
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              {...register("summary")}
              as="textarea"
              rows={5}
              placeholder="Summary"
            />
          </Form.Group>
        </Row>

        <div className="btn-register">
          <Button variant="primary" type="submit" className="btn-form">
            Submit
          </Button>
        </div>
      </Form>

      <Col lg={9} className="colHome">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search ALL Your request Here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={newsSearch}
            onChange={(e) => setNewsSearch(e.target.value)}
          />
          <Button
            className="bg-danger text-black"
            variant="outline-secondary"
            id="button-addon2"
             
            /*filtra La información de acuerdo al texto ingresado*/

            onClick={() => dispatch(filterRequestTitleThunk(newsSearch,role,employeeId))}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </InputGroup>
        <Row xs={1} md={1} lg={1} className="g-4">
          {seeRequests?.map((request) => (
            <Col
              className="productsInHome"
              aria-expanded="true"
              key={request?.requestId}
            >

              {/*Desde aquí se muestra todas las solicitudes de la base de datos dependiendo el rol*/}

              <Card className="card">
                <Card.Body className="cardHome">
                  <Card.Title className="card-title">
                    {request?.description}
                  </Card.Title>
                  <Card.Title className="card-title">
                    {request?.summary}
                  </Card.Title>
                  <Card.Title className="card-title">
                    {request?.createdAt}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
