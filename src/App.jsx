import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Employee from './pages/Employee';
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap'
import AppFooter from './components/AppFooter';
import Protected from './components/ProtectedRoutes'




const App = () => {

  const cart = JSON.parse(localStorage.getItem('cart'))
  
  if(!cart){localStorage.setItem('cart', JSON.stringify([]))}
 const isLoading = useSelector(state=> state.isLoading)
 

 
  return (
    <div className='div-principal'>
         
      <HashRouter className='my-4'>

        <AppNavbar className='navbar' />
          {isLoading && <LoadingScreen/>}               
        <Container className='my-5'>

          <Routes>

           
            <Route path="/Login" element={<Login />} />
            <Route path="/register" element={<Register/>} />

            <Route element={<Protected/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/employee" element={<Employee/>} />
            </Route>
          </Routes>
        </Container>

    <AppFooter/>
      </HashRouter>
    </div>
  );
};

export default App;