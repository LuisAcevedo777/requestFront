import axios from 'axios';
import React, { useState } from 'react';
import {Form, Button} from "react-bootstrap"
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Register = () => {
    const token = localStorage.getItem('token')
    const{register, handleSubmit}=useForm()
    const navigate= useNavigate()
    const[registerUser, setRegisterUser]=useState('') 

    const submit=(data)=>{
axios.post("https://requestserver-1.onrender.com/api/auth/register/",data, {
  headers:{ "token": token}

  
 })
.then(res=> { 
     setRegisterUser("Registro Exitoso!")
     setTimeout(()=>{navigate('/login')},2000)
      
    })
.catch(error=>{ 

if(error.response.status=== 401){

    alert('Datos incorrectos!')
}else{
    console.log('No se puedo registrar a la cuenta')
    console.log(error)

}})
    }

    return (
       
        <div className='register'>
        
      
            <Form className='form-register' onSubmit={handleSubmit(submit)}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control {...register('email')} type="email" placeholder="Enter email" />
                </Form.Group>
        
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control {...register('password')} type="password" placeholder="Password" />
                </Form.Group>
              </Row>
        
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register('name')}  type="text" placeholder="Enter Name" />
              </Form.Group>
        
             
        <div className="btn-register" >
              <Button variant="primary" type="submit" className="btn-form">
        Submit
        
      </Button>
     
      <Link to="/login" className="textFormRegister">Ya tienes cuenta?, ingresa aquí!</Link>
      </div>
            </Form>
            <h1 className='registroExitoso'>{registerUser}</h1>
          </div>
    );
        
       
};

export default Register;