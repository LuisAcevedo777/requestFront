import axios from 'axios';
import React from 'react';
import {Form, Button} from "react-bootstrap"
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const token = localStorage.getItem('token')
    const{register, handleSubmit}=useForm()
    const navigate= useNavigate()

    const submit=(data)=>{
axios.post("http://localhost:8000/api/auth/login/",data,   {
  headers:{ "token": token}

  
 })
.then(res=> { 

       localStorage.setItem('token', res.data.token)
       localStorage.setItem('employeeId',res.data.employeeId)
       navigate('/')
    })
.catch(error=>{ 

if(error.response.status=== 401){

    alert('Password error!')
}else{
    console.log('No se puedo ingresar a la cuenta')
    console.log(error)

}})
    }

    return (
        <div className='divLogin'>
        <Form  className='login' onSubmit={handleSubmit(submit)}>
            
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register('email')} type="email" placeholder="Enter email" defaultValue='juan@gmail.com'/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register('password')} type="password" placeholder="Password" defaultValue='123'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
    
      </Form.Group>
      <div className="btn-login">
      <Button variant="primary" type="submit"  className="btn-form">
        Submit
        
      </Button>
      </div>
      <Link to="/register" className='textFormLogin'>Aún no estás registrado?</Link>
    </Form>
        </div>
    );
};

export default Login;