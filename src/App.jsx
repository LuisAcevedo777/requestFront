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

localStorage.setItem('token',JSON.stringify(''))
localStorage.setItem('employeeId',JSON.stringify(0))
localStorage.setItem('role',JSON.stringify(""))



const App = () => {


  //Se llama a booleano para saber el estado del loader

 const isLoading = useSelector(state=> state.isLoading)
 

 
  return (
    <div className='div-principal'>
         
      <HashRouter className='my-4'>

        <AppNavbar className='navbar' />

        {/*Si es verdadero se muestra el Loader*/}

          {isLoading && <LoadingScreen/>}               

        <Container className='my-5'>

          <Routes>
             
           {/*Rutas de la aplicación, se protege la ruta de empleados*/}

            <Route path="/Login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home/>} />
            <Route element={<Protected/>}>
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