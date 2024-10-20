import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import {filterRequestTitleThunk, getRequestThunk } from '../store/slices/request.slice';
import { useState } from 'react';
import { Card, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import '../App.css'
import { useForm } from 'react-hook-form';
import axios from 'axios'

const Home = () => {
 
       const token = localStorage.getItem('token')    
   const employeeId = localStorage.getItem('employeeId')

    const dispatch = useDispatch()
    const {register, handleSubmit, reset}=useForm()
   
    useEffect(() => {
       
        dispatch(getRequestThunk())
       
         }, [dispatch])

         
                 const [newsSearch, setNewsSearch] = useState('') 
                 const seeRequests = useSelector(state => state.request || [])
                 const[request, setRequest]=useState('')  


                 
               
             
                 const submit=(data)=>{
                const newData = { ...data, employeeId };   
             axios.post("http://localhost:8000/api/request/",newData,   {
                headers:{ "token": token}
            
                
               })
             .then(res=> { 
                  setRequest("Solicitud Enviada!")
                  setTimeout(()=>{setRequest('')},2000)
                   
                 })
             .catch(error=>{ 
             
             if(error.response.status=== 401){
             
                 alert('Datos incorrectos!')
             }else{
                 console.log('No se puedo enviar la solicitud')
                 console.log(error)
             
             }})
                 }
             




    return (
       

            <Row className='principalRow'>
                <Form className='request' onSubmit={handleSubmit(submit)}>
                    <h2>Request</h2>
              
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Code</Form.Label>
                  <Form.Control size="xs" {...register('code')} type="text" placeholder="Enter your code" />
                </Form.Group>

                <h2 className="requestMessage">{request}</h2>

                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control {...register('description')} as="textarea" rows={1} placeholder="Description" />
                </Form.Group>
              
        
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Summary</Form.Label>
                <Form.Control {...register('summary')}  as="textarea" rows={5} placeholder="Summary" />
              </Form.Group>
              </Row>
             
        <div className="btn-register" >
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
                            onChange={e => setNewsSearch(e.target.value)}
                        />
                        <Button className='bg-danger text-black' variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterRequestTitleThunk(newsSearch))}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={1} lg={1} className="g-4" >
                        {seeRequests?.map(request => (

                           
                            <Col className='productsInHome' aria-expanded="true"  key={request?.requestId}>
                                <Card className='card' >
                                        <Card.Body className='cardHome'>
                                        <Card.Title className="card-title">{request?.description}</Card.Title>
                                        <Card.Title className="card-title">{request?.summary}</Card.Title>
                                        <Card.Title className="card-title">{request?.createdAt}</Card.Title>

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