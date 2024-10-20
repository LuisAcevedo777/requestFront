import React, { useState } from 'react';
import {Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'




const AppNavbar = () => {


    
    const navigate = useNavigate()


    const logout=()=>{

  localStorage.setItem('token', '')

navigate('/Login')

    }
    const tok = localStorage.getItem('token')
    
    

   
    return (
        <div>
            
            <Navbar className='pnav  fixed-top bg-dark' expand="md">
         
               
            
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className='bg-dark'>
                        <Nav className="me-auto bg-dark">
                            <Nav.Link as={Link} to="/Login" title='login' className='l1 bg-dark'><i className="fa-solid fa-user fa-3x text-light"></i></Nav.Link>
                            <Nav.Link as={Link} to="/Employee" title='employees' className='l1 text-black'><i className="fa-solid fa-user-tie fa-3x text-info"></i></Nav.Link>
                            <Nav.Link className='l1 text-danger' onClick={logout} ><i className="fa-solid text-info">LogOut</i></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    
            </Navbar>
          

        </div>
    );
};

export default AppNavbar;