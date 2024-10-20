import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));

  //verifica si el usuario que intenta acceder a las rutas protegidas sea administrador

  if (token && role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
