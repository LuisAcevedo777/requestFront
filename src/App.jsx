import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import AppFooter from './components/AppFooter';
import Protected from './components/ProtectedRoutes';

// Lazy loading de las páginas
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Employee = lazy(() => import('./pages/Employee'));

localStorage.setItem('token', JSON.stringify(''));
localStorage.setItem('employeeId', JSON.stringify(0));
localStorage.setItem('role', JSON.stringify(''));

const App = () => {
    const isLoading = useSelector(state => state.isLoading);

    return (
        <div className='div-principal'>
            <HashRouter className='my-4'>
                <AppNavbar className='navbar' />

                {/* Si es verdadero se muestra el Loader */}
                {isLoading && <LoadingScreen />}

                <Container className='my-5'>
                    <Suspense fallback={<LoadingScreen />}>
                        <Routes>

                            {/* Rutas de la aplicación, se protege la ruta de empleados */}
                            
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<Home />} />
                            <Route element={<Protected />}>
                                <Route path="/employee" element={<Employee />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </Container>

                <AppFooter />
            </HashRouter>
        </div>
    );
};

export default App;
