import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterEmployeeTitleThunk,
  getEmployeeThunk,
  deleteThunk,
} from "../store/slices/employee.slice";
import { Card, Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

const Employee = () => {

  //Llamado al token en el localStorage

  const token = JSON.parse(localStorage.getItem("token"));
  
  const dispatch = useDispatch();

  const [newsSearch, setNewsSearch] = useState("");
  const employees = useSelector((state) => state.employee);
  const [user, setUser] = useState({});
  const { register, reset, handleSubmit } = useForm();
  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);

  //Función que permite cerrar el formulario para actualizar empleados, resetea los campos de este.
  const handleClose = () => {
    reset(), setShow(false);
  };


  //Función para mostrar el formulario para actualizar el empleado
  //Resetea los campos con el usuario seleccionado

  const handleShow = (currentEmployee) => {
    reset({
      employeeId: currentEmployee.employeeId,
      name: currentEmployee.name,
      email: currentEmployee.email,
      roleId: currentEmployee.roleId,
      salary: currentEmployee.salary,
    }),
      setShow(true);
  };

  //Carga el array de empleados con los que están en la base de datos
  useEffect(() => {
    dispatch(getEmployeeThunk());
  }, []);

 //Petición para actualizar información de un empleado, desde el formulario flotante

  const submit = async (data) => {
    await axios
      .put(`https://requestserver-y82y.onrender.com/api/employee/${data.employeeId}`, data, {
        headers: { token: token },
      })
          .then((res) => {
        setUpdate("Empleado Actualizado");
        setTimeout(() => {
          setUpdate("");
        }, 2000);
      })
      .catch((error) => {
        console.log(error), setUpdate(error.response.data);
      });
  };

  return (
    <div className="employeesContainer">
      <Row xs={1} md={1} lg={1} className="g-4">
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
             
            //filtro para traer los empleados de acuerdo al texto buscado

            onClick={() => dispatch(filterEmployeeTitleThunk(newsSearch))}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </InputGroup>
 
        <h1 className="text-light">EMPLOYEES</h1>  
                              
        {employees?.map((employee) => (
          <Col
            className="productsInEmploy"
            aria-expanded="true"
            key={employee?.employeeId}
          >
            <Card className="cardEmploy">
              <Form className="cardHome">
                <Form.Label className="text-white">Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="cardEmployTitle"
                  value={employee?.name}
                />
                <Form.Label className="text-white">Email: </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  className="cardEmployTitle"
                  value={employee?.email}
                />
                <Form.Label className="text-white">Salary: </Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  className="cardEmployTitle"
                  value={employee?.salary}
                />

                <div className="crudEmployee">
                  <i
                    onClick={() => {
                      //elimina empleado con un click en esta caneca

                      dispatch(deleteThunk(employee?.employeeId)),
                        dispatch(getEmployeeThunk());
                    }}
                    className="fa-solid fa-trash-can text-light fa-2x"
                  ></i>
                  <Button onClick={() => handleShow(employee)} variant="danger">
                    Update Employee
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        ))}
      </Row>

{/*modal*/}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form className="cardHome" onSubmit={handleSubmit(submit)}>
            <Form.Control
              type="text"
              style={{ display: "none" }}
              name="employeeId"
              {...register("employeeId")}
            />

            <Form.Label className="text-white">Name: </Form.Label>
            <Form.Control
              {...register("name")}
              type="text"
              name="name"
              className="cardEmployTitle"
              defaultValue={user.name}
            />
            <Form.Label className="text-white">Email: </Form.Label>
            <Form.Control
              {...register("email")}
              type="text"
              name="email"
              className="cardEmployTitle"
              defaultValue={user.email}
            />
            <Form.Label className="text-white">Salary: </Form.Label>
            <Form.Control
              {...register("salary")}
              type="number"
              name="salary"
              className="cardEmployTitle"
              defaultValue={user.salary}
            />
            <Form.Label className="text-white">RoleId: </Form.Label>
            <Form.Control
              {...register("roleId")}
              type="number"
              name="roleId"
              className="cardEmployTitle"
              defaultValue={user.roleId}
            />
            <div className="crudEmployee">
              <i className="fa-solid fa-trash-can text-light fa-2x"></i>
              <h2 className="requestMessage">{update}</h2>
            </div>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employee;
